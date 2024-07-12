import express, { NextFunction, Router } from "express";
import { authenticateToken } from "../middlewares/jwtMiddleware";
import * as cartController from "../controllers/cartController";
import { cartMiddleware } from "../middlewares/routesMiddleware";

const router: Router = express.Router();

router.get(
  "/",
  authenticateToken,
  cartMiddleware,
  cartController.getCart as any
);
router.post(
  "/",
  authenticateToken,
  cartMiddleware,
  cartController.addToCart as any
);
router.delete(
  "/:id",
  authenticateToken,
  cartMiddleware,
  cartController.removeFromCart as any
);
router.put(
  "/:id",
  authenticateToken,
  cartMiddleware,
  cartController.updateCart as any
);

export default router;
