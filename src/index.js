import express from "express";
import { Account } from "./models/Account.js";
import { Transaction } from "./models/Transaction.js";
import { ValidationError } from "./errors/ValidationError.js";
import { allAccounts, findAccountbyId } from "./data/accountStorage.js";
const server = express();
const port = 3000;


server.use(express.json());
// в терминале пишет что ты делаешь
server.use((req, res, next) =>{
    console.log("Server:", new Date().toISOString(), req.method, req.url)
    next();
})
// читает описание
server.post("/accounts", (req, res) => {
    const { ownerName } = req.body;
    const newAccount = new Account(ownerName);
    allAccounts.push(newAccount);

    res.status(201).json({
      id: newAccount.id,
      ownerName: newAccount.ownerName,
      balance: newAccount.balance,
      createdAt: newAccount.createdAt,
    });
});
// создает новый счет
server.get("/accounts/:id", (req, res) => {
  const foundAccount = findAccountbyId(req.params.id);
  if (!foundAccount) {
    return res.status(404).json({
      error: "account not found",
    });
  }
  res.json({
    id: foundAccount.id,
    ownerName: foundAccount.ownerName,
    balance: foundAccount.balance,
    createdAt: foundAccount.createdAt,
  });
});
// ищет аккаунт по айди
server.get("/accounts", (req, res) => {
  const listAccounts = allAccounts.map((account) => ({
    id: account.id,
    ownerName: account.ownerName,
    balance: account.balance,
    createdAt: account.createdAt,
  }));
  res.json(listAccounts);
});
// ищет все аккаунты
server.post("/accounts/:id/deposit", (req, res) => {
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
});
// для депозит
server.post("/accounts/:id/withdraw", (req, res) => {
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
    
});
// для снятие
server.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
// проверка сервера
server.get("/accounts/:id/transactions", (req, res) => {
  const foundAccount = findAccountbyId(req.params.id);
  if (!foundAccount) {
    return res.status(404).json({
      error: "Account not found",
    });
  }
  res.status(200).json(foundAccount.transactions);
});
// историю операций

server.use((req, res)=> {
    res.status(404).json({error: "Address not found"});
});
// отвечает если адрес не верный

server.use((err, req, res, next)=>{
    if(err instanceof ValidationError){
        return res.status(400).json({error: err.message});
    }
    console.error(err);
    res.status(500).json({error: "Server Error"})
});
server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

