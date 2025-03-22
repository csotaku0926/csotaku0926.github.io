import React from "react";

function MessageList({ messages }) {
    
    // note: it's not the best practice to use index as key of li
    const message_ul = messages.map((msg, index) => 
        <li key={index}>
            {msg}
        </li>
    )
    
    return (
        <ul>
            {message_ul}
        </ul>
    );
}

export default MessageList;