
import './HeaderComponent.scss'
import Image from 'react-bootstrap/Image';
import banner from '../../public/images/banner.png';
import Button from 'react-bootstrap/Button';
import { FaCloudArrowDown } from "react-icons/fa6";
import { FaRegCreditCard } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import MenuNotUser from '../MenuNotUser/MenuNotUser';
import { useSelector } from 'react-redux';
import MenuHaveUser from '../MenuHaveUser/MenuHaveUser';
import { useState } from 'react';

function HeaderComponent() {

    const user = useSelector(state => state.user);

    const location = useLocation();
    const [login, setLogin] = useState(false);
    const navigate = useNavigate();

    const userLogin = useSelector(state => state.user);


    const handleOpenExchange = () => {
        if (user?.isLoggedIn === false) {
            setLogin(true);

        } else {
            setLogin(false);
            navigate(`/user/exchangeCoin`);
        }
    }

    return (
        <div className='header_web_container' >
            <Image className='header_image' fluid src={banner} />
            <div className='container_menu_main'>
                <div className='container_menu_main_item'>
                    <FaCloudArrowDown />
                    <Button className='button_menu_main' variant="outline-primary">Tải Game Ngay</Button>
                </div>
                <div className='container_menu_main_item'>
                    <FaRegCreditCard />
                    <Button className='button_menu_main' variant="outline-primary">Nạp Thẻ Ngay</Button>
                </div>
            </div>

            <div className='menu_choose_nav'>
                <ul className='menu_choose_nav-ul'>
                    <li className={location.pathname === '/' ? 'menu_choose_nav-ul_item active' : 'menu_choose_nav-ul_item'}>
                        <NavLink to="/">Trang Chủ</NavLink>
                    </li>
                    <li className={location.pathname === '/fanpage' ? 'menu_choose_nav-ul_item active' : 'menu_choose_nav-ul_item'}>
                        <NavLink to="/fanpage">Fanpage</NavLink>
                    </li>
                    <li className={location.pathname === '/user/exchangeCoin' ? 'menu_choose_nav-ul_item active' : 'menu_choose_nav-ul_item'}>
                        <span onClick={handleOpenExchange} >Đổi Coin</span>
                    </li>
                    <li className={location.pathname === '/boxchat' ? 'menu_choose_nav-ul_item active' : 'menu_choose_nav-ul_item'}>
                        <NavLink to="/boxChat">Box Zalo</NavLink>
                    </li>
                    <li className={location.pathname === '/forum' ? 'menu_choose_nav-ul_item active' : 'menu_choose_nav-ul_item'}>
                        <NavLink to="/forum">Diễn Đàn</NavLink>
                    </li>
                </ul>
            </div>

            {/* menu login register user and system */}
            <div className='menu_system'>
                {userLogin?.isLoggedIn && userLogin?.accset_Token !== null ? <MenuHaveUser /> : <MenuNotUser setLogin={setLogin} login={login} />}
            </div>
        </div>
    );
}

export default HeaderComponent;