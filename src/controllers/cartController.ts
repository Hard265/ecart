import { Request, Response } from "express";
import { Cart, CartItem } from "../models/Cart";
import { AuthenticatedRequest } from "../@types";

export const getCart = async (req: AuthenticatedRequest, res: Response) => {
  const cart = await Cart.findOne({ where: { userId: req.user.id } });
  if (!cart) {
    res.status(404).json({ error: "Cart not found" });
  } else {
    const items = await CartItem.findAll({ where: { cartId: cart.id } });

    res.json(items.map((item) => item.toJSON()));
  }
};

export const addToCart = async (req: AuthenticatedRequest, res: Response) => {
  let cart = await Cart.findOne({ where: { userId: req.user.id } });
  const { productId, quantity } = req.body;

  if (!cart) {
    cart = await Cart.create({ userId: req.user.id });
  }

  const item = await CartItem.create({
    cartId: cart.id,
    productId,
    quantity: quantity,
  });

  res.json(item.toJSON());
};

export const updateCart = async (req: AuthenticatedRequest, res: Response) => {
  const cart = await Cart.findOne({ where: { userId: req.user.id } });
  const { productId, quantity } = req.body;

  if (!cart) {
    res.status(404).json({ error: "Cart not found" });
  } else {
    const item = await CartItem.findOne({
      where: { cartId: cart.id, productId },
    });
    if (!item) {
      res.status(404).json({ error: "Item not found" });
    } else {
      item.quantity = quantity;
      await item.save();
      res.json(item.toJSON());
    }
  }
};

export const removeFromCart = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const cart = await Cart.findOne({ where: { userId: req.user.id } });
  const { productId } = req.body;

  if (!cart) {
    res.status(404).json({ error: "Cart not found" });
  } else {
    const item = await CartItem.destroy({
      where: { cartId: cart.id, productId },
    });
    res.json({ deleted: item });
  }
};
