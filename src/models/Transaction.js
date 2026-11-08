import { randomUUID } from "node:crypto";

const ALLOWED_TYPES = ["deposit", "withdraw"];

export class Transaction {
  constructor(type, amount) {
    if (!ALLOWED_TYPES.includes(type)) {
      throw new Error("Not allowed operation type");
    }
    if (!Number.isSafeInteger(amount) || amount <= 0) {
      throw new Error("Amount must be a positive whole number (in tiyin)");
    }
    this.id = randomUUID();
    this.type = type;
    this.amount = amount;
    this.createdAt = new Date();
    Object.freeze(this);
  }
}