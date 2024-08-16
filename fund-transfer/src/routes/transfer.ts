import express, { Request, Response } from "express";
import User from "../models/user";
import Transaction from "../models/transaction";

const router = express.Router();

router.post("/transfer", async (req, res) => {
  const { senderId, receiverId, amount } = req.body;

  try {
    // Find the sender and receiver
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Perform the transfer
    sender.balance -= amount;
    receiver.balance += amount;

    // Save the updated balances
    await sender.save();
    await receiver.save();

    // Log the transaction
    const transaction = new Transaction({
      senderId: sender._id,
      receiverId: receiver._id,
      amount: amount,
      status: "completed",
    });

    await transaction.save();

    res.status(200).json({ message: "Transfer successful", transaction });
  } catch (error) {
    res.status(500).json({ message: "Transfer failed", error });
  }
});

router.get("/transactions", async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
});
export default router;
