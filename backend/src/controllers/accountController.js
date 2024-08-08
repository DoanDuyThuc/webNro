const {
    registerService,
    loginService,
    ChangePassWordService,
    GetUserIdService,
    ActiveUserService,
    ExchangeCoinService,
    forumPostService,
    getforumPostAdminService,
    getforumPostDiscussService,
    getDetaisforumPostService,
    EditforumPostService,
    forumPostCommentService,
    getforumCommentService,
    DeleteforumPostService,
    GetAllUserService,
    DeleteUserService,
    DeleteAllUserService,
    UpdateUserService,
    GetAllPostService,
    DeleteAllforumPostService,
    getAllforumCommentService,
    DeleteforumCommentService
} = require('../service/accountService');
const { refreshTokenJwtService } = require('../service/JwtService');
const path = require('path');

const registerController = async (req, res) => {
    try {
        const { username, password, enterPassword } = req.body;
        const user = await registerService(username, password, enterPassword);

        res.status(200).json(user);

    } catch (error) {
        console.log(error);
    }
}

const loginController = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await loginService(username, password);

        const { refresh_token, ...resj } = user;

        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false, // Đặt là true nếu bạn sử dụng HTTPS
            sameSite: 'Strict',
        });

        res.status(200).json(resj);

    } catch (error) {
        console.log(error);
    }
}

const logoutController = async (req, res) => {
    try {
        res.clearCookie('refresh_token');
        res.status(200).json({
            status: "ok",
            message: "Đã đăng xuất"
        })
    } catch (error) {
        console.log(error);
    }
}

const ChangePassWordController = async (req, res) => {
    try {
        const { oldPass, newPass, EnterNewPass } = req.body;

        const idUser = req.user.id;

        const user = await ChangePassWordService(oldPass, newPass, EnterNewPass, idUser);
        res.status(200).json(user);

    } catch (error) {
        res.status(401).json(error);
    }
}

// refresh token
const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token;
        if (!token) {
            res.status(401).json({
                status: "err",
                massage: "không tìm thấy token !"
            })
        }
        return await refreshTokenJwtService(token, res)
    } catch (error) {
        return res.status(404).json({
            massage: error
        })
    }
}

//GET USER ID
const GetUserIdController = async (req, res) => {
    try {
        const idUser = req.params.id;
        const resj = await GetUserIdService(idUser);
        res.status(200).json(resj);
    } catch (error) {
        console.log(error);
    }
}

const ActiveUserController = async (req, res) => {
    try {
        const idUser = req.params.id;
        const resj = await ActiveUserService(idUser);
        res.status(200).json(resj);
    } catch (error) {
        console.log(error);
    }
}

const ExchangeCoinController = async (req, res) => {
    try {
        const newdata = req.body;
        const idUser = req.params.id;
        const resj = await ExchangeCoinService(idUser, newdata);
        res.status(200).json(resj);
    } catch (error) {
        console.log(error);
    }
}

// diễn đàn
const forumPostController = async (req, res) => {

    console.log(req.body);

    try {
        const newdata = req.body;

        const resj = await forumPostService(newdata);
        res.status(200).json(resj);
    } catch (error) {
        console.log(error);
    }
}

const getforumPostAdminController = async (req, res) => {
    try {
        const resj = await getforumPostAdminService();
        res.status(200).json(resj);
    } catch (error) {
        console.log(error);
    }
}

const getforumPostDiscussController = async (req, res) => {
    try {
        const { page, limit } = req.query;

        const resj = await getforumPostDiscussService(parseInt(page), parseInt(limit));
        res.status(200).json(resj);
    } catch (error) {
        console.log(error);
    }
}

const getDetaisforumPostController = async (req, res) => {
    try {
        const id = req.params.id;
        const resj = await getDetaisforumPostService(id);
        res.status(200).json(resj);
    } catch (error) {
        console.log(error);
    }
}

const EditforumPostController = async (req, res) => {
    try {
        const id = req.params.id;
        const newdata = req.body;
        const resj = await EditforumPostService(id, newdata);
        res.status(200).json(resj);
    } catch (error) {
        console.log(error);
    }
}

const forumPostCommentController = async (req, res) => {
    try {
        const userId = req.params.id;
        const newdata = req.body;
        const resj = await forumPostCommentService(newdata, userId);
        res.status(200).json(resj);
    } catch (error) {
        console.log(error);
    }
}

const getforumCommentController = async (req, res) => {
    try {
        const forumId = req.query.forumId;
        const resj = await getforumCommentService(forumId);
        res.status(200).json(resj);
    } catch (error) {
        console.log(error);
    }
}

const DeleteforumPostController = async (req, res) => {
    try {
        const id = req.params.id;
        const resj = await DeleteforumPostService(id);
        res.status(200).json(resj);
    } catch (error) {
        console.log(error);
    }
}

const GetAllUserController = async (req, res) => {
    try {
        const { searchUser, page, limit } = req.query;


        console.log(searchUser, page, limit);

        const resj = await GetAllUserService(searchUser, parseInt(page), parseInt(limit));
        res.status(200).json(resj);
    } catch (error) {
        console.log(error);
    }
}

const DeleteUserController = async (req, res) => {
    try {
        const id = req.query.userId;
        const resj = await DeleteUserService(id);
        res.status(200).json(resj);
    } catch (error) {
        console.log(error);
    }
}

const DeleteAllUserController = async (req, res) => {
    try {
        const { ids } = req.body;

        const resj = await DeleteAllUserService(ids);
        res.status(200).json(resj);
    } catch (error) {
        console.log(error);
    }
}

const UpdateUserController = async (req, res) => {
    try {
        const userId = req.query.userId;
        const newdata = req.body;
        const resj = await UpdateUserService(userId, newdata);
        res.status(200).json(resj);
    } catch (error) {
        console.log(error);
    }
}

const GetAllPostController = async (req, res) => {
    try {
        const { searchPost, page, limit } = req.query;
        const resj = await GetAllPostService(searchPost, parseInt(page), parseInt(limit));
        res.status(200).json(resj);
    } catch (error) {
        console.log(error);
    }
}

const DeleteAllforumPostController = async (req, res) => {
    try {
        const { ids } = req.body;
        const resj = await DeleteAllforumPostService(ids);
        res.status(200).json(resj);
    } catch (error) {
        console.log(error);
    }
}

const getAllforumCommentController = async (req, res) => {
    try {
        const { searchComment, page, limit } = req.query;
        const resj = await getAllforumCommentService(searchComment, parseInt(page), parseInt(limit));
        res.status(200).json(resj);
    } catch (error) {
        console.log(error);
    }
}

const DeleteforumCommentController = async (req, res) => {
    try {
        const { ids } = req.body;
        const resj = await DeleteforumCommentService(ids);
        res.status(200).json(resj);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
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
};