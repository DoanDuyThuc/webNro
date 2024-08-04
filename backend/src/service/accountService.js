const { where } = require('sequelize');
const db = require('../models/index');
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService');

const registerService = async (username, password, enterPassword) => {
    try {
        //check đăng ký
        const user = await db.account.findOne({
            where: {
                username
            }
        });
        if (user) {
            return {
                message: 'Tài Khoản Đã Tồn Tại !'
            }
        }
        //check password
        if (password !== enterPassword) {
            return {
                message: 'Mật Khẩu Không Trùng Khớp !'
            }
        }

        // create account
        const newUser = await db.account.create({
            username,
            password: password,

        });

        return {
            newUser,
            message: 'Đăng Ký Thành Công !'
        }

    } catch (error) {
        console.log(error);
        return {
            error,
            message: 'Đăng Ký Thất Bại !'
        }
    }
}

const loginService = async (username, password) => {
    try {
        const user = await db.account.findOne({
            attributes: ['id', 'username', 'server_login', "is_admin", "active", "thoi_vang", "tongnap", "coin", "vnd"],
            where: {
                username,
                password
            },
        });

        if (!user) {
            return {
                message: 'Tài Khoản hoặc Mật Khẩu Không Đúng !'
            }
        }


        const player = await db.player.findOne({
            attributes: ['id', 'account_id', 'name', 'gender'],
            where: {
                account_id: user.id
            }
        });


        if (!player) {
            return {
                message: 'vui lòng tạo nhân vật trước !'
            }
        }

        const accset_Token = await genneralAccessToken({
            id: user.id,
            is_admin: user.is_admin,
        });

        const refresh_token = await genneralRefreshToken({
            id: user.id,
            is_admin: user.is_admin,
        });

        return {
            ...user.dataValues,
            message: 'Đăng Nhập Thành Công !',
            accset_Token,
            refresh_token
        }

    } catch (error) {
        console.log(error);
        return {
            error,
            message: 'Đăng Nhập Thất Bại !'
        }
    }
}

const ChangePassWordService = async (oldPass, newPass, EnterNewPass, idUser) => {

    try {

        const user = await db.account.findOne({
            attributes: ["password"],
            where: {
                id: idUser
            }
        })

        if (user.password !== oldPass) {
            return {
                message: 'Mật Khẩu Cũ Không Đúng !'
            }
        }

        if (newPass !== EnterNewPass) {
            return {
                message: 'Mật Khẩu Mới Không Trùng Khớp !'
            }
        }

        await db.account.update({
            password: newPass
        }, {
            where: {
                id: idUser
            }
        })

        return {
            message: 'Đổi Mật Khẩu Thành Công !'
        }
    } catch (error) {
        console.log(error);
        return {
            error,
            message: 'Đổi Mật Khẩu Thất Bại !'
        }
    }
}

const GetUserIdService = async (idUser) => {
    try {
        const player = await db.player.findOne({
            attributes: ['id', 'name', 'gender'],
            where: {
                account_id: idUser
            }
        });

        const user = await db.account.findOne({
            attributes: ['id', 'username', 'server_login', "is_admin", "active", "thoi_vang", "tongnap", "coin", "vnd"],
            where: {
                id: idUser
            },
        });

        return {
            user: user.dataValues,
            player: player.dataValues,
            message: 'Lấy Thông Tin Thành Công !'
        }

    } catch (error) {
        console.log(error);
        return {
            error,
            message: 'Lấy Thông Tin Thất Bại !'
        }
    }
}

const ActiveUserService = async (idUser) => {
    try {
        const user = await db.account.findOne({
            attributes: ['id', "is_admin", "active", "tongnap", "coin", "vnd"],
            where: {
                id: idUser
            }
        });

        if (user.coin < 20000) {
            return {
                message: 'Không Đủ Coin Kích Hoạt !'
            }
        }


        await db.account.update({
            active: 1,
            coin: user.coin - 20000
        }, {
            where: {
                id: idUser
            }
        });

        return {
            message: 'Kích Hoạt Thành Công !'
        }
    } catch (error) {
        console.log(error);
        return {
            error,
            message: 'Kích Hoạt Thất Bại !'
        }
    }
}

const ExchangeCoinService = async (idUser, newdata) => {
    try {
        const user = await db.account.findOne({
            attributes: ['id', "is_admin", "active", "tongnap", "coin", "vnd"],
            where: {
                id: idUser
            }
        });

        if (user.coin < newdata.coin) {
            return {
                message: 'Không Đủ Coin Để Đổi !'
            }
        }

        await db.account.update({
            coin: user.coin - newdata.coin,
            vnd: user.vnd + newdata.vnd
        }, {
            where: {
                id: idUser
            }
        });

        return {
            message: 'Đổi Coin Thành Công !'
        }

    } catch (error) {
        console.log(error);
        return {
            error,
            message: 'Đổi Thất Bại có lỗi bất ngờ !'
        }
    }
}

// diễn đàn

const forumPostService = async (newdata) => {
    try {
        const user = await db.account.findOne({
            attributes: ['id', 'username', 'is_admin', 'active'],
            where: {
                id: newdata.accountId
            }
        });

        const post = await db.Forum.create({
            name: newdata.name,
            avartar: newdata.avatar,
            title: newdata.title,
            content: newdata.content,
            accountId: newdata.accountId,
        })

        if (user.active === 0) {
            return {
                message: 'Vui lòng kích hoạt tài khoản để đăng bài !'
            }
        } else if (user.active === 1 || user.is_admin === 1) {
            return {
                post,
                message: 'Đăng Bài Thành Công !'
            }
        }

    } catch (error) {
        console.log(error);
        return {
            error,
            message: 'Đăng Bài Thất Bại !'
        }
    }
}

const getforumPostService = async () => {
    try {
        const post = await db.Forum.findAll({
            include: {
                model: db.account,
                attributes: ['is_admin']
            },
            attributes: ['id', 'avartar', 'title', 'name'],
            order: [
                ['id', 'DESC']
            ]
        })

        return {
            post,
            message: 'Lấy Bài Viết Thành Công !'
        }

    } catch (error) {
        console.log(error);
        return {
            error,
            message: 'Lấy Bài Viết Thất Bại !'
        }
    }
}

const getDetaisforumPostService = async (id) => {
    try {
        const post = await db.Forum.findOne({
            where: {
                id
            }
        })

        return {
            post,
            message: 'Lấy Bài Viết Thành Công !'
        }

    } catch (error) {
        console.log(error);
        return {
            error,
            message: 'Lấy Bài Viết Thất Bại !'
        }
    }
}

module.exports = {
    registerService,
    loginService,
    ChangePassWordService,
    GetUserIdService,
    ActiveUserService,
    ExchangeCoinService,
    forumPostService,
    getforumPostService,
    getDetaisforumPostService
};