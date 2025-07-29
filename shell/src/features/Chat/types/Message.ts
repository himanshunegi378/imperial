export type Message = {
    id: string;
    sender: 'human' | 'ai';
    text: string;
};