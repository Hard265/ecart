import { Response } from "express";
import { Product } from "../models/Product";
import { AuthenticatedRequest } from "../@types";
import { upload } from "../server";
import logger from "../services/logger";
import { User } from "../models/User";

export const getAllProducts = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const products = (
    await Product.findAll({
      attributes: ["description", "name", "price", "stock", "image", "id"],
      include: {
        model: User,
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      },
    })
  ).map((item) => item.toJSON());
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
  try {
    upload.single("image")(req, res, async (err) => {
      if (err) {
        res.status(400).json({ message: "Error uploading image" });
      } else if (err) {
        res.status(500).json({ message: "Error uploading image" });
      }
    });

    const { name, description, price, stock } = req.body;
    if (!name || !description || !price) {
      res.status(400).json({ message: "Please fill in all fields" });
    } else {
      const image = req.file ? `/uploads/${req.file.filename}` : undefined;

      const item = await Product.create({
        name,
        description,
        price,
        stock,
        image,
        userId: req.user.id,
      });

      res
        .status(201)
        .json({ message: "successfully created", item: item.toJSON() });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Error creating product", error });
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
