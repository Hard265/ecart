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
  BelongsTo,
} from "@sequelize/core/decorators-legacy";
import uniqid from "uniqid";
import { User } from "./User";

export class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  @PrimaryKey
  @Attribute(DataTypes.STRING(18))
  @Default(() => uniqid())
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @BelongsTo(() => User, {
    foreignKey: "userId",
    inverse: { as: "products", type: "hasMany" },
  })
  declare user: NonAttribute<User>;

  @Attribute(DataTypes.TEXT)
  @NotNull
  declare description: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare image: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare price: number;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare userId: string;
}
