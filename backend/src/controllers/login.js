import { ref, get } from "firebase/database";
import { createHash } from "crypto";

/** Login logic */
export const makeLogin = (db) => ({
    
    login(req, res) {

        console.log("[SERVER]:");
        console.log(req.body);
    
        const { username, password } = req.body;
    
        if (username.length >= 25 || password.length >= 25) 
            return res.status(400).send("username or password too long (>= 25)");

        // assign id as sha-256 hash of username
        const _id = createHash("md5").update(username).digest("base64");
        // make hash of username and pswd
        const h_password = createHash("md5").update(password).digest("base64");
    
        // check validity in DB
        const dbRef = ref(db, "/" + _id);
        get(dbRef)
        .then((snapshot) => {
            if (!snapshot.exists() ) {
                // return 401 Unauthorized: failed authorization
                res.status(401).send("Incorrect username or password");
                return;           
            } 
    
            /* check if password correct */
            const password = snapshot.val().password;
            if (password !== h_password) {
                res.status(401).send("Incorrect username or password");
                return;  
            }
    
            /* login success */
            // put username into session store
            req.session.user = username;
            req.session.h_user = _id;
            console.log("user session:", req.session);
            console.log("user session ID:", req.sessionID);
            
            res.json({ message: `${username} logged in suucess`, user: req.session.user });
    
        }).catch((err) => {res.status(500).send("DB read error")});
    }
})