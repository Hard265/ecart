import { Request } from "express";
import jwt from "jsonwebtoken";

interface User {
  id: string;
  username: string;
  password: string;
}

export interface JwtPayload {
  userId: string;
  // Include other non-sensitive user information if needed
}

export interface AuthenticatedRequest extends Request {
  user?: User | jwt.JwtPayload;
}
