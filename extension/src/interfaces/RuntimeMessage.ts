export interface RuntimeMessage {
    action: string;
}

export interface RuntimeMessageCopy extends RuntimeMessage {
    result: string;
}