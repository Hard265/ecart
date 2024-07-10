import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { generateToken } from "../utils/tokens";

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log(username, password);

  // Check for existing user
  const existingUser = await User.findOne({ where: { username } });

  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({
    username,
    password: hashedPassword,
    // Add other relevant fields
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Validate credentials against your data store (using your ORM)
  const user = await User.findOne({ where: { username } });

  const hashedPassword = await bcrypt.hash(password, 10);
  if (!user || !user.comparePassword(hashedPassword)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT upon successful login
  const token = generateToken(user.id);
  res.json({ token });
};

export const logout = async (req: Request, res: Response) => {
  // Optional: Perform any server-side actions like logging
  console.log("User logged out.");
  res.status(200).json({ message: "Successfully logged out" });
};
