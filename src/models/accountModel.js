import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    ownerName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    balance: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const AccountModel = mongoose.model("Account", accountSchema);
