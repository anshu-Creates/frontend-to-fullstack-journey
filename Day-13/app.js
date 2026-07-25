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
                var token = jwt.sign({ email: user.email }, 'shhhhh');
                console.log("Token generated");
                res.cookie('token', token);
                console.log("Token set in cookie");
                console.log("Login successful");
                res.redirect("/user");
            } else {
                console.log("Invalid password");
                res.status(400).send("Invalid password");
            }
        });
    }
});

app.get("/user", isLoggedin, (req, res) => {
    console.log(req.user);
    res.sendFile("/pages/user.html", { root: __dirname });
});

function isLoggedin(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send("Access denied");
    } else {
        jwt.verify(token, 'shhhhh', function (err, decoded) {
            if (err) {
                return res.status(401).send("Access denied");
            }
            req.user = decoded;
            next();
        });
    }

}

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});