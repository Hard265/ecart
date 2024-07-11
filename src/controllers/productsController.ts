import { Response } from "express";
import { AuthenticatedRequest } from "../intefaces";
import { Product } from "../models/Product";

// Temporary in-memory storage
let products: any[] = [];

export const getAllProducts = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const products = await Product.findAll();
  res.json({ user: products });
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

export const getProductsByUser = (
  req: AuthenticatedRequest,
  res: Response
) => {
  res.status(201).json({ message: "get user products" });

};

export const createProducts = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  // const newProducts = {
  //   id: products.length + 1,
  //   ...req.body,
  // };

  res.status(201).json({ message: "successfully created" });
};

export const updateProducts = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;

  const item = await Product.findOne({where: {id}})

  if (item) {
    // item.
    res.json(item.toJSON());
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

export const deleteProducts = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;

  const item = await Product.findOne({where: {id}})
  if (item) {
    await item.destroy();
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Products not found" });
  }
};
