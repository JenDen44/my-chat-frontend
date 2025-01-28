import type { FC } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'reset-css/reset.css';
import { Chat } from './components/chat';

export const App: FC = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');

    return token ? <Chat token={token} /> : null;
};
