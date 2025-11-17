import Parser from './parser';
import { evaluate } from './interpreter';

export type CalculatorType = "standard" | "scientific";

export interface ResultObject {
    value: string
}

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

export function setCalculatorMode(mode: string) {
    const url = new URL(window.location.href);
    url.searchParams.set('mode', mode);

    window.history.pushState({}, '', url.toString());
}

export function getCalculatorMode(): string {
    const searchParams = new URLSearchParams(window.location.search);
    const calculatorMode = searchParams.get('mode');

    switch (calculatorMode) {
        case "standard":
            return "standard";
        case "scientific":
            return "scientific";
        default:
            return "standard";
    }
}

export function saveResults(results: string[]) {
    localStorage.setItem('results', JSON.stringify(results.slice(0, 10)));
}

export function fetchResults(): string[] {
    const results = localStorage.getItem('results');

    if (!results) {
        return [];
    }

    return JSON.parse(results).slice(0, 10);
}