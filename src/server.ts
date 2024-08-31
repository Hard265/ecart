import express, { Express, NextFunction, Request, Response } from "express";
import multer from "multer";
import rateLimit from "express-rate-limit";
import productsRoutes from "./routes/productsRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import authentionsRoutes from "./routes/authentionsRoutes";
import usersRoutes from "./routes/usersRoutes";
import cartRoutes from "./routes/cartRoutes";
import reviewsRoutes from "./routes/reviewsRoutes";
import ordersRoutes from "./routes/ordersRoutes";
import categoriesRoutes from "./routes/categoriesRoutes";

import * as paymentController from "./controllers/paymentController";

import path from "path";
import dotenv from "dotenv";
import helmet from "helmet";
import sequelize from "./sequelize";

dotenv.config();
sequelize.sync();

const app: Express = express();
const port = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

export const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
});

app.use(limiter);
app.use(helmet());
app.use(express.json());

app.use("/api/payments", paymentRoutes);
app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  paymentController.handleWebhook
);

app.use("/api/products", productsRoutes);
// app.use("/api/products/:id/reviews", reviewsRoutes);
app.use("/api/auth", authentionsRoutes);
app.use("/api/users", usersRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/orders", ordersRoutes);
// app.use("/api/categories", categoriesRoutes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "An unexpected error occurred" });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Shopping API");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
