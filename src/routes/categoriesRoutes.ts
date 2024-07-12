import { Router } from "express";
import { authenticateToken } from "../middlewares/jwtMiddleware";
import * as categoriesController from "../controllers/categoriesController";

const router: Router = Router();

router.get(
    "/",
    authenticateToken,
    categoriesController.getAllCategories
);
router.post(
    "/",
    authenticateToken,
    categoriesController.createCategory
);
router.delete(
    "/:id",
    authenticateToken,
    categoriesController.deleteCategory
);

export default router;
