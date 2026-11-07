import express from "express";
import { Account } from "./models/Account.js";

const app = express();
const port = 3000;
const accounts = [];
app.use(express.json());

app.post("/accounts", (req,res)=> {
    try{
        const {ownerName} = req.body;
        const account = new Account(ownerName);
        accounts.push(account);
        res.status(201).json({
            id:account.id,
            ownerName:account.ownerName,
            balance: account.balance,
            createdAt: account.createdAt
        })
    }catch(error){
        res.status(400).json({
            error: error.message
        })
    }
})
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
