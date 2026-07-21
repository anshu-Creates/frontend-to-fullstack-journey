import express from "express";
import mongoose, { connect } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { User } from './models/users.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`,
    );
    console.log(
      `MONGODB CONNECTION SUCCESSFULL !! ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log(`MONGODB CONNECTION FAILED !!`, error);
    process.exit(1);
  }
};

connectDB();

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "pages/index.html"));
});

app.post('/create', async function (req, res) {
  let { name, email, age } = await req.body;

  let CreatedUser = await User.create({
    name, email, age
  });
  res.redirect("/user-page")
});

app.get('/users', async function (req, res) {
  const users = await User.find();
  res.json(users);
});

app.get('/user-page', function (req, res) {
  res.sendFile(path.join(__dirname, "pages/users.html"));

})

app.listen(process.env.PORT, function () {
  console.log("Server is runnig on PORT ", process.env.PORT);
});
