import express from 'express'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';

const router = express.Router();


router.get('/', getProducts)

router.post('/', createProduct)
// can use put or patch, usually patch only update few of the parameters, put is update all
router.put('/:id', updateProduct)
// :id means user can pass any value dynamically
// if u use :id, then bottom u also put const { id }
router.delete("/:id", deleteProduct)

export default router;