import { Sequelize } from "@sequelize/core";
import { SqliteDialect } from "@sequelize/sqlite3";
import { Product } from "./models/Product";
import { User } from "./models/User";
import { Cart, CartItem } from "./models/Cart";
import { Order, OrderItem } from "./models/Order";
import { Category } from "./models/Category";
import { Review } from "./models/Review";

const sequelize = new Sequelize({
  dialect: SqliteDialect,
  storage: "sequelize.sqlite",
  models: [Product, User, Cart, CartItem, Review, Order, OrderItem, Category],
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});


export default sequelize;
