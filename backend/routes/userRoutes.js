const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logoutUser } = require('../controllers/userController');
const { auth, getUserProfile } = require('../middleware/authMiddleware');

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.route('/profile')
.get(auth, getUserProfile);

module.exports = router;