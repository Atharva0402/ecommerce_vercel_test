import express from "express";
const router = express.Router();
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts,
} from "../controller/productController.js";
import checkObjectId from '../middleware/checkObjectId.js';

import { protect, admin } from '../middleware/authMiddleware.js'


router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);
router.get('/top', getTopProducts);
router
    .route('/:id')
    .get(checkObjectId, getProductById)
    .put(protect, admin, checkObjectId, updateProduct)
    .delete(protect, admin, checkObjectId, deleteProduct);

export default router;
























// router.get('/', asyncHandler(async (req, res) => {
//     const products = await Product.find({})
//     res.json(products);
// }));


// router.get('/:id', asyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id);

//     if (product) {
//         return res.json(product);
//     }
//     else {
//         res.status(404);
//         throw new Error('Resource not Found ')
//     }

//     // res.status(404).json({ message: 'Product not found' })

// }))



