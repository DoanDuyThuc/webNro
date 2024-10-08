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

export const GetPostForumAdminService = async () => {
    try {
        const res = await axios.get(`${hostLocal}/account/getforumPostAdmin`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const GetPostForumDicussService = async (page, limit) => {
    try {
        const res = await axios.get(`${hostLocal}/account/getforumPostDiscuss?page=${page}&limit=${limit}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const GetDetaisPostForumService = async (id) => {
    try {
        const res = await axios.get(`${hostLocal}/account/getDetaisforumPost/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const EditForumService = async (id, newData) => {
    try {
        const res = await axios.put(`${hostLocal}/account/EditforumPost/${id}`,
            newData
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const GetForumCommentService = async (id) => {
    try {
        const res = await axios.get(`${hostLocal}/account/GetforumComment/?forumId=${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const ReplyForumCommentService = async (token, id, newdata) => {
    try {
        const res = await axiosInstance.post(`${hostLocal}/account/forumPostComment/${id}`, newdata, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const DeleteforumPostService = async (id) => {
    try {
        const res = await axios.delete(`${hostLocal}/account/DeleteforumPost/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const GetAllUserService = async (token, id, searchUser = '', page, limit) => {
    try {
        const res = await axiosInstance.get(`${hostLocal}/account/getAllUser/${id}/?searchUser=${searchUser}&page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}


export const DeleteUserService = async (token, id, userId) => {
    try {
        const res = await axiosInstance.delete(`${hostLocal}/account/DeleteUser/${id}/?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const DeleteAllUserService = async (token, id, data) => {
    try {
        const res = await axiosInstance.delete(`${hostLocal}/account/DeleteAllUser/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: {
                ids: data
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const DeleteAllForumPostService = async (token, data) => {
    try {
        const res = await axiosInstance.delete(`${hostLocal}/account/DeleteAllforumPost`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: {
                ids: data
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const UpdateUserService = async (token, id, newdata, userId) => {

    try {
        const res = await axiosInstance.put(`${hostLocal}/account/UpdateUser/${id}/?userId=${userId}`, newdata, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}


export const GetAllPostService = async (token, searchPost = '', page, limit) => {

    try {
        const res = await axiosInstance.get(`${hostLocal}/account/getAllPost/?searchPost=${searchPost}&page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const GetAllCommentService = async (searchComment = '', page, limit) => {

    try {
        const res = await axios.get(`${hostLocal}/account/GetAllforumComment/?searchComment=${searchComment}&page=${page}&limit=${limit}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const DeleteCommentService = async (token, data) => {


    try {
        const res = await axiosInstance.delete(`${hostLocal}/account/deleteforumComment`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: {
                ids: data
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}