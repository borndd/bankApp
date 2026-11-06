import { randomUUID } from "node:crypto";
import { Transaction } from "./Transaction.js";
export class Account {
  #balance = 0;
  #transactions = [];
  constructor(ownerName) {
    if (typeof ownerName !== "string" || !ownerName.trim()) {
      throw new Error("You need to enter your name");
    }
    this.id = randomUUID();
    this.ownerName = ownerName;
    this.createdAt = new Date();
  }

  deposit(amount) {
    if (!Number.isSafeInteger(amount) || amount <= 0) {
      throw new Error("Enter a valid number");
    }
    const transaction = new Transaction("deposit", amount); 
    this.#balance += amount;
    this.#transactions.push(transaction);
  }


  withdraw(amount) {
    if (!Number.isSafeInteger(amount) || amount <= 0) {
      throw new Error("Enter a valid number");
    }
    if (amount > this.#balance) {
      throw new Error("You dont have enough balance");
    }
    const transaction = new Transaction("withdraw", amount); 
    this.#balance -= amount;
    this.#transactions.push(transaction);

  }
  get balance() {
    return this.#balance;
  }
  get transactions(){
    return [...this.#transactions];
  }
}
