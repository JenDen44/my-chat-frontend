import { type Client } from '@stomp/stompjs';
import { useCallback, useEffect, useState } from 'react';
import { createWsClient } from '../../client';
import { type NewMessage, type Message } from '../../features';

export const useChat = (senderToken: string) => {
    const [ messages, setMessages ] = useState<Message[]>([]);
    const [ wsClient, setWsClient ] = useState<Client | null>(null);
    const onSend = useCallback((content: string): void => {
        if (!content || !wsClient) return;

        const message: NewMessage = { senderToken, content, type: 'CHAT' };

        wsClient.publish({ destination: '/app/chat.sendMessage', body: JSON.stringify(message) });
    }, [ senderToken, wsClient ]);

    useEffect(() => {
        const newWsClient = createWsClient();
        newWsClient.onConnect = (): void => {
            const message: NewMessage = { senderToken, type: 'CONNECT' };
            console.log('CONNECT', message);

            newWsClient.publish({ destination: '/app/chat.add-user', body: JSON.stringify(message) });

            newWsClient.subscribe('/topic/public', (message) => {
                const newMessage = JSON.parse(message.body) as Message;

                setMessages((prevMessages) => [ ...prevMessages, newMessage ]);
            });
        };
        newWsClient.onDisconnect = (): void => {
            if (newWsClient.connected) {
                const message: NewMessage = { senderToken, type: 'DISCONNECT' };
                console.log('DISCONNECT', message);
                newWsClient.publish({ destination: '/app/chat.add-user', body: JSON.stringify(message) });
            }
        };

        newWsClient.activate();
        setWsClient(newWsClient);

        return (): void => {
            newWsClient.deactivate();
        };
    }, [ senderToken ]);

    return { messages, onSend };
};