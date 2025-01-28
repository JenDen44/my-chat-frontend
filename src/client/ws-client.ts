import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';

export const createWsClient = (): Client => new Client({
    webSocketFactory: () => new SockJS('/ws'),
    debug: (str): void => {
        console.log(str);
    },
    // reconnectDelay: 5000,
});