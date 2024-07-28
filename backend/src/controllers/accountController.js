const { registerService, loginService } = require('../service/accountService');
const { refreshTokenJwtService } = require('../service/JwtService');

const registerController = async (req, res) => {
    try {
        const { username, password, enterPassword, server_login } = req.body;
        const user = await registerService(username, password, enterPassword, server_login);

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
            sameSite: 'none',
            secure: false
        });

        res.status(200).json(resj);

    } catch (error) {
        console.log(error);
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
        const resj = await refreshTokenJwtService(token)
        return res.status(200).json(resj)
    } catch (error) {
        return res.status(404).json({
            massage: error
        })
    }
}

module.exports = { registerController, loginController, refreshToken };