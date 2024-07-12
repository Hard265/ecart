import { Response } from "express";
import { Product } from "../models/Product";
import { AuthenticatedRequest } from "../@types";

export const getAllProducts = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const products = (await Product.findAll()).map((item) => item.toJSON());
  res.json(products);
};

export const getProductsById = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { id } = req.params;

  const item = await Product.findOne({ where: { id: id } });
  if (item) {
    res.json(item.toJSON());
  } else {
    res.status(404).json({ message: "Products not found" });
  }
};

export const getProductsByUser = (req: AuthenticatedRequest, res: Response) => {
  res.status(201).json({ message: "get user products" });
};

export const createProducts = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { name, description, price, image } = req.body;
  if (!name || !description || !price || !image) {
    res.status(400).json({ message: "Please fill in all fields" });
  } else {
    const item = await Product.create({
      name,
      description,
      price,
      image,
      stock: 2,
      userId: req.user.id,
    });
    res
      .status(201)
      .json({ message: "successfully created", item: item.toJSON() });
  }
};

export const updateProducts = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { id } = req.params;

  const item = await Product.findOne({ where: { id } });

  if (item) {
    // item.
    res.json(item.toJSON());
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

export const deleteProducts = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { id } = req.params;

  const item = await Product.findOne({ where: { id } });
  if (item) {
    await item.destroy();
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Products not found" });
  }
};
