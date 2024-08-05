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
    getforumPostAdminController,
    getforumPostDiscussController,
    getDetaisforumPostController,
    EditforumPostController,
    forumPostCommentController,
    getforumCommentController,
    DeleteforumPostController
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
router.get('/getforumPostAdmin', getforumPostAdminController);
router.get('/getforumPostDiscuss', getforumPostDiscussController);
router.get('/getDetaisforumPost/:id', getDetaisforumPostController);
router.put('/EditforumPost/:id', EditforumPostController);
router.delete('/DeleteforumPost/:id', DeleteforumPostController);
// comment diễn đàn
router.post('/forumPostComment/:id', authAccountMiddleware, forumPostCommentController);
router.get('/GetforumComment', getforumCommentController);

module.exports = router;