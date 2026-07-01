import express, { json } from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get("/", (req, res) => {
  res.send("Hello World !!");
});

app.get("/about", (req, res) => {
  res.send("This is About Page.");
});

app.get("/profile", (req, res) => {
  return next();
  res.send("This is Profile Page.");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});







