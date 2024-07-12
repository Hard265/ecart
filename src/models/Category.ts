import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "@sequelize/core";
import {
  Attribute,
  Default,
  NotNull,
  PrimaryKey,
} from "@sequelize/core/decorators-legacy";
import uniqid from "uniqid";

export class Category extends Model<
  InferAttributes<Category>,
  InferCreationAttributes<Category>
> {
  @PrimaryKey
  @Attribute(DataTypes.STRING(18))
  @Default(() => uniqid())
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.STRING(255))
  @NotNull
  declare name: string;
}
