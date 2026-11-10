import express from "express";
import { ValidationError } from "./errors/ValidationError.js";
import { createAccount, findAccountById, getAllAccounts, deposit, withdraw, transactionHistory } from "./controllers/accountController.js";
const server = express();
const port = 3000;


server.use(express.json());
// в терминале пишет что ты делаешь
server.use((req, res, next) =>{
    console.log("Server:", new Date().toISOString(), req.method, req.url)
    next();
})
// читает описание
server.post("/accounts", createAccount);
// создает новый счет
server.get("/accounts/:id", findAccountById);
// ищет аккаунт по айди
server.get("/accounts", getAllAccounts);
// ищет все аккаунты
server.post("/accounts/:id/deposit", deposit);
// для депозит
server.post("/accounts/:id/withdraw", withdraw);
// для снятие
server.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
// проверка сервера
server.get("/accounts/:id/transactions", transactionHistory);
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

