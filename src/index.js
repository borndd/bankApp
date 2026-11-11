import express from "express";
import { ValidationError } from "./errors/ValidationError.js";
import { accountRouter } from "./routes/accountRoutes.js";
import { connectDatabase } from "./config/database.js";
import { authRouter } from "./routes/authRoutes.js";
const server = express();
const port = 3000;


server.use(express.json());
// в терминале пишет что ты делаешь
server.use((req, res, next) =>{
    console.log("Server:", new Date().toISOString(), req.method, req.url)
    next();
})
server.use("/accounts", accountRouter);
server.use("/auth", authRouter);
// читает описание  
server.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
// проверка сервера

server.use((req, res)=> {
    res.status(404).json({error: "Address not found"});
});
// отвечает если адрес не верный

server.use((err, req, res, next)=>{
    if(err instanceof ValidationError){
        return res.status(400).json({error: err.message});
    }
    if(err.name === "ValidationError"){
        return res.status(400).json({error: Object.values(err.errors)[0].message});
    }
    console.error(err);
    res.status(500).json({error: "Server Error"})
});

await connectDatabase();
server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

