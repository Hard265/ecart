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
    AfterCreate,
} from "@sequelize/core/decorators-legacy";
import uniqid from "uniqid";
import { Product } from "./Product";
import { Cart } from "./Cart";
import { Review } from "./Review";
import { Order } from "./Order";
// import { IsEmail } from "@sequelize/validator.js";

export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    @Attribute(DataTypes.STRING(18))
    @Default(() => uniqid())
    @PrimaryKey
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

    @HasOne(() => Cart, "ownerId")
    declare cart?: NonAttribute<Cart>;
    declare getCart: HasOneGetAssociationMixin<Cart>;

    @HasMany(()=> Order, "userId")
    declare orders?:NonAttribute<Order>
    declare getOrders: HasManyGetAssociationsMixin<Order>
    declare createOrder: HasManyCreateAssociationMixin<Order, "userId">

    @AfterCreate
    static async createUserCart(instance: User) {
        await Cart.create({ ownerId: instance.id });
    }
}
