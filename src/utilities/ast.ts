export type NodeType = 
    | "Expression"
    | "BinaryExpression"
    | "NumericLiteral"
    | "Program"
    | "FunctionCall";

export interface Stmt {
    kind: NodeType;
}

export interface Expression extends Stmt {}

export interface BinaryExpression extends Expression {
    kind: "BinaryExpression";
    left: Stmt;
    right: Stmt;
    operator: string;
}

export interface NumericLiteral extends Expression {
    kind: "NumericLiteral";
    value: number;
}

export interface Program extends Stmt {
    kind: "Program";
    body: Stmt[];
}

export interface FunctionCall extends Stmt {
    kind: "FunctionCall";
    name: string;
    params: Expression[];
}