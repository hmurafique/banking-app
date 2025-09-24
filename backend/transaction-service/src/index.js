import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import transactionRoutes from "./routes/transactionRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok", service: "transaction-service" }));
app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 4003;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/transactiondb";

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Transaction service running on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection failed:", err));
