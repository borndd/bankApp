import {randomUUID} from "node:crypto";

const ALLOWED_OPERATIONS = ["deposit", "withdraw"];
export class Transaction {
    constructor(type, amount){
        if(!ALLOWED_OPERATIONS.includes(type)){
            throw new Error("Not allowed operation");
        };
        if(!Number.isSafeInteger(amount) || amount<=0){
            throw new Error("enter a valid number");
        };
        this.id = randomUUID();
        this.type = type;
        this.amount = amount;
        this.createdAt= new Date();
        Object.freeze(this);
    };
}