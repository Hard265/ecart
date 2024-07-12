import { Request } from "express";
import jwt from "jsonwebtoken";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";

interface User {
  id: string;
  username: string;
  cart?: Cart;
  products?: Product[];
  password: string;
}

export interface AuthenticatedRequest extends Request {
  user?: User | any;
}

export interface JwtPayload {
  userId: string;
  // Include other non-sensitive user information if needed
}
