import { Box } from '@mui/material';
import { type FC } from 'react';
import { type ChatMessageProps } from './types';

export const ChatMessage: FC<ChatMessageProps> = (props) => {
    const { message, token } = props;
    const isCurrentUserMessage = message.senderToken === token;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isCurrentUserMessage ? 'flex-end' : 'flex-start',
                margin: '10px 0'
            }}
        >
            <Box
                sx={{
                    backgroundColor: isCurrentUserMessage ? 'primary.main' : 'secondary.main',
                    color: 'white',
                    borderRadius: '12px',
                    padding: '10px',
                    maxWidth: '80%',
                }}
            >
                <p>{message.content}</p>
            </Box>
        </Box>
    );
};