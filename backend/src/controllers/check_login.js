import { URLConfig } from "../../config/url.js";

/** check login status */
export const check_login = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', URLConfig.frontend);
    if (req.session.user)
        res.json({ loggedIn: true, user: req.session.user });
    else
        res.json({ loggedIn: false });
};