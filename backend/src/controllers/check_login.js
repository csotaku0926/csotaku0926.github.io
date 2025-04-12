/** check login status */
export const check_login = (req, res) => {
    if (req.session.user)
        res.json({ loggedIn: true, user: req.session.user });
    else
        res.json({ loggedIn: false });
};