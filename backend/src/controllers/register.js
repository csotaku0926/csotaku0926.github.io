import { ref, set, get } from "firebase/database";
import { createHash } from "crypto";

/* User register an account */
export const makeResiter = (db) => ({
    
    register (req, res) {
        console.log("[SERVER]:");
        console.log(req.body);
        
        const { username, password, avatar } = req.body;
    
        // checking inputs are valid or not
        if (username.length >= 25 || password.length >= 25) 
            return res.status(400).send("username or password too long (>= 25)");
    
        if (avatar.length && !avatar.startsWith("data:image/"))
            return res.status(400).send("Invalid avatar format");
        

        if (avatar.length >= 16500)
            return res.status(400).send("avatar image too large (>= 12 KB)");
        

        console.log("avatar len:", avatar.length)
        
        // assign id as sha-256 hash of username
        const _id = createHash("md5").update(username).digest("base64");
        // make hash of username and pswd
        const h_password = createHash("md5").update(password).digest("base64");
        // make sure username is unique
        const dbRef = ref(db, "/" + _id);
        get(dbRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                /* already have this username */
                res.status(400).send("This username already exists");
    
            } else {
                // write to db
                set(dbRef, {
                    username: _id,
                    password: h_password,
                    avatar: avatar
                }).then(() => res.json({"message": `${username} register successful. Please Login`})
                ).catch((err) => res.status(500).send("Failed to write DB"));
            }
    
        }).catch((err) => {res.status(500).send("DB read error")});
    }

});