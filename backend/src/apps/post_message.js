import { ref, set } from "firebase/database";
import md5 from 'blueimp-md5';

export const makePostMessage = (db) => ({
    /** post user message to DB */
    post_message(req, res) {
        if (!req.session.user) 
            return res.status(401).json({ message: "logged in first" });

        console.log("[post_msg]:");
        console.log(req.body);

        /** get posted message from request */
        const { newMessage, timestamp } = req.body;
        const username = req.session.user;

        // assign id as sha-256 hash of timestamp
        const _id = btoa(md5(timestamp));

        // write to db
        const dbRef = ref(db, 'messages/' + _id);
        set(dbRef, {
            username: username,
            message: newMessage,
            timestamp: timestamp
        })
        .then(() => res.json({message: "message posted successful"}))
        .catch((err) => res.status(500).send("Failed to write DB"));
    }
}) 