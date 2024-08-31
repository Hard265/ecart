import { Request, Response, NextFunction } from "express";
import { Product } from "../models/Product";
import { Cart } from "../models/Cart";
import { AuthenticatedRequest } from "../@types";
import { Order } from "../models/Order";

interface AuthorizedRequest extends AuthenticatedRequest {}

export const verifyProductOwnership = async (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res
                .status(404)
                .json({ message: "Product not found" });
        }

        if (product.userId !== req.user.id) {
            return res.status(403).json({
                message:
                    "You are not authorized to perform this action",
            });
        }
        next();
    } catch (error) {
        next(error);
    }
};

export const verifyCartOwnership = async (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findByPk(id);

        if (!cart) {
            return res
                .status(404)
                .json({ message: "Cart not found" });
        }

        if (cart.ownerId !== req.user.id) {
            return res.status(403).json({
                message:
                    "You are not authorized to perform this action",
            });
        }
        next();
    } catch (error) {
        next(error);
    }
};

export const verifyOrderOwnership = async (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
        return res
            .status(404)
            .json({ message: "Order not found" });
    }
    if (order.userId !== req.user.id) {
        return res.status(403).json({
            message:
                "You are not authorized to perform this action",
        });
    }
    next();
};
