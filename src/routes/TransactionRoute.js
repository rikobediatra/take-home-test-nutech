const express = require('express');
const { transactionsController } = require('../controllers/index');
const authMiddleware = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.get('/balance', authMiddleware, transactionsController.getUserBalanceByMemberId);
router.post('/topup', authMiddleware, transactionsController.topUpBalance);
router.post('/transaction', authMiddleware, transactionsController.upsertTransaction);
router.get('/transaction/history', authMiddleware, transactionsController.getTransactionHistory);

module.exports = router;