import { ref, get } from "firebase/database";

function findMsginObject(obj) {
    if (Object.hasOwn(obj, 'message'))
        return obj;
    
    for (var i in obj) {
        if (typeof(obj[i]) !== 'object')
            continue;

        let res = findMsginObject(obj[i]);
        if (res)
            return res;
    }

    return null;
}

export const makeGetAllMsg = (db) => ({

    getAllMsg(req, res) {
        const MsgRef = ref(db, "messages");
        get(MsgRef)
        .then((snapshot) => {
            const data = snapshot.val() || {};
            let rets = []
            for (var i in data) {
                /** DB sometimes stores in recursive way */
                rets = rets.concat(findMsginObject(data[i]));
            }
            /** [{message, username, timestamp}] */
            res.json(rets);

        }).catch((err) => {res.status(500).send("DB read error")});
    }
}); 