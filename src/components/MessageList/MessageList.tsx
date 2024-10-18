import React from 'react';
import { Message } from '../../types'
import './MessageList.css';

interface MessageListProps {
    messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    return (
        <div className="message-list">
            {messages.map((msg) => (
                <div key={msg._id} className="message">
                    <strong className="author">{msg.author}</strong>: {msg.message}
                    <br />
                    <small className="datetime">{new Date(msg.datetime).toLocaleString()}</small>
                </div>
            ))}
        </div>
    );
};

export default MessageList;