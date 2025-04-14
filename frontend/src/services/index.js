import axios from "axios";
import { makeAuth } from "./auth";
import { makeLogin } from "./login";
import { makeAPI } from "./api";
import { makeMsg } from "./chat";
import { URLConfig } from "./url.js";

axios.defaults.withCredentials = true;
axios.defaults.headers.get["ngrok-skip-browser-warning"] = "any";

const api = axios.create({
    baseURL: URLConfig.backend, //"https://5be8-140-112-194-228.ngrok-free.app", //"http://localhost:8000/", //backend server URL
    withCredentials: true, // enable sending cookies
})

const services = {};

services.auth = makeAuth(api);
services.login = makeLogin(api);
services.api = makeAPI(api);
services.msg = makeMsg(api);

export default services;