const express = require('express');
const { bannersController } = require('../controllers/index');

const router = express.Router();

router.get('/banner', bannersController.getBanners);

module.exports = router;
