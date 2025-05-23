import services from "../services";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"

function Login({ setUser }) {
    //display content on success or error
    const [data, setData] = useState(null);
    const [err, setErr] = useState(null);
    const navigate = useNavigate();

    const [textInput, setTextInput] = useState({
        username: "",
        password: "",
    });

    const { username, password } = textInput;

    /** @type {React.FormEventHandler<HTMLFormElement>} */
    const handleFormSubmit = (event) => {
        event.preventDefault();

        try {
            // checking inputs are valid or not
            if (username.length >= 25 || password.length >= 25) {
                throw new Error("username or password too long (>= 25)");
            }
            
            services.login.login({ username, password })
            .then( (res) => {
                if (res.status === 400) {
                    throw new Error(res.response);
                }
                
                /** Login success */
                setData(res.data.message);
                setErr(null);
                setUser(res.data.user);
                navigate("/");
            })
            .catch( (e) => {
                console.error('error:', e);
                // there's no method to catch "ERR_blocked_by_client" for now
                let msg = "error";
                if (e.code === "ERR_NETWORK")
                    msg = e.message + " (Consider disable your ad-blocker)";
                else if (e.code === "ERR_BAD_REQUEST")
                    msg = e.response.data;
    
                setData(null);
                setErr(msg);
            });

        } catch (e) {
            setData(null);
            setErr(e.message);
        }
    }
    
    // update textInput state when user key in
    const handleTextInputChange = ({ target: {name, value} }) => {
        // functional update: forcing the update to be synchronous,
        setTextInput((prev) => ({
            ...prev, // reserve other attributes
            [name]: value
        }));
    };

    return (
        <div className="App">
            <header className="App-header">
                <div> Login </div>
            </header>
            
            <h3>{data ? data : ""}</h3>
            <h3 className="Err">{err ? err : ""}</h3>
            
            <form onSubmit={handleFormSubmit}>
                <div className="form_div">
                    <label>
                        <span>Username</span>
                        <input 
                            type="text"
                            name="username"
                            placeholder=""
                            value={username}
                            onChange={handleTextInputChange}
                            required
                        />
                    </label>
                    <label>
                        <span>Password</span>
                        <input 
                            type="password"
                            name="password"
                            placeholder=""
                            value={password}
                            onChange={handleTextInputChange}
                            required
                        />
                    </label>
                </div>
                <button type="submit">
                    Login
                </button>
            </form>

        </div>
    );
}

export default Login;