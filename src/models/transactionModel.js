import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      index: true,
    },
    type: { type: String, enum: ["deposit", "withdraw", "transfer_out", "transfer_in"], required: true },
    amount: { type: Number, required: true, min: 1 },
    transferId: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transfer",
      index: true
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const TransactionModel = mongoose.model(
  "Transaction",
  transactionSchema,
);
