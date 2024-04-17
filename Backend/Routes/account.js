import express from 'express';
import { deleteAccount, fetchAccountDetails, fetchOrderDetails } from '../Controllers/accountController.js';

const router = express.Router();

router.get('/account',fetchAccountDetails);
router.get('/orders',fetchOrderDetails);
router.delete('/account/:email',deleteAccount);

export default router;