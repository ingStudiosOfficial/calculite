import * as math from 'mathjs'; 

export function calculate(equation: string[]): number {
    try {
        const result: number = math.evaluate(equation.join(''));
        console.log('Calculated result:', result);
        return result;
    } catch (error) {
        console.error('Error while evaluating equation:', error);
        return 0;
    }
}