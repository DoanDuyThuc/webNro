import DiscussForumPage from "../pages/DiscussForumPage/DiscussForumPage";
import ForumPage from "../pages/ForumPage/ForumPage";
import HomePage from "../pages/HomePage/HomePage";
import NotifyAdminPage from "../pages/NotifyAdminPage/NotifyAdminPage";


const guestsRouter =
    [
        {
            path: '/',
            page: HomePage,
            isHeaderFooter: true,
        },
        //diễn đàn
        {
            path: '/forum',
            page: ForumPage,
            isHeaderFooter: true,
        },
        {
            path: '/forum/notify/:id',
            page: NotifyAdminPage,
            isHeaderFooter: true,
        },
        {
            path: '/forum/discuss/:id',
            page: DiscussForumPage,
            isHeaderFooter: true,
        }
    ]

export default guestsRouter;