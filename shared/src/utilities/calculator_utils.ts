import Parser from './parser';
import { evaluate } from './interpreter';

import { disableWakeLock, requestWakeLock } from './wakelock';
import type { RuntimeVal } from './values';

export type CalculatorType = 'standard' | 'scientific' | 'conversion' | 'history' | 'settings';
export type UnitType = "length" | "area" | "volume" | "temperature";

export interface ResultObject {
    value: string;
}

export interface ResultItem {
    value: string;
    index: number;
    pinned: boolean;
}

export interface Unit {
    name: string;
    type: UnitType;
    symbol: string;
    toBase: (value: number) => number;
    fromBase: (value: number) => number;
}

export interface ConvertObject {
    value: string;
    unit: Unit;
}

export interface Settings {
    stayAwake: boolean;
}

export interface HistoryObject {
    equation: string;
    result: number;
    note?: string;
    date: number;
}

export const LENGTH_UNITS: Unit[] = [
    linearUnit("millimeters", "length", "mm", 0.001),
    linearUnit("centimeters", "length", "cm", 0.01),
    linearUnit("decimeters", "length", "dm", 0.1),
    linearUnit("meters", "length", "m", 1),
    linearUnit("kilometers", "length", "km", 1000),
];

export const AREA_UNITS: Unit[] = [
    linearUnit("square millimeters", "area", "mm²", 1e-6),
    linearUnit("square centimeters", "area", "cm²", 0.0001),
    linearUnit("square decimeters", "area", "dm²", 0.01),
    linearUnit("square meters", "area", "m²", 1),
    linearUnit("square kilometers", "area", "km²", 1_000_000),
];

export const VOLUME_UNITS: Unit[] = [
    linearUnit("cubic millimeters", "volume", "mm³", 1e-9),
    linearUnit("cubic centimeters", "volume", "cm³", 1e-6),
    linearUnit("cubic decimeters", "volume", "dm³", 0.001),
    linearUnit("cubic meters", "volume", "m³", 1),
    linearUnit("cubic kilometers", "volume", "km³", 1e9),
];

export const TEMPERATURE_UNITS: Unit[] = [
    {
        name: "degrees celcius",
        type: "temperature",
        symbol: "°C",
        toBase: (v) => v + 273.15,
        fromBase: (v) => v - 273.15,
    },
    {
        name: "degrees fahrenheit",
        type: "temperature",
        symbol: "°F",
        toBase: (v) => (v - 32) * 5/9 + 273.15,
        fromBase: (v) => (v - 273.15) * 9/5 + 32,
    },
    {
        name: "kelvin",
        type: "temperature",
        symbol: "K",
        toBase: (v) => v,
        fromBase: (v) => v,
    },
];

function linearUnit(name: string, type: UnitType, symbol: string, ofbase: number): Unit {
    return {
        name,
        type,
        symbol,
        toBase: (v) => v * ofbase,
        fromBase: (v) => v / ofbase,
    };
}

function replaceOtherOperators(equation: string): string {
    const operatorMap = {
        '×': '*',
        '✕': '*',
        '⋅': '*',
        '÷': '/',
        '−': '-',
        '–': '-',
        '—': '-'
    };

    type OtherOperators = keyof typeof operatorMap;

    const pattern = new RegExp(`[${Object.keys(operatorMap)}]`, 'g');

    const formattedEquation = equation.replace(pattern, match => operatorMap[match as OtherOperators]);

    return formattedEquation;
}

export function calculate(equation: string[] | string): number | string {
    equation = replaceOtherOperators(Array.isArray(equation) ? equation.join("") : equation);

    let result: RuntimeVal;

    try {
        const parser = new Parser();
        const ast = parser.produceAST(equation);
        console.log("Produced AST:", ast);

        result = evaluate(ast);
        console.log("Program:", result);

        return result.value;
    } catch (error) {
        console.error("Error while calculating:", error);
        
        if (error instanceof Error) {
            return error.message;
        } else {
            return String(error);
        }
    }
}

function capitalizeMode(mode: CalculatorType): string {
    return mode.charAt(0).toUpperCase() + mode.slice(1);
}

export function setCalculatorMode(mode: CalculatorType) {
    if (mode === window.history.state?.mode) return;

    const url = new URL(window.location.href);
    url.searchParams.set('mode', mode);

    window.history.pushState({ mode: mode }, '', url.toString());

    document.title = `${capitalizeMode(mode)} | Calculite`;
}

export function getCalculatorMode(): CalculatorType {
    const searchParams = new URLSearchParams(window.location.search);
    const calculatorMode = searchParams.get('mode');

    let returnedMode: CalculatorType;

    switch (calculatorMode) {
        case "standard":
            returnedMode = "standard";
            break;
        case "scientific":
            returnedMode = "scientific";
            break;
        case "conversion":
            returnedMode = "conversion";
            break;
        case "settings":
            returnedMode = "settings";
            break;
        default:
            returnedMode = "standard";
            break;
    }

    document.title = `${capitalizeMode(returnedMode)} | Calculite`;

    return returnedMode;
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
    const value = parseFloat(from.value);

    const valueInBase = from.unit.toBase(value);
    return to.fromBase(valueInBase);
}

export function fetchPinnedResults(): string[] {
    const results = localStorage.getItem('pinned_results');

    if (!results) {
        return [];
    }

    return JSON.parse(results).slice(0, 10);
}

export function pinResult(result: string) {
    console.log('Pinning result:', result);
    const pinnedItems: string[] = JSON.parse(localStorage.getItem('pinned_results') || "[]");
    if (!pinnedItems.includes(result)) pinnedItems.unshift(result);
    localStorage.setItem("pinned_results", JSON.stringify(pinnedItems.slice(0, 10)));
}

export function unpinResult(result: string, index: number) {
    console.log('Unpinning result:', result, index);
    const pinnedItems: string[] = JSON.parse(localStorage.getItem('pinned_results') || "[]");
    pinnedItems.splice(index, 1);
    localStorage.setItem("pinned_results", JSON.stringify(pinnedItems));

    const allResults: string[] = fetchResults();
    if (!allResults.includes(result)) allResults.unshift(result);
    localStorage.setItem("results", JSON.stringify(allResults.slice(0, 10)));
}

export function deleteResult(index: number, pinned: boolean) {
    console.log('Deleting result:', index, pinned);
    const key = pinned ? "pinned_results" : "results";
    const results: string[] = JSON.parse(localStorage.getItem(key) || "[]");
    results.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(results));
}

export async function toggleStayAwake(enabled: boolean) {
    console.log('Enabled:', enabled);

    const settings = fetchSettings();

    settings.stayAwake = enabled;

    localStorage.setItem('settings', JSON.stringify(settings));

    if (enabled === true) {
        await requestWakeLock();
    } else {
        disableWakeLock();
    }
}

export function fetchSettings(): Settings {
    const fetchedSettings = localStorage.getItem('settings');

    console.log(fetchedSettings);

    if (!fetchedSettings) {
        localStorage.setItem('settings', JSON.stringify({
            stayAwake: false,
        }));

        return {
            stayAwake: false,
        };
    }

    const settings: Settings = JSON.parse(fetchedSettings);

    return settings;
}

export function getHistory(): HistoryObject[] {
    const history: HistoryObject[] = JSON.parse(localStorage.getItem('history') || '[]');
    return history;
}

export function saveToHistory(historyObject: HistoryObject) {
    const currentHistory = getHistory();
    currentHistory.unshift(historyObject);
    localStorage.setItem('history', JSON.stringify(currentHistory));
}