import { randomUUID } from "node:crypto";
import { Transaction } from "./Transaction.js";

export class Account {
  #balance = 0; // 
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
      throw new Error("Amount must be a positive whole number (in tiyin)");
    }
    const newTransaction = new Transaction("deposit", amount);
    this.#balance += amount;
    this.#transactions.push(newTransaction);
  }

  withdraw(amount) {
    if (!Number.isSafeInteger(amount) || amount <= 0) {
      throw new Error("Amount must be a positive whole number (in tiyin)");
    }
    if (amount > this.#balance) {
      throw new Error("You don't have enough balance");
    }
    const newTransaction = new Transaction("withdraw", amount);
    this.#balance -= amount;
    this.#transactions.push(newTransaction);
  }

  get balance() {
    return this.#balance;
  }

  get transactions() {
    return [...this.#transactions];
  }
}