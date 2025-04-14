import express from "express";
import cors from "cors";
// user-session auth.
import session from "express-session";
// router
import authRoutes from "./routes/auth.js";
import appRoutes from "./routes/apps.js";

import { URLConfig } from "../config/url.js";

const app = express();
const port = process.env.PORT || 8000;

/** This allows cookies and credentials for this origin under CORS policy */
const corsOption = {
    origin: URLConfig.frontend, //"https://61a7-140-112-194-228.ngrok-free.app",
    credentials: true,
}
app.use(cors(corsOption));


/** session settings */
// ref: https://stackoverflow.com/questions/75402568/session-cookie-not-saving-after-app-deployment
app.set('trust proxy', 1);

app.use(session({
    secret: "r_1_3_9_z_1_A_o_2_NtU",
    name: "connect.sid", // default cookie session name
    saveUninitialized: false,
    resave: false,
    cookie: { 
        maxAge: 600 * 1000, // 10 minutes due
        secure: true,
        sameSite: 'none', // allow cookies on different sites
    }
    
}));

app.get("/test", (_, res) => {
    res.json({"message": "<p>Hello from server LAB</p>"});
});

app.use("/api", authRoutes);
app.use("/app", appRoutes);

app.listen(port, () => {
    console.log(`[backend/index] server listening on ${port}`);
});