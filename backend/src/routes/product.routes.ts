import { Router } from 'express';
import { getProducts, addProduct, updateProduct, toggleLike, getLikedProducts } from '../controllers/product.controller';
import { productSchema } from '../validators/product.validator';
import validate from '../middleware/validate';
import auth from '../middleware/auth';

const router = Router();

router.get('/', auth, getProducts);
router.post('/', auth, validate(productSchema), addProduct);
router.put('/:id', auth, validate(productSchema), updateProduct);
router.patch('/:id/like', auth, toggleLike);
router.get('/liked', auth, getLikedProducts);

export default router;
