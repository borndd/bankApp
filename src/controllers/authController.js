import { loginUser, registerUser } from "../services/authService.js";

export async function register(req, res) {
  const { email, password } = req.body ?? {};
  const user = await registerUser(email, password);
  res.status(201).json({ id: user._id, email: user.email, role: user.role });
}

export async function login(req, res) {
  const { email, password } = req.body ?? {};
  const { token, user } = await loginUser(email, password);
  res
    .status(200)
    .json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
}
