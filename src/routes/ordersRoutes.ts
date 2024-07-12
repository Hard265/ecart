import express, { Router } from "express";
import { authenticateToken } from "../middlewares/jwtMiddleware";
import * as ordersController from "../controllers/ordersController";

const router: Router = express.Router();

router.get("/", authenticateToken, ordersController.getAllOrders);
router.post("/", authenticateToken, ordersController.createOrder);
router.get("/:id", authenticateToken, ordersController.getOrderById);
router.delete("/:id", authenticateToken, ordersController.deleteOrder);

export default router;
