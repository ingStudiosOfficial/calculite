function squareRoot(val: number): number {
    return Math.sqrt(val);
}

function cubeRoot(val: number): number {
    return Math.cbrt(val);
}

function factorial(val: number): number {
    if (val < 0) {
        console.error("Factorial is not defined for negative numbers.");
        return 0;
    } else if (val === 0 || val === 1) {
        return 1;
    } else {
        return val * factorial(val - 1);
    }
}

function sin(val: number): number {
    return Math.sin(val);
}

function cos(val: number): number {
    return Math.cos(val);
}

function tan(val: number): number {
    return Math.tan(val);
}

function log(val: number): number {
    return Math.log(val);
}

function modulo(val: number, mod: number): number {
    return val % mod;
}

export const FUNCTIONS: { [key: string]: Function } = {
    "SQRT": squareRoot,
    "CBRT": cubeRoot,
    "FACTORIAL": factorial,
    "SIN": sin,
    "COS": cos,
    "TAN": tan,
    "LOG": log,
    "MOD": modulo,
};