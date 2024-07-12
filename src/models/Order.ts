import {
  CreationOptional,
  DataTypes,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import {
  Attribute,
  Default,
  HasMany,
  NotNull,
  PrimaryKey,
} from "@sequelize/core/decorators-legacy";
import uniqid from "uniqid";
import { User } from "./User";

export class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  @PrimaryKey
  @Attribute(DataTypes.STRING(18))
  @Default(() => uniqid())
  declare id: CreationOptional<string>;

  declare user: NonAttribute<User>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare userId: number;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Default(() => "pending")
  declare status: string;

  @HasMany(() => OrderItem, {
    foreignKey: "orderId",
    inverse: {
      as: "order",
    },
  })
  declare items?: NonAttribute<OrderItem[]>;
  declare getItems: HasManyGetAssociationsMixin<OrderItem>;
  declare createItem: HasManyCreateAssociationMixin<OrderItem, "orderId">;
}

export class OrderItem extends Model<
  InferAttributes<OrderItem>,
  InferCreationAttributes<OrderItem>
> {
  @PrimaryKey
  @Attribute(DataTypes.STRING(18))
  @Default(() => uniqid())
  declare id: CreationOptional<string>;

  declare order: NonAttribute<Order>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare orderId: string;
}
