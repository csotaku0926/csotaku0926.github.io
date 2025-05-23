import { useState, useEffect } from "react";
import {
    HashRouter as Router, Routes, Route, Link
} from "react-router-dom";
import './App.css';
import Chat from "./Chat"
import Profile from "./Profile"
import Register from "./components/Register";
import Login from "./components/Login";
import services from "./services";
import AI_gen from "./components/AI_gen";
// default avatar
import df_avatar from "./img/logo192.png";

function App() {

    const [n_visitor, set_n_visitor] = useState(0);
    const [user, setUser] = useState(null);
    const [err, setErr] = useState("");
    
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
                setUser(null);
                sessionStorage.removeItem("avatar");
            }
        })
        .catch((e) => ErrHandler(e, 'check login:'));
    };

    useEffect(() => {
        const storedCount = sessionStorage.getItem("n_visitor");
        const initialCount = Number(storedCount) || 0;
        set_n_visitor(initialCount + 1);
        sessionStorage.setItem("n_visitor", initialCount + 1);

        checkLoginHandler();
        setErr("");

    }, []);

    const onLogoutHandler = () => {
        services.login.logout();
        sessionStorage.removeItem("avatar");
        setUser(null);
    }

    /** show avatar once login */
    const showAvatar = () => {
        
        // perodically check login
        // checkLoginHandler();

        const avatar_img = document.querySelector(".avatar_img");

        const storedAvatar = sessionStorage.getItem("avatar");
        if (storedAvatar) {
            avatar_img.src = storedAvatar;
            return;
        }
        
        services.api.get_avatar({ username: user })
        .then((res) => {
            if (res.status === 401) {
                throw new Error(res.response);
            }
            
            if (res.status !== 200) {
                sessionStorage.setItem("avatar", df_avatar);
                avatar_img.src = df_avatar;
                return;
            }

            sessionStorage.setItem("avatar", res.data.avatar);
            avatar_img.src = res.data.avatar;
        }).catch((e) => ErrHandler(e, 'get_avatar:'));
    }

    return (
        <div className="App">
            <Router>
                <header className="App-header">
                    <ul>
                        <li>網路攻防實習</li>
                        <li><Link to="/">About</Link></li>
                        <li><Link to="/chat">Chat</Link></li>
                        <li>參觀人數 {n_visitor}</li>
                    </ul>
                    
                    {user ? (
                            <ul>
                                <img src={df_avatar} alt="your avatar" className="avatar_img" onLoad={showAvatar}/>
                                <li>
                                    <Link to="/">Welcome, {user}</Link>
                                </li>
                                <li>
                                    <Link to="/ai_gen">AI talk</Link>
                                </li>
                                <li onClick={onLogoutHandler}>
                                    <Link to="/">Logout</Link>
                                </li>
                            </ul>
                        ) : (
                            <ul>
                                <li><Link to="/register">Register</Link></li>
                                <li><Link to="/login">Login</Link></li>
                            </ul>
                    )}
                    {err.length ? (<h3 className="Err">err</h3>) : ""}

                </header>

                    <Routes>
                        <Route path="/" element={<Profile />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/register" element={<Register />}/>
                        <Route path="/login" element={<Login setUser={setUser}/>}/>
                        <Route path="/ai_gen" element={<AI_gen/>}/>
                    </Routes>
            </Router>
        </div>
    );
}

export default App;