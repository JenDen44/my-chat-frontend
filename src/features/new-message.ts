import { type MessageType } from './message-type';

export interface NewMessage {
    type: MessageType;
    senderToken: string;
    content?: string;
}