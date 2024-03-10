import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware.js';
import { createTransaction, getTransactions, deleteTransaction } from '../controllers/transactionController.js';

const router = express.Router();

// Routes for transactions
router.post('/transactions', authenticateUser, createTransaction);
router.get('/transactions', authenticateUser, getTransactions);
router.delete('/transactions/:id', authenticateUser, deleteTransaction);

export default router;
