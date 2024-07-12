import { Response } from "express";
import { AuthenticatedRequest } from "../@types";
import { Order } from "../models/Order";

export const getAllOrders = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const orders = (
    await Order.findAll({
      where: { userId: req.user.id },
    })
  ).map((order) => order.toJSON());

  res.json(orders);
};

export const getOrderById = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { id } = req.params;
  const order = await Order.findByPk(id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  res.json(order.toJSON());
};

export const createOrder = async (req: AuthenticatedRequest, res: Response) => {
  const order = await Order.create({ ...req.body, userId: req.user.id });
  res.json(order.toJSON());
};

export const deleteOrder = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const order = await Order.findOne({ where: { userId: req.user.id, id: id } });
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  await order.destroy();
  res.json({ message: "Order deleted" });
};
