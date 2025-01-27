import { type Message } from '../../features';

export interface ChatMessageProps {
    message: Message;
    token: string;
}