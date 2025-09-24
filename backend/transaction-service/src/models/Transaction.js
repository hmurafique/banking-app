import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  accountId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Account" },
  type: { type: String, enum: ["deposit", "withdraw"], required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Transaction", transactionSchema);
