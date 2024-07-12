import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../@types";
import { Cart } from "../models/Cart";
import { User } from "../models/User";
import { InferAttributes } from "@sequelize/core";

export interface CartRequest extends AuthenticatedRequest {
  cart: Cart;
}

export const cartMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  let cart = await Cart.findOne({ where: { userId: req.user.id } });
  if (!cart) {
    cart = await Cart.create({ userId: req.user.id });
  }
  (req as CartRequest).cart = cart;
  next();
};
