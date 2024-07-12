import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    NonAttribute,
    HasManyGetAssociationsMixin,
    HasOneGetAssociationMixin,
    HasOneCreateAssociationMixin,
    HasManyCreateAssociationMixin,
} from "@sequelize/core";
import {
    Attribute,
    PrimaryKey,
    NotNull,
    Default,
    Unique,
    HasMany,
    HasOne,
    AllowNull,
} from "@sequelize/core/decorators-legacy";
import uniqid from "uniqid";
import { Product } from "./Product";
import { Cart } from "./Cart";
import { Review } from "./Review";
import { Order } from "./Order";
import { IsEmail } from "@sequelize/validator.js";

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

    @HasMany(() => Product, {
        foreignKey: "userId",
        inverse: {
            as: "user",
        },
    })
    declare products?: NonAttribute<Product[]>;
    declare getProducts: HasManyGetAssociationsMixin<Product>;

    @HasMany(() => Review, {
        foreignKey: "userId",
        inverse: {
            as: "user",
        },
    })
    declare reviews?: NonAttribute<Review[]>;
    declare getReviews: HasManyGetAssociationsMixin<Review>;

    @HasOne(() => Cart, {
        foreignKey: "userId",
        inverse: {
            as: "user",
        },
    })
    declare cart?: NonAttribute<Cart>;
    declare getCart: HasOneGetAssociationMixin<Cart>;
    declare createCart: HasOneCreateAssociationMixin<
        Cart,
        "userId"
    >;

    @HasMany(() => Order, {
        foreignKey: "userId",
        inverse: {
            as: "user",
        },
    })
    declare orders?: NonAttribute<Order[]>;
    declare getOrders: HasManyGetAssociationsMixin<Order>;
    declare createOrder: HasManyCreateAssociationMixin<
        Order,
        "userId"
    >;
}
