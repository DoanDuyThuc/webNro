import axios from 'axios';

export const axiosInstance = axios.create();

const hostLocal = process.env.REACT_APP_API_HOSTNAMELOCAL;

export const LoginAccountService = async (username, password) => {
    try {
        const res = await axios.post(`${hostLocal}/account/login`, {
            username,
            password
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const LogoutService = async () => {
    try {
        const res = await axios.post(`${hostLocal}/account/logout`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}


export const SignInService = async (data) => {
    try {
        const res = await axios.post(`${hostLocal}/account/register`, data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const GetUserIdService = async (token, id) => {
    try {
        const res = await axiosInstance.get(`${hostLocal}/account/getUserId/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const ChangePassService = async (token, id, data) => {
    try {
        const res = await axiosInstance.put(`${hostLocal}/account/changePassword/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const RefreshTokenService = async () => {
    try {
        const res = await axios.post(`${hostLocal}/account/refresh-token`, {}, {
            //có cookies thì tự lấy
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}


export const ActiveUserService = async (token, id) => {
    try {
        const res = await axiosInstance.post(`${hostLocal}/account/activeUser/${id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const ExchangeCoinService = async (token, id, newData) => {
    try {
        const res = await axiosInstance.put(`${hostLocal}/account/exchangeCoin/${id}`,
            newData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const PostForumService = async (newData) => {
    try {
        const res = await axiosInstance.post(`${hostLocal}/account/forumPost`,
            newData,
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const GetPostForumService = async (newData) => {
    try {
        const res = await axios.get(`${hostLocal}/account/getforumPost`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}