import { type Message } from '../../features';

export interface ChatProps {
    token: string;
}

export interface UseChat {
    messages: Message[];
    onSend: (content: string) => void;
}