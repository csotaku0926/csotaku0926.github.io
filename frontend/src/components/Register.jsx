import { useState} from "react";
import "../App.css";
// import { useNavigate } from "react-router-dom";
import services from "../services";

function Register() {
    // display content on success or error
    const [data, setData] = useState(null);
    const [err, setErr] = useState(null);
    const [RdOnly, setRdOnly] = useState(false);

    const [textInput, setTextInput] = useState({
        username: "",
        password: "",
        avatar: "" // this would be base64 string of image
    });

    const { username, password, avatar } = textInput;

    /** @type {React.FormEventHandler<HTMLFormElement>} */
    const handleFormSubmit = (event) => {
        event.preventDefault();

        try {
            // checking inputs are valid or not
            if (username.length >= 25 || password.length >= 25) {
                throw new Error("username or password too long (>= 25)");
            }
        
            if (avatar.length && !avatar.startsWith("data:image/")) {
                throw new Error("Invalid avatar format");
            }

            if (avatar.length >= 16500) {
                throw new Error("avatar image too large (>= 12 KB)");
            }

            services.auth.register({ username, password, avatar })
            .then( (res) => {
                if (res.status === 400) {
                    throw new Error(res.response);
                }
                
                setData(res.data.message);
                setErr(null);
                setRdOnly(true);
            })
            .catch( (e) => {
                console.log('error:', e);
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

    /* ref: https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL */
    const previewImg = () => {
        const preview = document.querySelector("img");
        const file = document.querySelector("input[type=file]").files[0];
        const reader = new FileReader();    

        // listen to "load" event and the callback "receives" notification
        reader.addEventListener(
            "load",
            () => {
                // convert image to base64 string
                preview.src = reader.result;
                setTextInput(prev => ({
                    ...prev, // reserve other attributes
                    avatar: reader.result
                }));
            },
            false,
        );
        
        if (file)
            reader.readAsDataURL(file);
    }

    return (
        <div className="App">
            <header className="App-header">
                <div> Register </div>
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
                            readOnly={RdOnly}
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
                            readOnly={RdOnly}
                            required
                        />
                    </label>
                    <label>
                        <span>Avatar Image</span>
                        <input 
                            type="file"
                            name="avatar"
                            accept="image/png, image/jpeg"
                            readOnly={RdOnly}
                            onChange={previewImg}
                        />
                        <img src="/" alt="your avatar" className="avatar_img"/>
                    </label>
                </div>
                <button type="submit">
                    Register
                </button>
            </form>
            
        </div>
    );
}

export default Register;