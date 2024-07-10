import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "@sequelize/core";
import {
  Attribute,
  PrimaryKey,
  NotNull,
  Default,
  Unique,
} from "@sequelize/core/decorators-legacy";
import uniqid from "uniqid";

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

  comparePassword(password: string): Boolean {
    return this.password === password;
  }
}
