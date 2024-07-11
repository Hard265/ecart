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

export const getProductsById = (req: AuthenticatedRequest, res: Response) => {
  const id = parseInt(req.params.id);
  const item = products.find((c) => c.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Products not found" });
  }
};

export const createProducts = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const newProducts = {
    id: products.length + 1,
    ...req.body,
  };
  const { id } = await Product.create({ name: "", price: 2000 });

  res.status(201).json({ id });
};

export const updateProducts = (req: AuthenticatedRequest, res: Response) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((c) => c.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } else {
    res.status(404).json({ message: "Clothes not found" });
  }
};

export const deleteProducts = (req: AuthenticatedRequest, res: Response) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((c) => c.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Products not found" });
  }
};
