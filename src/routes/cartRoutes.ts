import express, { Router } from "express";
import { authenticateToken } from "../middlewares/jwtMiddleware";
import * as cartController from "../controllers/cartController";

const router: Router = express.Router();

router.get("/", authenticateToken, cartController.getCart);
router.post("/", authenticateToken, cartController.addToCart);
router.delete("/:id", authenticateToken, cartController.removeFromCart);
router.put("/:id", authenticateToken, cartController.updateCart);

export default router;
