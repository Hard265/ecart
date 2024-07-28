
import express from "express";
import * as paymentController from "../controllers/paymentController";
import { authenticateToken } from "../middleware/jwtMiddleware";

const router = express.Router();

router.post("/create-payment-intent", authenticateToken, paymentController.createPaymentIntent);
router.post("/webhook", express.raw({type: 'application/json'}), paymentController.handleWebhook);

export default router;
