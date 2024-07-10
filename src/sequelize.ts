import { Sequelize } from "@sequelize/core";
import { SqliteDialect } from "@sequelize/sqlite3";
import { Product } from "./models/Product";
import { User } from "./models/User";

const sequelize = new Sequelize({
  dialect: SqliteDialect,
  storage: "sequelize.sqlite",
  models: [Product, User],
});

export default sequelize;
