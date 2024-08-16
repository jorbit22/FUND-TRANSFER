import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, email, password, balance = 0 } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      balance,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
});

router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

router.put("/user/balance", async (req: Request, res: Response) => {
  try {
    const { userId, balance } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.balance = balance;
    await user.save();

    res.status(200).json({ message: "Balance updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating balance", error });
  }
});

export default router;
