import express, { response } from "express";
import { Account } from "./models/Account.js";
import { Transaction } from "./models/Transaction.js";

const server = express();
const port = 3000;
const allAccounts = [];

function findAccountbyId(id) {
  return allAccounts.find((account) => account.id === id);
}

server.use(express.json());
// в терминале пишет что ты делаешь
server.use((req, res, next) =>{
    console.log("Server:", new Date().toISOString(), req.method, req.url)
    next();
})

// читает описание
server.post("/accounts", (request, response) => {
  try {
    const { ownerName } = request.body;
    const newAccount = new Account(ownerName);
    allAccounts.push(newAccount);

    response.status(201).json({
      id: newAccount.id,
      ownerName: newAccount.ownerName,
      balance: newAccount.balance,
      createdAt: newAccount.createdAt,
    });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
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
  try {
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
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// для депозит
server.post("/accounts/:id/withdraw", (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// для снятие
server.get("/health", (request, response) => {
  response.json({ status: "ok" });
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
    res.status(400).json({err: err.message});
});
server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

