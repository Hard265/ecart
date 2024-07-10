import express, { Router } from 'express';
import * as clothesController from '../controllers/clothesController';

const router: Router = express.Router();

router.get('/', clothesController.getAllClothes);
router.get('/:id', clothesController.getClothesById);
router.post('/', clothesController.createClothes);
router.put('/:id', clothesController.updateClothes);
router.delete('/:id', clothesController.deleteClothes);

export default router;
