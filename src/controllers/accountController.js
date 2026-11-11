import mongoose from "mongoose";
import { AccountModel } from "../models/accountModel.js";
import {
  depositToAccount,
  withdrawFromAccount,
  getTransactionsOfAccount,
} from "../services/accountService.js";

export async function createAccount(req, res) {
  const { ownerName } = req.body;

  const newAccount = await AccountModel.create({ ownerName });
  res.status(201).json(toAccountResponse(newAccount));
}

export async function getAccountById(req, res) {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({
      error: "account not found",
    });
  }
  const foundAccount = await AccountModel.findById(id);
  if (!foundAccount) {
    return res.status(404).json({ error: "Account not found" });
  }
  res.json(toAccountResponse(foundAccount));
}

export async function getAllAccounts(req, res) {
  const listAccounts = await AccountModel.find();
  res.json(listAccounts.map(toAccountResponse));
}

export async function deposit(req, res) {
  const { id } = req.params;
  const { amount } = req.body;

  const updatedAccount = await depositToAccount(id, amount);
  if (!updatedAccount) {
    return res.status(404).json({ error: "Account not found" });
  }
  res.status(200).json({
    id: updatedAccount.id,
    ownerName: updatedAccount.ownerName,
    balance: updatedAccount.balance,
  });
}

export async function withdraw(req, res) {
  const { id } = req.params;
  const { amount } = req.body;

  const updatedAccount = await withdrawFromAccount(id, amount);
  if (!updatedAccount) {
    return res.status(404).json({ error: "Account not found" });
  }
  res.status(200).json({
    id: updatedAccount.id,
    ownerName: updatedAccount.ownerName,
    balance: updatedAccount.balance,
  });
}

export async function transactionHistory(req, res) {
  const transactions = await getTransactionsOfAccount(req.params.id);
  if (!transactions) {
    return res.status(404).json({ error: "Account not found" });
  }
  res.status(200).json(transactions.map(toTransactionResponse));
}

function toTransactionResponse(transaction) {
  return {
    id: transaction.id,
    type: transaction.type,
    amount: transaction.amount,
    createdAt: transaction.createdAt,
  };
}

function toAccountResponse(account) {
  return {
    id: account.id,
    ownerName: account.ownerName,
    balance: account.balance,
    createdAt: account.createdAt,
  };
}
