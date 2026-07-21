import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

export const User = mongoose.model("User", userSchema);
