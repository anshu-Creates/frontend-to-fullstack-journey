import express from "express";

const app = express();

app.use(function (req, res, next) {
  console.log("1st Middleware...");
  next();
});

app.use(function (req, res, next) {
  console.log("2nd Middleware...");
  next();
});

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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});




