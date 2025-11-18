const express = require('express');
const { membershipController } = require('../controllers/index');
const authMiddleware = require('../middlewares/AuthMiddleware');
const upload = require('../middlewares/UploadMiddleware');

const router = express.Router();

router.post('/registration', membershipController.registerMembership);
router.post('/login', membershipController.login);
router.get('/profile', authMiddleware, membershipController.getProfile);
router.put('/profile/update', authMiddleware, membershipController.updateProfile);
router.put('/profile/image', authMiddleware, upload.single('profile_image'), membershipController.updateProfileImage);

module.exports = router;
