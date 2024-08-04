import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import adminRouter from './adminRouter';
import guestsRouter from './guestsRouter';
import userRouter from './userRouter';


const routes = (user) => {

    const userRender = user.isLoggedIn ? userRouter : [{
        path: '*',
        page: NotFoundPage,
        isAdminRoute: false,
    }];

    const adminRender = user?.user.is_admin ? adminRouter : [{
        path: '*',
        page: NotFoundPage,
        isAdminRoute: false,
    }];

    return [
        ...guestsRouter,
        ...userRender,
        ...adminRender,
    ]
}

export default routes;