import { graphState } from "./graphState";

export type ChatHistory = {
    id: number;
    chatId: string;
    userId: string;
    message: string;
}

export type GraphStateType = typeof graphState.State