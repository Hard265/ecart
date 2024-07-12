import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  HasManyGetAssociationsMixin,
} from "@sequelize/core";
import {
  Attribute,
  PrimaryKey,
  NotNull,
  Default,
  HasMany,
  BelongsTo,
} from "@sequelize/core/decorators-legacy";
import uniqid from "uniqid";
import { Product } from "./Product";
import { User } from "./User";

export class Cart extends Model<
  InferAttributes<Cart>,
  InferCreationAttributes<Cart>
> {
  @PrimaryKey
  @Attribute(DataTypes.STRING(18))
  @Default(() => uniqid())
  declare id: CreationOptional<string>;

  /** Defined by {@link User.reviews} */
  declare user?: NonAttribute<User>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare userId: string;

  @HasMany(() => CartItem, {
    foreignKey: "cartId",
    inverse: {
      as: "cart",
    },
  })
  declare cartItems: NonAttribute<CartItem[]>;

  declare getItems: HasManyGetAssociationsMixin<CartItem>;
}

export class CartItem extends Model<
  InferAttributes<CartItem>,
  InferCreationAttributes<CartItem>
> {
  @PrimaryKey
  @Attribute(DataTypes.STRING(18))
  @Default(() => uniqid())
  declare id: CreationOptional<string>;

  declare cart?: NonAttribute<Cart>;

  @Attribute(DataTypes.STRING(18))
  @NotNull
  declare cartId: string;

  declare product: NonAttribute<Product>;

  @Attribute(DataTypes.STRING(18))
  @NotNull
  declare productId: string;

  @Attribute(DataTypes.INTEGER)
  declare quantity: number;
}
