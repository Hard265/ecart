import express, {
    Express,
    Request,
    Response,
} from "express";
import multer from "multer";
import productsRoutes from "./routes/productsRoutes";
import authentionsRoutes from "./routes/authentionsRoutes";
import usersRoutes from "./routes/usersRoutes";
import cartRoutes from "./routes/cartRoutes";
import reviewsRoutes from "./routes/reviewsRoutes";
import ordersRoutes from "./routes/ordersRoutes";
import categoriesRoutes from "./routes/categoriesRoutes";
import path from "path";
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
            cb(
                null,
                Date.now() + path.extname(file.originalname)
            );
        },
    }),
});

app.use(express.json());

app.use("/api/products", productsRoutes);
app.use("/api/products/:id/reviews", reviewsRoutes);
app.use("/api/auth", authentionsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/categories", categoriesRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Shopping API");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
