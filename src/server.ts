import express, { Express, Request, Response } from "express";
import session from "express-session";
import productsRoutes from "./routes/productsRoutes";
import authentionsRoutes from "./routes/authentionsRoutes";

import dotenv from "dotenv";
import sequelize from "./sequelize";

dotenv.config();
sequelize.sync();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(express.json());

app.use("/api/products", productsRoutes);
app.use("/", authentionsRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Shopping API");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
