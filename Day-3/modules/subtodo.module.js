import mongoose from "mongoose";

const subtodoSchema = new mongoose.Schema(
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
  },
  { timestamps: true },
);

export const SubTodo = mongoose.Model("SubTodo", subtodoSchema);
