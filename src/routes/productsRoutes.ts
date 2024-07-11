import express, { Router } from "express";
import * as productsController from "../controllers/productsController";
import { authenticateToken } from "../middlewares/jwtMiddleware";

const router: Router = express.Router();

router.get("/", authenticateToken, productsController.getAllProducts);
router.get("/:id", authenticateToken, productsController.getProductsById);
router.post("/", authenticateToken, productsController.createProducts);
router.put("/:id", authenticateToken, productsController.updateProducts);
router.delete("/:id", authenticateToken, productsController.deleteProducts);

export default router;
