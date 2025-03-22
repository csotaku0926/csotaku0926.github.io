import React, { useState } from "react";
import {
    BrowserRouter as Router, Routes,
    Route
} from "react-router-dom";
import './App.css';
import Chat from "./chat/Chat"
import Profile from "./Profile"

function App() {
    return (
            <div className="App">
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
