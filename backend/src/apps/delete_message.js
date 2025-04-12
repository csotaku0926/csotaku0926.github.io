import { ref, get, remove } from "firebase/database";

export const makeDeleteMessage = (db) => ({
    /** post user message to DB */
    delete_message(req, res) {
        if (!req.session.user) 
            return res.status(401).json({ message: "logged in first" });

        console.log("[del_msg]:");
        console.log(req.body);

        /** get posted message from request */
        const { delete_id } = req.body;
        const this_username = req.session.user;

        // make sure deleter is valid
        const dbRef = ref(db, 'messages/' + delete_id);

        get(dbRef)
        .then((snapshot) => {
            const data = snapshot.val();
            if (!data) {
                res.status(400).send("invalid delete id");
                return;
            }

            if (data.username !== this_username) {
                res.status(401).send("invalid deletion");
                return;
            }

            /** read success */
            // delete from db
            remove(dbRef)
            .then(() => res.json({message: "message remove successful"}))
            .catch((err) =>res.status(500).send("Failed to write DB"));

        }).catch((err) => res.json("DB write error"));


    }
}) 