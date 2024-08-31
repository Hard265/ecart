import express, { Router } from "express";
import * as authenticationsController from "../controllers/authenticationsController";

const router: Router = express.Router();

router.post("/signup", authenticationsController.signup);
router.post("/login", authenticationsController.login);
router.post("/logout", authenticationsController.logout);
router.post("/whoami", authenticationsController.whoami);

export default router;
