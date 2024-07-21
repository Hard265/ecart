import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { AuthenticatedRequest } from "../@types";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined");
    return res.status(500).json({ error: "Internal server error" });
  }

  try {
    const { userId, exp } = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as jwt.JwtPayload & { userId: string };

    if (!userId) {
      return res.status(401).json({ error: "Invalid token" });
    }

    if (exp && Date.now() >= exp * 1000) {
      return res.status(401).json({ error: "Token has expired" });
    }

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(406).json({ error: "User not found" });
    }

    (req as AuthenticatedRequest).user = user;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).json({ error: "Token verification failed" });
  }
};
