import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/userDB");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
 
export const User = mongoose.model("User", UserSchema);