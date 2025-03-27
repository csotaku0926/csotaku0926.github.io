import { useState, useEffect } from "react";
import "../App.css";

function Login() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("/login")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    })

    return (
        <div className="App">
            <header className="App-header">
                <p>{data ? data : "Wait for server..."}</p>
            </header>
        </div>
    );
}

export default Login;