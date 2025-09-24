import express from "express";
import Account from "../models/Account.js";

const router = express.Router();

// Create Account
router.post("/create", async (req, res) => {
  try {
    const { userId, accountNumber } = req.body;
    const account = new Account({ userId, accountNumber, balance: 0 });
    await account.save();
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Account by ID
router.get("/:id", async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ error: "Account not found" });
    res.json(account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deposit Money
router.post("/:id/deposit", async (req, res) => {
  try {
    const { amount } = req.body;
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ error: "Account not found" });

    account.balance += amount;
    await account.save();

    res.json({ message: "Deposit successful", balance: account.balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Withdraw Money
router.post("/:id/withdraw", async (req, res) => {
  try {
    const { amount } = req.body;
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ error: "Account not found" });

    if (account.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    account.balance -= amount;
    await account.save();

    res.json({ message: "Withdrawal successful", balance: account.balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
