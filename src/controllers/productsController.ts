import { Request, Response } from 'express';

// Temporary in-memory storage
let clothes: any[] = [];

export const getAllClothes = (req: Request, res: Response) => {
  res.json(clothes);
};

export const getClothesById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const item = clothes.find(c => c.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Clothes not found' });
  }
};

export const createProducts = (req: Request, res: Response) => {
  const newClothes = {
    id: clothes.length + 1,
    ...req.body
  };
  clothes.push(newClothes);
  res.status(201).json(newClothes);
};

export const updateProducts = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = clothes.findIndex(c => c.id === id);
  if (index !== -1) {
    clothes[index] = { ...clothes[index], ...req.body };
    res.json(clothes[index]);
  } else {
    res.status(404).json({ message: 'Clothes not found' });
  }
};

export const deleteProducts = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = clothes.findIndex(c => c.id === id);
  if (index !== -1) {
    clothes.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Clothes not found' });
  }
};
