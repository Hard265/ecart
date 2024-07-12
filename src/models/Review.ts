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
} from "@sequelize/core/decorators-legacy";
import uniqid from "uniqid";
import { User } from "./User";
import { Product } from "./Product";

export class Review extends Model<
  InferAttributes<Review>,
  InferCreationAttributes<Review>
> {
  @PrimaryKey
  @Attribute(DataTypes.STRING(18))
  @Default(() => uniqid())
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.INTEGER)
  declare rating: number;

  @Attribute(DataTypes.TEXT)
  declare comment: string;

  /** Defined by {@link User.reviews} */
  declare user?: NonAttribute<User>;

  @Attribute(DataTypes.STRING(18))
  @NotNull
  declare userId: string;

  declare product?: NonAttribute<Product>;

  @Attribute(DataTypes.STRING(18))
  @NotNull
  declare productId: string;
}
