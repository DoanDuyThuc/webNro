const express = require('express');
const { registerController, loginController, refreshToken } = require('../controllers/accountController');
const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/refresh-token', refreshToken);

module.exports = router;