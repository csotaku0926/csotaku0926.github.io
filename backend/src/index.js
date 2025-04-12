import express from "express";
import cors from "cors";
// user-session auth.
import session from "express-session";
// router
import authRoutes from "./routes/auth.js";
import appRoutes from "./routes/apps.js";

const app = express();
const port = process.env.PORT || 8000;

/** This allows cookies and credentials for this origin under CORS policy */
app.use(cors({
    origin: "http://localhost:3000", // front-end origin
    credentials: true // allows sending cookies
}));

/** session settings */
app.use(session({
    secret: "r_1_3_9_z_1_A_o_2_NtU",
    name: "connect.sid", // default cookie session name
    saveUninitialized: false,
    resave: true,
    cookie: { maxAge: 600 * 1000 } // 10 minutes due
}));

app.get("/test", (_, res) => {
    res.json({"message": "<p>Hello from server LAB</p>"});
});

app.use("/api", authRoutes);
app.use("/app", appRoutes);

app.listen(port, () => {
    console.log(`[backend/index] server listening on ${port}`);
});