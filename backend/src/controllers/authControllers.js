// firebase
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { firebaseConfig } from "../../config/config.js";
// auth functions
import { makeResiter } from "./register.js";
import { makeLogin } from "./login.js";
import { logout } from "./logout.js";
import { check_login } from "./check_login.js";
// get avatar
import { makeAvatar } from "./avatar.js";

// initialize Firebase database
const fb_app = initializeApp(firebaseConfig, 'auth_db');
const db = getDatabase(fb_app);
const client_url = "http://localhost:3000";

const authServices = {};

authServices.register = makeResiter(db);
authServices.login = makeLogin(db, client_url);
authServices.logout = logout;
authServices.check_login = check_login;
authServices.avatar = makeAvatar(db);

export default authServices;
