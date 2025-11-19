import Parser from './parser';
import { evaluate } from './interpreter';

export type CalculatorType = "standard" | "scientific";
export type UnitType = "length" | "area" | "volume" | "temperature";

export interface ResultObject {
    value: string;
}

export interface Unit {
    name: string;
    type: UnitType;
    symbol: string;
    ofbase: number;
}

export interface ConvertObject {
    value: string;
    unit: Unit;
}

export const LENGTH_UNITS: Unit[] = [
    {
        name: "milliters",
        type: "length",
        symbol: "mm",
        ofbase: 0.001,
    },
    {
        name: "centimeters",
        type: "length",
        symbol: "cm",
        ofbase: 0.01,
    },
    {
        name: "decimeters",
        type: "length",
        symbol: "dm",
        ofbase: 0.1,
    },
    {
        name: "meters",
        type: "length",
        symbol: "m",
        ofbase: 1,
    },
    {
        name: "kilometers",
        type: "length",
        symbol: "km",
        ofbase: 10,
    },
];

export const AREA_UNITS: Unit[] = [
    {
        name: "square millimeters",
        type: "area",
        symbol: "mm²",
        ofbase: 1e-6,
    },
    {
        name: "square centimeters",
        type: "area",
        symbol: "cm²,",
        ofbase: 0.0001,
    },
    {
        name: "square decimeters",
        type: "area",
        symbol: "dm²",
        ofbase: 0.01,
    },
    {
        name: "square meters",
        type: "area",
        symbol: "m²",
        ofbase: 1,
    },
    {
        name: "square kilometers",
        type: "area",
        symbol: "km²",
        ofbase: 1000000,
    },
];

export const VOLUME_UNITS: Unit[] = [
    {
        name: "cubic millimeters",
        type: "volume",
        symbol: "mm³",
        ofbase: 1e-9,
    },
    {
        name: "cubic centimeters",
        type: "volume",
        symbol: "cm³",
        ofbase: 1e-6,
    },
    {
        name: "cubic decimeters",
        type: "volume",
        symbol: "dm³",
        ofbase: 0.001,
    },
    {
        name: "cubic meters",
        type: "volume",
        symbol: "m³",
        ofbase: 1,
    },
    {
        name: "cubic kilometers",
        type: "volume",
        symbol: "km³",
        ofbase: 1e+9,
    },
];

export const TEMPERATURE_UNITS: Unit[] = [
    {
        name: "degrees celcius",
        type: "temperature",
        symbol: "°C",
        ofbase: 1,
    },
    {
        name: "degrees fahrenheit",
        type: "temperature",
        symbol: "°F",
        ofbase: -17.2222,
    },
    {
        name: "kelvinj",
        type: "volume",
        symbol: "K",
        ofbase: -272.15,
    },
];

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
        case "conversion":
            return "conversion";
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

export function convertUnits(from: ConvertObject, to: Unit): number {
    if (!from || !to) {
        return 0;
    }

    const fromNumber: number = Number(from.value);

    const fromBase: number = from.unit.ofbase;
    const toBase: number = to.ofbase;

    const result: number = (fromNumber * fromBase) * toBase;
    console.log('Result:', result);

    return result;
}