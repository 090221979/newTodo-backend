import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors()); // keep it simple for now on Render

app.get("/", (req, res) => res.json({ message: "API is running" }));
app.use("/tasks", taskRoutes);

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;

// ✅ Start listening FIRST so Render detects an open port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ✅ Then connect Mongo
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
