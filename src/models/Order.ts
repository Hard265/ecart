import {
    BelongsToGetAssociationMixin,
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
    BelongsTo,
    Default,
    HasMany,
    HasOne,
    NotNull,
    PrimaryKey,
} from "@sequelize/core/decorators-legacy";
import uniqid from "uniqid";
import { User } from "./User";
import { Product } from "./Product";

type OrderStatus =
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";

export class Order extends Model<
    InferAttributes<Order>,
    InferCreationAttributes<Order>
> {
    @PrimaryKey
    @Attribute(DataTypes.STRING(18))
    @Default(() => uniqid())
    declare id: CreationOptional<string>;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare userId: number;

    @Attribute(
        DataTypes.ENUM(
            "pending",
            "processing",
            "shipped",
            "delivered",
            "cancelled"
        )
    )
    @NotNull
    @Default(() => "pending")
    declare status: OrderStatus;

    @Attribute(DataTypes.DATE)
    @NotNull
    @Default(DataTypes.NOW)
    declare orderDate: Date;

    @BelongsTo(() => User, "userId")
    declare user?: NonAttribute<User>;
    declare getUser: BelongsToGetAssociationMixin<User>;

    @HasMany(() => OrderItem, "orderId")
    declare items?: NonAttribute<OrderItem[]>;
    declare getItems: HasManyGetAssociationsMixin<OrderItem>;
    declare createItem: HasManyCreateAssociationMixin<
        OrderItem,
        "orderId"
    >;

    @Attribute(DataTypes.INTEGER)
    @NotNull
    get totalAmount(): Promise<number> {
        return this.getItems().then((items) =>
            items.reduce(
                (total, item) =>
                    total + item.price * item.quantity,
                0
            )
        );
    }
}

export class OrderItem extends Model<
    InferAttributes<OrderItem>,
    InferCreationAttributes<OrderItem>
> {
    @PrimaryKey
    @Attribute(DataTypes.STRING(18))
    @Default(() => uniqid())
    declare id: CreationOptional<string>;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare orderId: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare productId: string;

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare quantity: number;

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare price: number;

    @BelongsTo(() => Order, "orderId")
    declare order?: NonAttribute<Order>;

    @BelongsTo(() => Product, "productId")
    declare product?: NonAttribute<Product>;
    declare getProduct: BelongsToGetAssociationMixin<Product>;
}
