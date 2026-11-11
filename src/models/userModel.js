import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: { type: String, required: [true, "enter a password"] },
    role: { type: String, enum: ["admin", "customer"], default: "customer" },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model("User", userSchema);
