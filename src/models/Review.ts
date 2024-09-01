import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    NonAttribute,
    BelongsToGetAssociationMixin,
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

    @Attribute(DataTypes.STRING(18))
    @NotNull
    declare userId: string;

    @Attribute(DataTypes.STRING(18))
    @NotNull
    declare productId: string;

    @BelongsTo(() => Product, "productId")
    declare product?: NonAttribute<Product>;
    declare getProduct: BelongsToGetAssociationMixin<Product>;

    @BelongsTo(() => User, "userId")
    declare user?: NonAttribute<User>;
}
