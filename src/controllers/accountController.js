import mongoose from "mongoose";
import { AccountModel } from "../models/accountModel.js";
import { findAccountbyId } from "../data/accountStorage.js";

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
  if(!foundAccount){
   return res.status(404).json({error: "Account not found"})
  }
  res.json(toAccountResponse(foundAccount));
}

export async function getAllAccounts(req, res) {
  const listAccounts = await AccountModel.find();
  res.json(listAccounts.map(toAccountResponse));
}

export function deposit(req, res) {
  const foundAccount = findAccountbyId(req.params.id);
  if (!foundAccount) {
    return res.status(404).json({
      message: "Account not found",
    });
  }
  const { amount } = req.body;
  foundAccount.deposit(amount);
  res.status(200).json({
    id: foundAccount.id,
    ownerName: foundAccount.ownerName,
    balance: foundAccount.balance,
  });
}

export function withdraw(req, res) {
  const foundAccount = findAccountbyId(req.params.id);
  if (!foundAccount) {
    return res.status(404).json({
      error: "Account not found",
    });
  }
  const { amount } = req.body;
  foundAccount.withdraw(amount);
  res.status(200).json({
    id: foundAccount.id,
    ownerName: foundAccount.ownerName,
    balance: foundAccount.balance,
  });
}
export function transactionHistory(req, res) {
  const foundAccount = findAccountbyId(req.params.id);
  if (!foundAccount) {
    return res.status(404).json({
      error: "Account not found",
    });
  }
  res.status(200).json(foundAccount.transactions);
}

function toAccountResponse(account) {
  return {
    id: account.id,
    ownerName: account.ownerName,
    balance: account.balance,
    createdAt: account.createdAt,
  };
}
