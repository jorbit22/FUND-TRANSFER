// src/models/transaction.ts
import { Schema, model } from "mongoose";

const TransactionSchema = new Schema({
  senderId: { type: String, ref: "User", required: true },
  receiverId: { type: String, ref: "User", required: true },
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  date: { type: Date, default: Date.now },
});

const Transaction = model("Transaction", TransactionSchema);
export default Transaction;
