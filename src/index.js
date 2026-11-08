import express, { response } from "express";
import { Account } from "./models/Account.js";

const server = express();
const port = 3000;
const allAccounts = [];

server.use(express.json());

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

server.get("/accounts/:id", (req ,res) => {
    const {id} = req.params;
    const foundAccount = allAccounts.find((account) => account.id === id);
    if (!foundAccount){
        return res.status(404).json({
            error: "account not found"
        });
    };
    res.json({
        id: foundAccount.id,
        ownerName: foundAccount.ownerName,
        balance: foundAccount.balance,
        createdAt: foundAccount.createdAt
    });
});
server.get("/health", (request, response) => {
  response.json({ status: "ok" });
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});