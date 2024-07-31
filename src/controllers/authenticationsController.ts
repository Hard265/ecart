import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { generateToken } from "../utils/tokens";
import logger from "../services/logger";

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide username and password" });
  }

  // Check for existing user
  const existingUser = await User.findOne({ where: { username } });

  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const savedUser = await User.create({
      username,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide username and password" });
  }

  // Validate credentials against your data store (using your ORM)
  const user = await User.findOne({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT upon successful login
  const token = generateToken(user.id);
  res.json({ token });
};

export const logout = async (req: Request, res: Response) => {
  // Optional: Perform any server-side actions like logging
  logger.log("2", "User logged out.");
  res.status(200).json({ message: "Successfully logged out" });
};
