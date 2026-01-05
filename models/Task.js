import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: Number,
      min: 1,   // optional: 1 = low, 2 = medium, 3 = high
      max: 3,
      default: 1,
    },
    category: {
    type: String,
    trim: true,
    default: "Work", // optional
    },

  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);

/*
timestamps: true automatically adds createdAt and updatedAt.
trim: true removes accidental spaces from strings.
enum ensures status has clean, consistent values.
Priority is numeric (1–3), but you can expand/change that anytime.
*/