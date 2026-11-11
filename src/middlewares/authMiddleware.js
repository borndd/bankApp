import jwt from "jsonwebtoken";
import { AuthError } from "../errors/AuthError.js";

export function requireAuth(req,res, next ){
    const header = req.headers.authorization;
    if(!header || !header.startsWith("Bearer ")){
        throw new AuthError("Token is missing");
    }

    const token = header.slice(7);
    try{
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {id:data.sub, role:data.role};
    }catch{
        throw new AuthError("Invalid token")
    }
    next();
}