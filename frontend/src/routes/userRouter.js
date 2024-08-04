import ChangePass from "../pages/ChangePassPage/ChangePass";
import ExchangeCoinPage from "../pages/ExchangeCoinPage/ExchangeCoinPage";
import PostForumPage from "../pages/PostForumPage/PostForumPage";


const userRouter =
    [
        {
            path: '/user/change-password',
            page: ChangePass,
            isHeaderFooter: true,
        },
        {
            path: 'user/exchangeCoin',
            page: ExchangeCoinPage,
            isHeaderFooter: true,
        },
        {
            path: '/user/postForum',
            page: PostForumPage,
            isHeaderFooter: true,
        }
    ]

export default userRouter;