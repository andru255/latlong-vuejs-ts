export interface CoordinateItem {
    readonly latitude: number;
    readonly longitude: number;
}

export interface Message {
    id: number;
    content: string;
    timeout: number;
}

