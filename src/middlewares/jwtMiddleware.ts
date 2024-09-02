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
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      logger.warn("Authorization header missing");
      res.status(401).json({ error: "Authorization header missing" });
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      logger.warn("Token missing in authorization header");
      res.status(401).json({ error: "No token provided" });
      return;
    }

    if (!process.env.JWT_SECRET) {
      logger.error("JWT_SECRET environment variable is not defined");
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

    if (!decoded.userId) {
      logger.warn("Token does not contain a valid userId");
      res.status(401).json({ error: "Invalid token" });
      return;
    }

    const user = await User.findOne({ where: { id: decoded.userId } });

    if (!user) {
      logger.warn(`User with id ${decoded.userId} not found`);
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Attach user to request object
    (req as AuthenticatedRequest).user = user;

    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      logger.warn("Invalid JWT token:", err.message);
      res.status(401).json({ error: "Invalid token" });
    } else if (err instanceof jwt.TokenExpiredError) {
      logger.warn("Expired JWT token:", err.message);
      res.status(401).json({ error: "Token expired" });
    } else {
      logger.error("Error during token authentication:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
