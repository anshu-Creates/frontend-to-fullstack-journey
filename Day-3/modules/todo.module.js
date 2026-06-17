import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    createdby: {
      title: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subtodos: [
      {
        title: mongoose.Schema.Types.ObjectId,
        ref: "SubTodo",
      },
    ],
  },
  { timestamps: true },
);

export const Todo = mongoose.Model("Todo", todoSchema);
