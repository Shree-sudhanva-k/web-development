import express from 'express';
import { deleteAccount, fetchAccountDetails } from '../Controllers/accountController.js';

const router = express.Router();

router.get('/account/:email',fetchAccountDetails);
router.delete('/account/:email',deleteAccount);

export default router;