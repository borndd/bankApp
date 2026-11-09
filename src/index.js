import express, { response } from "express";
import { Account } from "./models/Account.js";

const server = express();
const port = 3000;
const allAccounts = [];

function findAccountbyId(id){
    return allAccounts.find((account) => account.id === id)
};

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
   const foundAccount = findAccountbyId(req.params.id);
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

server.get("/accounts", (req, res)=> {
    const listAccounts = allAccounts.map((account) => ({id: account.id, ownerName: account.ownerName, balance: account.balance, createdAt: account.createdAt}));
    res.json(listAccounts);
})

server.post("/accounts/:id/deposit", (req, res)=> {
    try{
    const foundAccount1 = findAccountbyId(req.params.id);
    if(!foundAccount1){
       return res.status(404).json({
            message: "Account not found"
        });
    };
    const { amount } = req.body;
    foundAccount1.deposit(amount);
    res.status(200).json({
        id: foundAccount1.id,
        ownerName: foundAccount1.ownerName,
        balance: foundAccount1.balance
    })
} catch (error) {
    res.status(400).json({ error: error.message });
  }
}); 

server.post("/accounts/:id/withdraw", (req,res)=> {
    try{
        const foundAccount2 = findAccountbyId(req.params.id);
        if(!foundAccount2){
           return res.status(404).json({
                "error" : "Account not found"
            });
        };
        const {amount} = req.body;
        foundAccount2.withdraw(amount);
        res.status(200).json({
            id: foundAccount2.id,
            ownerName: foundAccount2.ownerName,
            balance:foundAccount2.balance
        })
    }catch(error){
        res.status(400).json({error: error.message});
    }
})
server.get("/health", (request, response) => {
  response.json({ status: "ok" });
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});