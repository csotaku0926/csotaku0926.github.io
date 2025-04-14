import React, { useState, useEffect } from "react";
import services from "../services";
import '../Chat.css';

function AI_gen() {
    
    const [user, setUser] = useState(null);
    const [err, setErr] = useState("");
    // set up text state machine
    const [text, setText] = useState("");
    const [AIRes, setAIRes] = useState("");

    const ErrHandler = (e, e_name) => {
        console.error(e_name, e);
        // there's no method to catch "ERR_blocked_by_client" for now
        let msg = "error";
        if (e.code === "ERR_NETWORK")
            msg = e.message + " (Consider disable your ad-blocker)";
        else if (e.code === "ERR_BAD_REQUEST")
            msg = e.response.data;

        setErr(msg);
    };

    const checkLoginHandler = () => {
        /** check if user login */
        services.login.check_login()
        .then((res) => {
            if (res.data.loggedIn)
                setUser(res.data.user);
            else {
                setErr("You are not logged in");
                setUser(null);
            }
        })
        .catch((e) => ErrHandler(e, 'check login:'));
    }
    
    useEffect(() => {
        console.log("rerendering");
        checkLoginHandler();
    }, []);


    // handle text submission (e: pass-in event)
    const handleSubmit = (e) => {
        
        e.preventDefault(); // cancel default action of the event
        if (!text.trim()) return; // if empty string, return

        setAIRes("Waiting...");

        services.api.AI_gen({prompt: text})
        .then((res) => {
            setAIRes(res.data.content);
        })
        .catch((err) => {
            setErr(err.response.data);
            setAIRes("");
        });

        setText(""); // recover the text state
    };

    return (
            <div className="App_chat">
                <h1> AI Divination </h1>
                {user ? (
                    <form onSubmit={handleSubmit}> 
                    <input 
                        type="text"
                        placeholder="write something..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                    <div className="AIRes">
                        {AIRes}
                    </div>
                </form>
                ) : (<p>Log in first to use AI function</p>) }

                <h3 className="Err">{err.length ? err : ""}</h3>
                
            </div>
    );
}

export default AI_gen;
