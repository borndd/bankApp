import { ValidationError } from "../errors/ValidationError.js";
import { UserModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";

export async function registerUser(email, password){
    if(typeof email !== "string" || !email.includes("@") || !email.trim()){
        throw new ValidationError("Enter your emails")
    };
    if(typeof password !== "string" || password.length < 8){
        throw new ValidationError("Password must be 8 or more characs");
    }

    const cleanUser = email.trim().toLowerCase();

    const taken = await UserModel.exists({email: cleanUser});
    if(taken){
        throw new ValidationError("account exists");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    try {
        return await UserModel.create({email: cleanUser, passwordHash});
    } catch (error) {
        if (error.code === 11000) {
            throw new ValidationError("account exists");
        }
        throw error;
    }
}