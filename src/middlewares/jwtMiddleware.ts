import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import type { AuthenticatedRequest } from "../@types";
import logger from "../services/logger";

interface JWTPayload extends jwt.JwtPayload {
  userId: string;
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  if (!process.env.JWT_SECRET) {
    logger.error("JWT_SECRET is not defined");
    return res.status(500).json({ error: "Internal server error" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
    if (!decoded.userId || (decoded.exp && Date.now() >= decoded.exp * 1000)) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const user = await User.findOne({ where: { id: decoded.userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    (req as AuthenticatedRequest).user = user;
    next();
  } catch (err) {
    logger.error("Token verification error:", err);
    return res.status(401).json({ error: "Token verification failed" });
  }
};
