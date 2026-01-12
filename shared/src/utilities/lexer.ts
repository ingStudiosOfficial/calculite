import { FUNCTIONS } from "./math_functions";

export enum TokenType {
    Number,
    OpenParen,
    CloseParen,
    BinaryOperator,
    EndOfExpression,
    FunctionCall,
    Delimiter,
}

export interface Token {
    value: string;
    display: string;
    type: TokenType;
}

function token(value = "", type: TokenType): Token {
    return { value, type } as Token;
}

function isAlpha(src: string): boolean {
    return src.toUpperCase() !== src.toLowerCase();
}

function isInt(src: string): boolean {
    const c = src.charCodeAt(0);
    const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)];
    if (!bounds[0] || !bounds[1]) return false;
    return (c >= bounds[0] && c <= bounds[1]);
}

function isSkippable(str: string) {
    return str === ' ' || str === '\n' || str === '\t';
}

function identifyError(src: string[]): string {
    switch (src[0]) {
        case '.':
            if (!src[1] || !isInt(src[1])) {
                return `Expected integer after '.'`;
            } else {
                return 'An unknown error occurred, character \'.\'';
            }

            break;
        default:
            return `An unknown error occurred, character '${src[0]}'`;
    }
}

export function tokenize(sourceExpression: string): Token[] {
    const tokens = new Array<Token>();
    const src: string[] = sourceExpression.split("") as string[];

    while (src.length > 0) {
        if (src[0] === "(") {
            tokens.push(token(src.shift(), TokenType.OpenParen));
        } else if (src[0] === ")") {
            tokens.push(token(src.shift(), TokenType.CloseParen));
        } else if (src[0] === "+" || src[0] === "-" || src[0] === "/" || src[0] === "%") {
            tokens.push(token(src.shift(), TokenType.BinaryOperator));
        } else if (src[0] === "*") {
            const multiplication: string = src.shift() as string;
            if (src[0] === "*") {
                tokens.push(token(multiplication + src.shift(), TokenType.BinaryOperator));
            } else {
                tokens.push(token(multiplication, TokenType.BinaryOperator));
            }
        } else if (src[0] === ",") {
            tokens.push(token(src.shift(), TokenType.Delimiter));
        } else {
            if (src[0] === undefined) continue;

            if (isInt(src[0]) || (src[0] === "." && src[1] && isInt(src[1]))) {
                let num = "";

                while (src.length > 0 && isInt(src[0]) || src[0] === ".") {
                    num += src.shift();
                }

                tokens.push(token(num, TokenType.Number))
            } else if (isAlpha(src[0])) {
                let alphaString = "";

                while (src.length > 0 && isAlpha(src[0])) {
                    alphaString += src.shift();
                }

                if (Object.keys(FUNCTIONS).includes(alphaString)) {
                    tokens.push(token(alphaString, TokenType.FunctionCall));
                } else {
                    console.error("Alphabetic characters are not supported.");   
                }
            } else if (isSkippable(src[0])) {
                src.shift();
            } else {
                console.error("Unknown character:", src[0]);
                throw new Error(`Lexer error: ${identifyError(src)}`);
            }
        }
    }

    tokens.push({ type: TokenType.EndOfExpression, value: "EndOfExpression" } as Token);
    return tokens;
}