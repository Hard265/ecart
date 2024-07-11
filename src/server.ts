import express, { Express, Request, Response } from "express";
import multer from "multer";
import productsRoutes from "./routes/productsRoutes";
import authentionsRoutes from "./routes/authentionsRoutes";
import path from 'path';
import dotenv from "dotenv";
import sequelize from "./sequelize";

dotenv.config();
sequelize.sync();

const app: Express = express();
const port = process.env.PORT || 3000;
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

app.use(express.json());

app.use("/api/products", productsRoutes);
app.use("/", authentionsRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Shopping API");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
