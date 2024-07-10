import { Request, Response } from 'express';

// Temporary in-memory storage
let products: any[] = [];

export const getAlProducts = (req: Request, res: Response) => {
  res.json(products);
};

export const getProductsById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const item = products.find(c => c.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Products not found' });
  }
};

export const createProducts = (req: Request, res: Response) => {
  const newProducts = {
    id: products.length + 1,
    ...req.body
  };
  products.push(newProducts);
  res.status(201).json(newProducts);
};

export const updateProducts = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(c => c.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } else {
    res.status(404).json({ message: 'Clothes not found' });
  }
};

export const deleteProducts = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(c => c.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Products not found' });
  }
};
