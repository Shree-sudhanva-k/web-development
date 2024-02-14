import express from 'express';
import { productDetailsDisplay, productDisplay, productInput, searchDisplay } from '../Controllers/productController.js';

const router = express.Router();

router.post('/productInput',productInput);
router.get('/productDisplay',productDisplay);
router.get('/productDetailsDisplay',productDetailsDisplay);
router.get('/searchDisplay', searchDisplay);

export default router;