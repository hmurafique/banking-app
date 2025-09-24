import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok", service: "auth-service" }));
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 4001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/authdb";

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection failed:", err));
