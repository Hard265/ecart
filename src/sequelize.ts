import { Sequelize } from "@sequelize/core";
import { SqliteDialect } from "@sequelize/sqlite3";
import { Product } from "./models/Product";
import { User } from "./models/User";
import { Cart, CartItem } from "./models/Cart";

const sequelize = new Sequelize({
  dialect: SqliteDialect,
  storage: "sequelize.sqlite",
  models: [Product, User, Cart, CartItem],
});

export default sequelize;
