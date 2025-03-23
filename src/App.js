import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router, Routes,
    Route
} from "react-router-dom";
import './App.css';
import Chat from "./Chat"
import Profile from "./Profile"

function App() {

    const [n_visitor, set_n_visitor] = useState(0);
    
    useEffect(() => {
        const storedCount = sessionStorage.getItem("n_visitor");
        const initialCount = Number(storedCount) || 0;
        set_n_visitor(initialCount + 1);
        sessionStorage.setItem("n_visitor", initialCount + 1);
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <ul>
                    <li>網路攻防實習</li>
                    <li><a href="/">About</a></li>
                    <li><a href="/chat">Chat</a></li>
                    <li>參觀人數 {n_visitor}</li>
                </ul>
                <ul>
                    <li><a href="#">Login</a></li>
                    <li><a href="#">Sign Up</a></li>
                </ul>
            </header>

            <Router>
                <Routes>
                    <Route path="/" element={<Profile />} />
                    <Route path="/chat" element={<Chat />} />
                </Routes>
            </Router>

        </div>
    );
}

export default App;