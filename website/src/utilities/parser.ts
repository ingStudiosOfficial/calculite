import { type Stmt, type Expression, type BinaryExpression, type UnaryExpression, type NumericLiteral, type Program, type FunctionCall } from "./ast";
import { tokenize, type Token, TokenType } from "./lexer";

export default class Parser {
    private tokens: Token[] = [];

    private notEndOfExpression(): boolean {
        return this.tokens[0]?.type !== TokenType.EndOfExpression;
    }

    private at() {
        return this.tokens[0] as Token;
    }

    private eat() {
        const prev = this.tokens.shift() as Token;
        return prev;
    }

    private expect(type: TokenType, err: any): Token {
        const prev = this.tokens.shift();

        if (!prev || prev.type !== type) {
            console.error("Parser Error:\n", err, prev, "Expecting:", type);
            throw new Error(err);
        }

        return prev;
    }

    public produceAST(sourceExpression: string): Program {
        this.tokens = tokenize(sourceExpression);

        const program: Program = {
            kind: "Program",
            body: [],
        };

        while (this.notEndOfExpression()) {
            program.body.push(this.parseStmt());
        }

        return program;
    }

    private parseStmt(): Stmt {
        switch (this.at().type) {
            default:
                return this.parseExpr();
        }
    }

    private parseExpr(): Expression {
        return this.parseAdditiveExpr();
    }

    private parseAdditiveExpr(): Expression {
        let left = this.parseMultiplicativeExpr();

        while (this.at().value === "+" || this.at().value === "-") {
            const operator = this.eat().value;
            const right = this.parseMultiplicativeExpr();
            left = {
                kind: "BinaryExpression",
                left,
                right,
                operator,
            } as BinaryExpression;
        }

        return left;
    }

    private parseMultiplicativeExpr(): Expression {
        let left = this.parseExponentialExpr();

        while (this.at().value === "*" || this.at().value === "/" || this.at().value === "%") {
            const operator = this.eat().value;
            const right = this.parseExponentialExpr();
            left = {
                kind: "BinaryExpression",
                left,
                right,
                operator,
            } as BinaryExpression;
        }

        return left;
    }

    private parseExponentialExpr(): Expression {
        let left = this.parseUnaryExpr();

        while (this.at().value === "**") {
            const operator = this.eat().value;
            const right = this.parsePrimaryExpr();
            left = {
                kind: "BinaryExpression",
                left,
                right,
                operator,
            } as BinaryExpression;
        }

        return left;
    }

    private parseUnaryExpr(): Expression {
        let value = this.at().value;

        if (value === '-' || value === '+') {
            const operator = this.eat().value;
            const operand = this.parseUnaryExpr();

            return {
                kind: "UnaryExpression",
                operator: operator,
                operand: operand,
            } as UnaryExpression;
        }
        
        return this.parsePrimaryExpr();
    }

    private parsePrimaryExpr(): Expression {
        const tk = this.at().type;

        switch (tk) {
            case TokenType.Number:
                return {
                    kind: "NumericLiteral",
                    value: parseFloat(this.eat().value),
                } as NumericLiteral;

            case TokenType.OpenParen:
                this.eat();
                const value = this.parseAdditiveExpr();
                this.expect(TokenType.CloseParen, "Expected closing parentheses");
                return value;

            case TokenType.FunctionCall:
                const functionToken = this.at().value;
                this.eat();
                this.expect(TokenType.OpenParen, "Expected opening parentheses");
                let params: Expression[] = [];
                if (this.at().type !== TokenType.CloseParen) {
                    while (true) {
                        const arg = this.parseExpr();
                        params.push(arg);
                        if (this.at().type === TokenType.CloseParen) break;

                        this.expect(TokenType.Delimiter, "Expected a delimiter (,) to separate arguments");
                    }
                }
                
                this.eat();

                return {
                    kind: "FunctionCall",
                    name: functionToken,
                    params: params,
                } as FunctionCall;

            default:
                console.error("Unexpected token found during parsing:", this.at());
                throw new Error(`Unexpected token found during parsing '${this.at().value}'`);
        }
    }
}