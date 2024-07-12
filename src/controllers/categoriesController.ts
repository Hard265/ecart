import { Response } from "express";
import { AuthenticatedRequest } from "../@types";
import { Category } from "../models/Category";

export const getAllCategories = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const categories = (await Category.findAll()).map((category) =>
    category.toJSON()
  );
  res.json(categories);
};

export const createCategory = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "Category name is required" });
  }
  const category = await Category.create({ name });
  res.json(category.toJSON());
};

export const deleteCategory = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { id } = req.params;
  await Category.destroy({ where: { id } });
  res.json({ message: "Category deleted" });
};
