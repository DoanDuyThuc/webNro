const jwt = require('jsonwebtoken');

//tạo ra accsettoken
const genneralAccessToken = async (payload) => {
    const access_token = await jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' })

    return access_token
}

//tạo LÀM MỚI TOKEN
const genneralRefreshToken = (payload) => {
    const refresh_token = jwt.sign({
        payload
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '365d' })

    return refresh_token
}

const refreshTokenJwtService = async (token) => {
    try {
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {

            if (err) {
                return {
                    status: "OK",
                    massage: "có lỗi khi xác thực !"
                }
            }

            const { payload } = user;

            const access_token = await genneralAccessToken({
                id: payload?.id,
                is_admin: payload?.is_admin
            });

            return {
                status: "OK",
                massage: "xác thực SUSSCES",
                access_token
            }
        })

    } catch (error) {
        return {
            status: "err",
            massage: 'có lỗi khi xác thực !',
            error
        }
    }
}

module.exports = { refreshTokenJwtService, genneralAccessToken, genneralRefreshToken };