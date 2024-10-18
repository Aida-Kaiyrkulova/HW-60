import React, { useState } from 'react';

interface MessageInputProps {
    onSend: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
    const [newMessage, setNewMessage] = useState('');

    const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (newMessage.trim()) {
            onSend(newMessage);
            setNewMessage('');
        }
    };

    return (
        <form onSubmit={handleSend} style={{ marginTop: '20px' }}>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
                style={{ width: '80%', padding: '10px', marginRight: '10px' }}
            />
            <button type="submit" style={{ padding: '10px 20px' }}>
                Send
            </button>
        </form>
    );
};

export default MessageInput;