import { Router } from "express";
import authServices from "../controllers/authControllers.js";
import bodyParser from "body-parser";

// parse request body to json format
const jsonParser = bodyParser.json();

const router = Router();

router.post("/register", jsonParser, authServices.register.register);
router.post("/login", jsonParser, authServices.login.login);
router.post("/logout", authServices.logout);
router.get("/check_login", authServices.check_login);
router.get("/avatar", authServices.avatar.avatar);

export default router;