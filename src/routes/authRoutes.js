import express from "express";
import { login, register } from "../controllers/authController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

export const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);