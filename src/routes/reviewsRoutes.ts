import express, { Router } from "express";
import { authenticateToken } from "../middlewares/jwtMiddleware";
import * as reviewsController from "../controllers/reviewsController";

const router: Router = express.Router();

router.get("/", authenticateToken, reviewsController.getReviews);
router.post("/", authenticateToken, reviewsController.createReview);
router.delete("/:id", authenticateToken, reviewsController.deleteReview);

export default router;
