import { useState } from "react"; // named import 

// {} in function argument: destructuring assignment
function MessageForm({ addMessage }) {
    // set up text state machine
    const [text, setText] = useState("");

    // handle text submission (e: pass-in event)
    const handleSubmit = (e) => {
        e.preventDefault(); // cancel default action of the event
        if (!text.trim()) return; // if empty string, return
        addMessage(text);
        setText(""); // recover the text state
    };

    // JSX attribute {}
    // onChange: get input value
    // value={text} <-- set current value of "input" as "text" state (change in handleSubmit)
    return (
        <form onSubmit={handleSubmit}> 
            <input 
                type="text"
                placeholder="write something..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">Submit</button>
            <div>current text: {text}</div>
        </form>
    );
}

export default MessageForm;