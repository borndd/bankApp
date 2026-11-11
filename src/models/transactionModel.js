import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
     accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      index: true,
    },
        type: {type: String, enum: ["deposit", "withdraw"], required: true },
        amount: {type: Number, required: true, min: 1}
    },
        {timestamps: {createdAt: true, updatedAt: false}}
);

export const TransactionModel = mongoose.model("Transaction", transactionSchema);