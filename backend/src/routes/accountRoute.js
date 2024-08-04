const express = require('express');
const {
    registerController,
    loginController,
    refreshToken,
    ChangePassWordController,
    GetUserIdController,
    logoutController,
    ActiveUserController,
    ExchangeCoinController,
    forumPostController,
    getforumPostController,
    getDetaisforumPostController
} = require('../controllers/accountController');
const { authAccountMiddleware } = require('../middlewares/auth');
const router = express.Router();
const upload = require('../config/configMulter');

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout', logoutController);
router.put('/changePassword/:id', authAccountMiddleware, ChangePassWordController);
router.post('/refresh-token', refreshToken);
router.get('/getUserId/:id', authAccountMiddleware, GetUserIdController);
router.post('/activeUser/:id', authAccountMiddleware, ActiveUserController);
router.put('/exchangeCoin/:id', authAccountMiddleware, ExchangeCoinController);
// diễn đàn
router.post('/forumPost', forumPostController);
router.get('/getforumPost', getforumPostController);
router.get('/getDetaisforumPost/:id', getDetaisforumPostController);

module.exports = router;