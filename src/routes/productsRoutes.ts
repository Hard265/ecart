import express, { Router } from 'express';
import * as productsController from '../controllers/productsController';

const router: Router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductsById);
router.post('/', productsController.createProducts);
router.put('/:id', productsController.updateProducts);
router.delete('/:id', productsController.deleteProducts);

export default router;
