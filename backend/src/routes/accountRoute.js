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
    DeleteforumPostController,
    GetAllUserController,
    DeleteUserController,
    DeleteAllUserController,
    UpdateUserController,
    GetAllPostController,
    DeleteAllforumPostController,
    getAllforumCommentController,
    DeleteforumCommentController
} = require('../controllers/accountController');
const { authAccountMiddleware, authMiddleware } = require('../middlewares/auth');
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
router.get('/getAllUser/:id', GetAllUserController);
router.delete('/DeleteUser/:id', authAccountMiddleware, DeleteUserController);
router.delete('/DeleteAllUser/:id', authAccountMiddleware, DeleteAllUserController);
router.put('/UpdateUser/:id', authAccountMiddleware, UpdateUserController);

// diễn đàn
router.post('/forumPost', forumPostController);
router.get('/getforumPostAdmin', getforumPostAdminController);
router.get('/getAllPost', authMiddleware, GetAllPostController);
router.get('/getforumPostDiscuss', getforumPostDiscussController);
router.get('/getDetaisforumPost/:id', getDetaisforumPostController);
router.put('/EditforumPost/:id', EditforumPostController);
router.delete('/DeleteforumPost/:id', DeleteforumPostController);
router.delete('/DeleteAllforumPost', authMiddleware, DeleteAllforumPostController);
// comment diễn đàn
router.post('/forumPostComment/:id', authAccountMiddleware, forumPostCommentController);
router.get('/GetforumComment', getforumCommentController);
router.get('/GetAllforumComment', getAllforumCommentController);
router.delete('/deleteforumComment', authMiddleware, DeleteforumCommentController);

module.exports = router;