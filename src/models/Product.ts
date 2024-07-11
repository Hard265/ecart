import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from '@sequelize/core';
import { Attribute, PrimaryKey, NotNull, Default } from '@sequelize/core/decorators-legacy';
import uniqid from "uniqid"

export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
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

    @Attribute(DataTypes.STRING)
    @NotNull
    declare userId: string;
}