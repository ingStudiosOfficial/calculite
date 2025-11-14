export type NodeType = 
    | "Expression"
    | "BinaryExpression"
    | "NumericLiteral"
    | "Program";

export interface Stmt {
    kind: NodeType;
}

export interface Expresssion extends Stmt {}

export interface BinaryExpression extends Expresssion {
    kind: "BinaryExpression";
    left: Stmt;
    right: Stmt;
    operator: string;
}

export interface NumericLiteral extends Expresssion {
    kind: "NumericLiteral";
    value: number;
}

export interface Program extends Stmt {
    kind: "Program";
    body: Stmt[];
}