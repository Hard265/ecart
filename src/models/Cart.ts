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
  HasMany,
  BelongsTo,
} from "@sequelize/core/decorators-legacy";
import uniqid from "uniqid";
import { Product } from "./Product";

export class Cart extends Model<
  InferAttributes<Cart>,
  InferCreationAttributes<Cart>
> {
  @PrimaryKey
  @Attribute(DataTypes.STRING(18))
  @Default(() => uniqid())
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare userId: string;

  @HasMany(() => CartItem, "cartId")
  declare cartItems: NonAttribute<CartItem[]>;

  async totalPrice() {
    return (await CartItem.findAll({ where: { cartId: this.id } })).reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
}

export class CartItem extends Model<
  InferAttributes<CartItem>,
  InferCreationAttributes<CartItem>
> {
  @PrimaryKey
  @Attribute(DataTypes.STRING(18))
  @Default(() => uniqid())
  declare id: CreationOptional<string>;

  @BelongsTo(() => Cart, "cartId")
  declare cart?: NonAttribute<Cart>;

  @Attribute(DataTypes.STRING(18))
  @NotNull
  declare cartId: string;

  @BelongsTo(() => Product, "productId")
  declare product: NonAttribute<Product>;

  @Attribute(DataTypes.STRING(18))
  @NotNull
  declare productId: string;

  @Attribute(DataTypes.INTEGER)
  declare quantity: number;
}
