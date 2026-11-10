import express  from "express";
import { createAccount, getAccountById, getAllAccounts, deposit, withdraw, transactionHistory } from "../controllers/accountController.js";

export const accountRouter = express.Router();

accountRouter.post("/", createAccount);
// создает новый счет
accountRouter.get("/:id", getAccountById);
// ищет аккаунт по айди
accountRouter.get("/", getAllAccounts);
// ищет все аккаунты
accountRouter.post("/:id/deposit", deposit);
// для депозит
accountRouter.post("/:id/withdraw", withdraw);
// для снятие
accountRouter.get("/:id/transactions", transactionHistory);




