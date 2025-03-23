import React from "react";
import './MessageList.css'

function MessageList({ messages }) {
    
    // note: it's not the best practice to use index as key of li
    const message_ul = messages.map((msg, index) => 
        <li key={index} className="msg_row">
            {msg}
        </li>
    )
    
    return (
        <ul className="msg_ul">
            {message_ul}
        </ul>
    );
}

export default MessageList;