import { type ChangeEvent, useState, type FC, type FormEvent } from 'react';
import { Button, TextField, Container, Box } from '@mui/material';
import { ChatMessage } from '../chat-message';
import { type ChatProps } from './types.js';
import { useChat } from './hooks.js';

export const Chat: FC<ChatProps> = (props) => {
    const { token } = props;
    const { messages, onSend } = useChat(token);
    const [ content, setContent ] = useState('');
    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setContent(event.target.value);
    };
    const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (content) {
            onSend(content);
            setContent('');
        }
    };

    return (
        <Container sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1 }}>
                {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} token={token} />
                ))}
            </Box>
            <form onSubmit={onSubmit}>
                <TextField
                    fullWidth
                    focused
                    value={content}
                    onChange={onChange}
                    placeholder="Введите сообщение"
                    slotProps={{
                        input: {
                            endAdornment: <Button type="submit" disabled={!content}>Отправить</Button>,
                        },
                    }}
                />

            </form>
        </Container>
    );
};