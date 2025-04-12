import { Router } from "express";
import appsServices from "../apps/appsControllers.js";
import bodyParser from "body-parser";

// parse request body to json format
const jsonParser = bodyParser.json();

const router = Router();

router.post("/post_msg", jsonParser, appsServices.post_message.post_message);
router.post("/del_msg", jsonParser, appsServices.delete_message.delete_message);
router.get("/get_all_msg", appsServices.get_all_msg.getAllMsg);

export default router;