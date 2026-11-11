import mongoose from "mongoose";
import { ValidationError } from "../errors/ValidationError.js";
import { AccountModel } from "../models/accountModel.js";
import { TransactionModel } from "../models/transactionModel.js";


export async function depositToAccount(id, amount) {
  if (!Number.isSafeInteger(amount) || amount <= 0) {
    throw new ValidationError("Amount must be a positive whole number");
  }
  if (!mongoose.isValidObjectId(id)) {
    return null;
  }

  const updated = await AccountModel.findByIdAndUpdate(
    id,
    { $inc: { balance: amount } },
    { returnDocument: "after" }
  );

  if (!updated) {
    return null;
  }

  await TransactionModel.create({ accountId: id, type: "deposit", amount });
  return updated;
}

export async function withdrawFromAccount(id, amount) { 
     if(!Number.isSafeInteger(amount) || amount <=0) {
        throw new ValidationError("Amount must be a whole price and more than 0")
    }
    if(!mongoose.isValidObjectId(id)){
        return null;
    }
    const updated = await AccountModel.findOneAndUpdate(
        {_id: id, balance: {$gte: amount}},
        {$inc: {balance: -amount}},
        {returnDocument :"after"} 
    );
    if(updated){
        await TransactionModel.create({accountId: id, type: "withdraw", amount});
        return updated;
    }
    const exists = await AccountModel.exists({_id: id})
    if(!exists){
        return null;
    }
    throw new ValidationError("Insufficient funds");
}

export async function getTransactionsOfAccount(id){
    if(!mongoose.isValidObjectId(id)){
        return null;
    }
    const exists = await AccountModel.exists({_id: id})
    if(!exists){
        return null;
    }
    return await TransactionModel.find({accountId: id}).sort({createdAt: -1});
}