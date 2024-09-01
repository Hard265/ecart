import {
    BelongsToGetAssociationMixin,
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
    BelongsTo,
    Default,
    HasMany,
    NotNull,
    PrimaryKey,
} from "@sequelize/core/decorators-legacy";
import uniqid from "uniqid";
import { User } from "./User";
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
    declare ownerId: string;

    @BelongsTo(() => User, "ownerId")
    declare owner?: NonAttribute<User>;
    declare getOwner: BelongsToGetAssociationMixin<User>;

    @HasMany(() => CartItem, "cartId")
    declare items: NonAttribute<CartItem[]>;
    declare getItems: HasManyGetAssociationsMixin<CartItem>;
    declare createItem: HasManyCreateAssociationMixin<
        CartItem,
        "cartId"
    >;

    // @Attribute(DataTypes.REAL)
    // @NotNull
    // get totalPrice(): Promise<number> {
    //     return this.getItems().then((items)=> items.reduce((total, item)=>{
    //         return total +( ( item.getProduct()). || 0)
    //     }, 0))
    // }
}

export class CartItem extends Model<
    InferAttributes<CartItem>,
    InferCreationAttributes<CartItem>
> {
    @PrimaryKey
    @Attribute(DataTypes.STRING(18))
    @Default(() => uniqid())
    declare id: CreationOptional<string>;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare cartId: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare productId: string;

    @Attribute(DataTypes.INTEGER)
    @NotNull
    @Default(1)
    declare quantity: number;

    @BelongsTo(() => Cart, "cartId")
    declare cart?: NonAttribute<Cart>;

    @BelongsTo(() => Product, "productId")
    declare product?: NonAttribute<Product>;
    declare getProduct: BelongsToGetAssociationMixin<Product>;
}
