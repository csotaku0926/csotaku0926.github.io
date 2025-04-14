import React, { useState, useEffect, useRef } from "react";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import services from "./services";
import './Chat.css';
import df_avatar from "../src/img/logo192.png";

function Chat() {
    
    const [user, setUser] = useState(null);
    const [err, setErr] = useState("");
    const [messages, setMessages] = useState([]);
    const [doUpdate, setDoUpdate] = useState(false);
    const [userAvatars, setUserAvatars] = useState({});
    /** track fetched user, make sure no re-render */
    const fetchedUsernames = useRef(new Set());
    const fetchedMsgUpdated = useRef(false);

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
        setErr("");

        checkLoginHandler();

        if (fetchedMsgUpdated.current)
            return;
        
        setDoUpdate(false);
        /** get all msg */
        fetchedMsgUpdated.current = true;
        services.msg.get_all_msg()
        .then(res => res.data)
        .then((res) => {
            // console.log("res:", res);
            setMessages(() => res);
            return res;
        })
        .then((msg) => {
            /** query avatar for all message */
            msg.forEach(({ username }) => {

                /** marked as fetched */
                if (fetchedUsernames.current.has(username)) 
                    return;
                fetchedUsernames.current.add(username);
        
                /** query from DB */
                services.api.get_avatar({ username })
                .then((res) => {
                    var set_img = df_avatar;
                    if (res.status === 200) 
                        set_img = res.data.avatar;
        
                    setUserAvatars(prev => ({
                        ...prev,
                        [username]: set_img 
                    }));
        
                }).catch((err) => {
                    console.error("get_all_msg:", err);
                    setErr(err.response.data.message);
                });
            })

        })
        .catch( e => {
            console.error("get_all_msg:", e);
            let msg = e.message;
            if (e.code === "ERR_NETWORK")
                msg = e.message + " (Consider disable your ad-blocker)";
            setErr(msg);
        } );

    }, [messages, doUpdate]);

    
    const addMessage = (newMessage) => {
        // Date() converts to 'yyyy-mm-dd hh:mm:ss'
        let timestamp = new Date();
        timestamp = timestamp.toLocaleString('sv');
        /** frontend insert */
        const new_msg_obj = {
            message: newMessage,
            username: user,
            timestamp: timestamp
        };
        
        // insert back new message to list
        services.msg.post_msg({ newMessage, timestamp })
        .then((res) => {
            if (res.status === 401) {
                throw new Error(res.response);
            }
            setMessages((msg) => [...msg, new_msg_obj]);
            fetchedMsgUpdated.current = false;

        }).catch((e) => {
            // console.error(e);
            setErr(e.response.data.message);
        });
    }

    const delMessage = (delete_id) => {
        // remove message with delete id
        services.msg.del_msg({ delete_id })
        .then((res) => {
            if (Math.floor(res.status / 100) === 4) 
                throw new Error(res.response);
            setDoUpdate(true);
            fetchedMsgUpdated.current = false;

        }).catch((e) => {
            console.error('delerror:', e);
            // there's no method to catch "ERR_blocked_by_client" for now
            let msg = "error";
            if (e.code === "ERR_NETWORK")
                msg = e.message + " (Consider disable your ad-blocker)";
            else if (e.code === "ERR_BAD_REQUEST")
                msg = e.response.data;

            setErr(msg);
        });
    }

    return (
            <div className="App_chat">
                <h1> Chat </h1>
                <MessageList messages={messages} userAvatars={userAvatars} currentUser={user} delMessage={delMessage} />
                {user && <MessageForm addMessage={addMessage}/>}
                <h3 className="Err">{err.length ? err : ""}</h3>
                
            </div>
    );
}

export default Chat;
