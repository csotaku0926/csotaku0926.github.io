import { ref, get } from "firebase/database";
import { createHash } from "crypto";

export const makeAvatar = (db) => ({
    avatar(req, res) {
        // if (!req.session.user) 
        //     return res.status(401).send("please login first");
    
        /** query DB to get avatar */
        const { username } = req.query;
        const _id = createHash("md5").update(username).digest("base64");
        const dbRef = ref(db, "/" + _id);
        get(dbRef)
        .then((snapshot) => {
            // return 401 Unauthorized: failed authorization
            if (!snapshot.exists() ) 
                return res.status(401).send("please login first");          
            
            const val = snapshot.val();
            console.log(val);
            /** no avatar set yet: 204 No Cotent */
            if (!Object.hasOwn(val, 'avatar') || !val.avatar.length) 
                return res.status(204).send('');
    
            res.json({ avatar: val.avatar });
    
        }).catch((err) => {res.status(500).send("get avatar error")}); 
    }
});