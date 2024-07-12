import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from "@sequelize/core";
import {
  Attribute,
  PrimaryKey,
  NotNull,
  Default,
  Unique,
  HasMany,
  HasOne,
  BeforeDestroy,
} from "@sequelize/core/decorators-legacy";
import uniqid from "uniqid";
import { Product } from "./Product";
import { Cart } from "./Cart";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @PrimaryKey
  @Attribute(DataTypes.STRING(18))
  @Default(() => uniqid())
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  declare username: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare password: string;

  @HasMany(() => Product, "userId")
  declare products?: NonAttribute<Product[]>;

  @HasOne(() => Cart, "userId")
  declare cart?: NonAttribute<Cart>;
}
