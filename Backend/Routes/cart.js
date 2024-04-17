import express from 'express';
import { addItem, cartItemsDisplay, decrementQuantity, deleteCart, deleteItem, incrementQuantity, orderItems, placeOrder } from '../Controllers/cartController.js';


const router= express.Router();

router.post('/addItem',addItem);
router.get('/cartItemDisplay',cartItemsDisplay);
router.post('/placeOrder',placeOrder);
router.post('/orderItems',orderItems);
router.post('/deleteCart',deleteCart);
router.post('/incrementQuantity',incrementQuantity);
router.post('/decrementQuantity',decrementQuantity);
router.post('/deleteItem',deleteItem);

export default router;
