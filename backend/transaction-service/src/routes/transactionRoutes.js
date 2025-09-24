import express from "express";
import Transaction from "../models/Transaction.js";
import axios from "axios";

const router = express.Router();

// Record a transaction (Deposit / Withdraw)
router.post("/create", async (req, res) => {
  try {
    const { accountId, type, amount } = req.body;

    if (!["deposit", "withdraw"].includes(type)) {
      return res.status(400).json({ error: "Invalid transaction type" });
    }

    // Call Account Service API to update balance
    const accountServiceUrl = process.env.ACCOUNT_SERVICE_URL || "http://localhost:4002/api/accounts";
    const endpoint = type === "deposit" ? "deposit" : "withdraw";

    await axios.post(`${accountServiceUrl}/${accountId}/${endpoint}`, { amount });

    // Save transaction
    const transaction = new Transaction({ accountId, type, amount });
    await transaction.save();

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all transactions for an account
router.get("/account/:accountId", async (req, res) => {
  try {
    const transactions = await Transaction.find({ accountId: req.params.accountId }).sort({ timestamp: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
