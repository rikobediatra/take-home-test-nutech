const express = require('express');
const { servicePPOBController } = require('../controllers/index');
const authMiddleware = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.get('/services', authMiddleware, servicePPOBController.getServicePPOB);

module.exports = router;
