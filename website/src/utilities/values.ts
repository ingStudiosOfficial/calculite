export type ValueType = "number" | "null";

export interface RuntimeVal {
    type: ValueType;
    value: any;
}

export interface NumberVal extends RuntimeVal {
    type: "number";
    value: number;
}

export interface NullVal extends RuntimeVal {
    type: "null";
    value: null;
}

export function MK_NUMBER(n: number = 0): NumberVal {
    return { type: "number", value: n };
}

export function MK_NULL(): NullVal {
    return { type: "null", value: null };
}