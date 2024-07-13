import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product';

export const verifyProductOwnership = async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.userId !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to perform this action' });
    }
    next();
  } catch (error) {
    next(error);
  }
};
