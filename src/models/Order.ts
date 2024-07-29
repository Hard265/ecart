import {
    CreationOptional,
    DataTypes,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasOneGetAssociationMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
} from "@sequelize/core";
import {
    Attribute,
    Default,
    HasMany,
    HasOne,
    NotNull,
    PrimaryKey,
} from "@sequelize/core/decorators-legacy";
import uniqid from "uniqid";
import { User } from "./User";
import { Product } from "./Product";

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
    declare createItem: HasManyCreateAssociationMixin<
        OrderItem,
        "orderId"
    >;
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


    @HasOne(Product, "id")
    declare product: NonAttribute<Product>;
    declare getProduct: HasOneGetAssociationMixin<Product>;

    static getPrice(): number {
        return Math.random()
    }
}
