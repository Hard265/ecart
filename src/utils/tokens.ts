import jwt from "jsonwebtoken";
import { JwtPayload } from "../@types";

export function generateToken(userId: string): string {
  const payload: JwtPayload = { userId };
  const secret = process.env.JWT_SECRET; // Store secret securely (environment variable)
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, secret!, options);
}
