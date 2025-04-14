import axios from "axios";
import { makeAuth } from "./auth";
import { makeLogin } from "./login";
import { makeAPI } from "./api";
import { makeMsg } from "./chat";

axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: "https://5be8-140-112-194-228.ngrok-free.app", //"http://localhost:8000/", //backend server URL
    withCredentials: true, // enable sending cookies
})

const services = {};

services.auth = makeAuth(api);
services.login = makeLogin(api);
services.api = makeAPI(api);
services.msg = makeMsg(api);

export default services;