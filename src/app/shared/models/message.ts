export interface Message {
    success: boolean;
    msg: {
        token?: string;
        payload: string;
    };
}
