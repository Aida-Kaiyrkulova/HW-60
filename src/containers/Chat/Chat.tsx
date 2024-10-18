import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Message } from '../../types';
import MessageList from '../../components/MessageList/MessageList.tsx';
import MessageInput from '../../components/MessageInput/MessageInput.tsx'

const BASE_URL = 'http://146.185.154.90:8000/messages';

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [lastDatetime, setLastDatetime] = useState<string | null>(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get<Message[]>(BASE_URL, {
                    params: lastDatetime ? { datetime: lastDatetime } : {},
                });
                setMessages((prevMessages) => [...prevMessages, ...response.data]);
                if (response.data.length > 0) {
                    setLastDatetime(response.data[response.data.length - 1].datetime);
                }
            } catch (error) {
                console.error("Error", error);
            }
        };

        fetchMessages();

        const id = setInterval(fetchMessages, 3000);
        return () => clearInterval(id);
    }, [lastDatetime]);

    const handleSendMessage = async (message: string) => {
        try {
            const data = new URLSearchParams();
            data.set('message', message);
            data.set('author', 'Admin');

            await axios.post(BASE_URL, data);
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h1>Chat</h1>
            <MessageList messages={messages} />
            <MessageInput onSend={handleSendMessage} />
        </div>
    );
};

export default Chat;