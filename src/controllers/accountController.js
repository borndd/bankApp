import { Account } from "../models/Account.js";
import { allAccounts } from "../data/accountStorage.js";
import {findAccountbyId} from "../data/accountStorage.js";

export function createAccount(req, res){
     const { ownerName } = req.body;
        const newAccount = new Account(ownerName);
        allAccounts.push(newAccount);
    
        res.status(201).json(toAccountResponse(newAccount));
}

export function findAccountById(req, res){
    const foundAccount = findAccountbyId(req.params.id);
      if (!foundAccount) {
        return res.status(404).json({
          error: "account not found",
        });
      }
      res.json(toAccountResponse(foundAccount));
}

export function getAllAccounts(req, res){
    const listAccounts = allAccounts.map(toAccountResponse);
      res.json(listAccounts);
}

export function deposit(req, res){
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

export function withdraw(req, res){
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
export function transactionHistory(req, res){
     const foundAccount = findAccountbyId(req.params.id);
      if (!foundAccount) {
        return res.status(404).json({
          error: "Account not found",
        });
      }
      res.status(200).json(foundAccount.transactions);
}

function toAccountResponse(account){
    return{
        id: account.id,
        ownerName: account.ownerName,
        balance: account.balance,
        createdAt:account.createdAt
    }
}