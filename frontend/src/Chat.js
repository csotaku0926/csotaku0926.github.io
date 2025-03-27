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
                <h1> Message Board </h1>
                <MessageList messages={messages} />
                <MessageForm addMessage={addMessage}/>
            </div>
    );

}

export default Chat;
