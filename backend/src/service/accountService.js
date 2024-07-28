const db = require('../models/index');
const bcrypt = require('bcrypt');
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService');

const registerService = async (username, password, enterPassword, server_login) => {
    const saltRounds = 10;
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

        //hash password
        const salt = bcrypt.genSaltSync(saltRounds);
        const PasswordHashed = bcrypt.hashSync(password, salt);

        // create account
        const newUser = await db.account.create({
            username,
            password: PasswordHashed,
            server_login
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
            attributes: ['id', 'username', "password", 'server_login', "is_admin", "active", "thoi_vang", "tongnap", "coin", "vnd"],
            where: {
                username
            },
        });
        if (!user) {
            return {
                message: 'Tài Khoản Không Tồn Tại !'
            }
        }

        // giải mã password
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
            return {
                message: 'Mật Khẩu Không Đúng !'
            }
        }

        const accset_Token = await genneralAccessToken({
            id: user.id,
            is_admin: user.is_admin
        });

        const refresh_token = await genneralRefreshToken({
            id: user.id,
            is_admin: user.is_admin
        });

        return {
            user,
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
module.exports = { registerService, loginService };