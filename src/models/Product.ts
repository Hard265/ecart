import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
} from "@sequelize/core";
import {
  Attribute,
  PrimaryKey,
  NotNull,
  Default,
  HasMany,
  BelongsToMany,
} from "@sequelize/core/decorators-legacy";
import uniqid from "uniqid";
import { User } from "./User";
import { Review } from "./Review";
import { Category } from "./Category";

export class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  @PrimaryKey
  @Attribute(DataTypes.STRING(18))
  @Default(() => uniqid())
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.TEXT)
  @NotNull
  declare description: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare image: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare price: number;

  /** Defined by {@link User.reviews} */
  declare user?: NonAttribute<User>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare userId: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  @Default(1)
  declare stock: number;

  @HasMany(() => Review, {
    foreignKey: "productId",
    inverse: {
      as: "product",
    },
  })
  declare reviews?: NonAttribute<Review[]>;
  declare getReviews: HasManyGetAssociationsMixin<Review>;
  declare createReview: HasManyCreateAssociationMixin<Review, "productId">;

  @BelongsToMany(() => Category, {
    through: "ProductCategory",
  })
  declare categories?: NonAttribute<Category[]>;
  declare getCategories: BelongsToManyGetAssociationsMixin<Category>;
  declare addCategory: BelongsToManyAddAssociationMixin<
    Category,
    Category["id"]
  >;
  declare addCategorys: BelongsToManyAddAssociationsMixin<
    Category,
    Category["id"]
  >;
}