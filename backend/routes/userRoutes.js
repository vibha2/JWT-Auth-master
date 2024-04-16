const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logoutUser, sendOTP } = require('../controllers/userController');
const { auth, getUserProfile, isAdmin, isMember } = require('../middleware/authMiddleware');

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/sendotp", sendOTP);

router.route('/profile')
.get(auth, getUserProfile);

router.route('/admin')
.get(auth, isAdmin);

router.route('/user')
.get(auth, isMember);

module.exports = router;