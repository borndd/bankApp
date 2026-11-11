import express from "express";
import { register } from "../controllers/authController.js";

export const authRouter = express.Router();

authRouter.post("/register", register);