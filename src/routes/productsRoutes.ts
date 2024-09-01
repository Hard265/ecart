import express, { Router } from "express";
import * as productsController from "../controllers/productsController";
import * as reviewsController from "../controllers/reviewsController";
import { authenticateToken } from "../middlewares/jwtMiddleware";
import { verifyProductOwnership } from "../middlewares/authorizationMiddleware";

const router: Router = express.Router();

router.get(
    "/",
    authenticateToken,
    productsController.getAllProducts
);
router.get(
    "/:id",
    authenticateToken,
    productsController.getProductsById
);
router.post(
    "/",
    authenticateToken,
    productsController.createProducts
);
router.put(
    "/:id",
    authenticateToken,
    verifyProductOwnership,
    productsController.updateProducts
);
router.delete(
    "/:id",
    authenticateToken,
    verifyProductOwnership,
    productsController.deleteProducts
);

router.get(
    "/:id/reviews",
    authenticateToken,
    reviewsController.getReviews
);
router.post(
    "/:id/reviews",
    authenticateToken,
    reviewsController.createReview
);
router.delete(
    "/:id/reviews",
    authenticateToken,
    reviewsController.deleteReview
);

export default router;
