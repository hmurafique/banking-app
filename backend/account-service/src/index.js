import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import accountRoutes from "./routes/accountRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok", service: "account-service" }));
app.use("/api/accounts", accountRoutes);

const PORT = process.env.PORT || 4002;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/accountdb";

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Account service running on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection failed:", err));
