import { ValidationError } from "../errors/ValidationError.js";
import { UserModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function registerUser(email, password) {
  if (typeof email !== "string" || !email.includes("@") || !email.trim()) {
    throw new ValidationError("Enter your emails");
  }
  if (typeof password !== "string" || password.length < 8) {
    throw new ValidationError("Password must be 8 or more characs");
  }

  const cleanUser = email.trim().toLowerCase();

  const taken = await UserModel.exists({ email: cleanUser });
  if (taken) {
    throw new ValidationError("account exists");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  try {
    return await UserModel.create({ email: cleanUser, passwordHash });
  } catch (error) {
    if (error.code === 11000) {
      throw new ValidationError("account exists");
    }
    throw error;
  }
}
export async function loginUser(email, password) {
  if (typeof email !== "string" || !email.includes("@") || !email.trim()) {
    throw new ValidationError("Enter your emails");
  }
  if (typeof password !== "string") {
    throw new ValidationError("Password must be 8 or more characs");
  }
  const user = await UserModel.findOne({ email: email.trim().toLowerCase() });
  if (!user) {
    throw new ValidationError("Invalid email or password");
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    throw new ValidationError("Invalid password");
  }
  const token = jwt.sign({ role: user.role }, process.env.JWT_SECRET, {
    subject: String(user._id),
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return { token, user };
}
