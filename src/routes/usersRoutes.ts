import express, { Router } from "express";
import * as usersController from "../controllers/usersController";
import { authenticateToken } from "../middlewares/jwtMiddleware";

const router: Router = express.Router();

router.get("/", authenticateToken, usersController.getAllUsers);
router.get("/whoami", authenticateToken, usersController.getMyUser);
router.get("/:username", authenticateToken, usersController.getUserByUsername);
router.put("/:username", authenticateToken, usersController.updateUser);
router.delete("/:username", authenticateToken, usersController.deleteUser);

export default router;
