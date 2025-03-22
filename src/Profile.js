import React, { useState } from "react";

const Profile = () => {
    
    // TODO: backend update
    const [messages, _] = useState([]);
    
    return (

        <div className="profile">
            <header className="App-header">
                <ul>
                    <li>網路攻防實習</li>
                    <li><a href="/">About</a></li>
                    <li><a href="/chat">Chat</a></li>
                    <li><a>參觀人數 {messages.length}</a></li>
                </ul>
                <ul>
                    <li><a href="#">Login</a></li>
                    <li><a href="#">Sign Up</a></li>
                </ul>
            </header>
            <h1>This is the Profile page</h1>
        </div>
    )
}

export default Profile;