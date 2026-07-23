import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import path from "path";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import { User } from "./db/user.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
    res.sendFile("/pages/register.html", { root: __dirname });
});

app.post("/register", async (req, res) => {

    const { username, email, password } = req.body;

    bcrypt.hash(password, 10, async function (err, hash) {
        let newUser = await User.create({
            username,
            email,
            password: hash
        });

        console.log("User created");

        var token = jwt.sign({ email: newUser.email }, 'shhhhh');
        
        res.cookie('token', token);
        console.log("Redirecting to login");
        res.redirect("/login");
    });

});

app.get("/login", (req, res) => {
    res.sendFile("/pages/login.html", { root: __dirname });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        console.log("User not found");
        return res.status(400).send("User not found");
    } else {
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                console.log("Login successful");
                res.redirect("/user");
            } else {
                console.log("Invalid password");
                res.status(400).send("Invalid password");
            }
        });
    }
});

app.get("/user", (req, res) => {
    res.sendFile("/pages/user.html", { root: __dirname });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});