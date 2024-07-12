import { Request, Response } from "express";
import { Cart, CartItem } from "../models/Cart";
import { CartRequest } from "../middlewares/routesMiddleware";

export const getCart = async (req: CartRequest, res: Response) => {
  const items = await CartItem.findAll({ where: { cartId: req.cart.id } });

  res.json(items.map((item) => item.toJSON()));
};

export const addToCart = async (req: CartRequest, res: Response) => {
  const { productId, quantity } = req.body;

  const item = await CartItem.create({
    cartId: req.cart.id,
    productId,
    quantity: quantity,
  });

  res.json(item.toJSON());
};

export const updateCart = async (req: CartRequest, res: Response) => {
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

export const removeFromCart = async (req: CartRequest, res: Response) => {
  const { productId } = req.body;

  const item = await CartItem.destroy({
    where: { cartId: req.cart.id, productId },
  });
  res.json({ deleted: item });
};
