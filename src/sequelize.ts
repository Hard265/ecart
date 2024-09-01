import { Sequelize } from "@sequelize/core";
import { SqliteDialect } from "@sequelize/sqlite3";
import { PostgresDialect } from '@sequelize/postgres';
import { Product } from "./models/Product";
import { User } from "./models/User";
import { Cart, CartItem } from "./models/Cart";
import { Order, OrderItem } from "./models/Order";
import { Category } from "./models/Category";
import { Review } from "./models/Review";

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: "ecart_7gdv",
  user: "hard265",
  password: "rJvAFCHX1QWLxuHnOl0rmLo86l2OXSpX",
  url: "postgresql://hard265:rJvAFCHX1QWLxuHnOl0rmLo86l2OXSpX@dpg-cr9tk7ij1k6c73blh8qg-a.oregon-postgres.render.com/ecart_7gdv",
  clientMinMessages: "notice",
 // port: 5432,
  models: [
    Product,
    User,
    Cart/* CartItem, Review, Order, OrderItem, Category*/,
  ],
});

export default sequelize;
