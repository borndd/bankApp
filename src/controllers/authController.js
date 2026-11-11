import { registerUser } from "../services/authService.js";

export async function register(req, res){
    const { email, password } = req.body ?? {};
    const user = await registerUser(email, password);
    res.status(201).json({id:user._id, email:user.email, role:user.role});
}