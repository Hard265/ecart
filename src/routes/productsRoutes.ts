import express, { Router } from "express";
import * as productsController from "@/controllers/productsController";
import { authenticateToken } from "@/middlewares/jwtMiddleware";
import { verifyProductOwnership } from "@/middlewares/authorizationMiddleware";

const router: Router = express.Router();

router.get("/", authenticateToken, productsController.getAllProducts);
router.get("/:id", authenticateToken, productsController.getProductsById);
router.post("/", authenticateToken, productsController.createProducts);
router.put("/:id", authenticateToken, verifyProductOwnership, productsController.updateProducts);
router.delete("/:id", authenticateToken, verifyProductOwnership, productsController.deleteProducts);

export default router;
