import AdminForumCommentPage from "../pages/AdminForumCommentPage/AdminForumCommentPage";
import AdminForumPage from "../pages/AdminForumPage/AdminForumPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import AdminUserPage from "../pages/AdminUserPage/AdminUserPage";


const adminRouter =
    [
        {
            path: '/admin/manager/Dashboard',
            page: AdminPage,
            isAdminPage: true,
        },
        {
            path: '/admin/manager/users',
            page: AdminUserPage,
            isAdminPage: true,
        },
        {
            path: '/admin/manager/forum',
            page: AdminForumPage,
            isAdminPage: true,
        },
        {
            path: '/admin/manager/forum-comments',
            page: AdminForumCommentPage,
            isAdminPage: true,
        }
    ]

export default adminRouter;