import React from "react";
import './MessageList.css'
// import { createHash } from "crypto"; <-- don't use it. there's some update issue
import md5 from 'blueimp-md5';

function MessageList({ messages, userAvatars, currentUser, delMessage }) {

    /** sort message order by timestamp */
    messages.sort((a, b) => {
        let a_time = new Date(a.timestamp).getTime();
        let b_time = new Date(b.timestamp).getTime();

        return a_time - b_time; // ascending order
    })

    // note: it's not the best practice to use index as key of li
    const message_ul = messages.map(({ message, username, timestamp }, _) => {

        const _avatar = userAvatars[username];
        const _id = btoa(md5(timestamp));

        return (<li key={_id} className="msg_row">
            <img src={_avatar} alt="your avatar" className="avatar_img" />
            <div className="msg_content">
                <div className="username">{ username }</div>
                <div className="timestamp">{ timestamp }</div>
                <div className="msg">{ message }</div>
            </div>
            <div className="del_button_holder">
                {
                    currentUser === username &&
                    <button className="del_button" onClick={() => delMessage(_id)}>Delete</button>
                }
            </div>
        </li>);
    });

    return (
        <ul className="msg_ul">
            {message_ul}
        </ul>
    );
}

export default MessageList;