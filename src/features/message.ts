import { type MessageType } from './message-type';

export interface Message {
    id: number;
    type: MessageType;
    senderToken: string;
    content?: string;
}