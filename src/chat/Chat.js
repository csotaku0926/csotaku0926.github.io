import React, { useState } from "react";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import './Chat.css';

function Chat() {

    const [messages, setMessages] = useState([]);

    const addMessage = (newMessage) => {
        // insert back new message to list
        setMessages([...messages, newMessage]);
    }

    return (
        <div className="App">
            <header className="App-header">
                <ul>
                    <li>網路攻防實習</li>
                    <li><a href="/">About</a></li>
                    <li><a href="/chat">Chat</a></li>
                    <li>參觀人數 {messages.length}</li>
                </ul>
                <ul>
                    <li><a href="#">Login</a></li>
                    <li><a href="#">Sign Up</a></li>
                </ul>
            </header>

            <h1> Message Board </h1>
            <MessageList messages={messages} />
            <MessageForm addMessage={addMessage}/>

        </div>
    );


}

export default Chat;
