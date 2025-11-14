import Parser from './parser';
import { evaluate } from './interpreter';

export function calculate(equation: string[]): number {
    let result;

    try {
        const parser = new Parser();
        const ast = parser.produceAST(equation.join(""));
        console.log("Produced AST:", ast);

        result = evaluate(ast);
        console.log("Program:", result);

        return result.value;
    } catch (error) {
        console.error("Error while calculating:", error);
        return 0;
    }
}