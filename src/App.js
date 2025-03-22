import React, { useState } from "react";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import './App.css';

function App() {

    const [messages, setMessages] = useState([]);

    const addMessage = (newMessage) => {
        // insert back new message to list
        setMessages([...messages, newMessage]);
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1> Message Board </h1>
                <MessageList messages={messages} />
                <MessageForm addMessage={addMessage}/>
            </header>
        </div>
    );


}

export default App;
