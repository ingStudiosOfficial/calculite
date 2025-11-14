import { type RuntimeVal, type NumberVal, MK_NUMBER, MK_NULL, type NullVal } from "./values";
import { type BinaryExpression, type Expression, type FunctionCall, type NumericLiteral, type Program, type Stmt } from "./ast";
import { FUNCTIONS } from "./math_functions";

function evalProgram(program: Program): RuntimeVal {
    let lastEvaluated: RuntimeVal = MK_NULL();

    for (const statement of program.body) {
        lastEvaluated = evaluate(statement);
    }

    return lastEvaluated;
}

function evalNumericBinaryExpr(lhs: NumberVal, rhs: NumberVal, operator: string): NumberVal {
    let result: number = 0;

    if (operator === "+") {
        result = lhs.value + rhs.value;
    } else if (operator === "-") {
        result = lhs.value - rhs.value;
    } else if (operator === "*") {
        result = lhs.value * rhs.value;
    } else if (operator === "/") {
        // Division by zero check
        if (rhs.value === 0) {
            console.error(`Math Error: Division by zero (${lhs.value} ${operator} ${rhs.value})`);
        }

        result = lhs.value / rhs.value;
    } else if (operator === "%") {
        result = lhs.value % rhs.value;
    }

    return { value: result, type: "number" };
}

function evalBinaryExpr(binop: BinaryExpression): RuntimeVal {
    const lhs = evaluate(binop.left);
    const rhs = evaluate(binop.right);

    if (lhs.type === "number" && rhs.type === "number") {
        return evalNumericBinaryExpr(lhs as NumberVal, rhs as NumberVal, binop.operator);
    }

    return MK_NULL();
}

function evalFunction(name: string, ...args: Expression[]): NumberVal {
    const evaluatedParams: number[] = [];

    for (const arg of args) {
        if (arg.kind === "NumericLiteral") {
            evaluatedParams.push((arg as NumericLiteral).value);
        } else if (arg.kind === "BinaryExpression") {
            const evaluatedParam: number = evalBinaryExpr(arg as BinaryExpression).value;
            evaluatedParams.push(evaluatedParam);
        } else if (arg.kind === "FunctionCall") {
            const fnCall = arg as FunctionCall; 
            const evaluatedParam = evalFunction(fnCall.name, ...fnCall.params);
            evaluatedParams.push(evaluatedParam.value);
        }
    }

    if (!Object.keys(FUNCTIONS).includes(name)) {
        console.error("Invalid function:", name);
        return { value: 0, type: "number" };
    }

    const functionToCall: Function = FUNCTIONS[name] as Function;

    return {
        value: functionToCall(...evaluatedParams),
        type: "number",
    };
}

export function evaluate(astNode: Stmt): RuntimeVal {
    switch (astNode.kind) {
        case "NumericLiteral":
            return {
                value: ((astNode as NumericLiteral).value),
                type: "number"
            } as NumberVal;
        case "BinaryExpression":
            return evalBinaryExpr(astNode as BinaryExpression);
        case "FunctionCall":
            return evalFunction((astNode as FunctionCall).name, ...(astNode as FunctionCall).params);
        case "Program":
            return evalProgram(astNode as Program);
        default:
            console.error("This AST node has not yet been setup for interpretation.");
            return {
                value: null,
                type: "null",
            } as NullVal;
    }
}