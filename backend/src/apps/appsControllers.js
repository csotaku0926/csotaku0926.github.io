// firebase
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { firebaseConfig } from "../../config/chat_config.js";
// apps functions
import { makePostMessage } from "./post_message.js";
import { makeGetAllMsg } from "./get_all_msg.js";
import { makeDeleteMessage } from "./delete_message.js";
import { makeAIGen } from "./AI_gen.js";

// initialize Firebase database
const fb_app = initializeApp(firebaseConfig, 'chat_db');
const db = getDatabase(fb_app);
const client_url = "http://localhost:3000";

const appsServices = {};

appsServices.post_message = makePostMessage(db);
appsServices.get_all_msg = makeGetAllMsg(db);
appsServices.delete_message = makeDeleteMessage(db);
appsServices.AI_gen = makeAIGen;

export default appsServices;
