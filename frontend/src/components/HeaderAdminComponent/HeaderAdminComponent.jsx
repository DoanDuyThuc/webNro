
import AdminRose from '../../public/images/adminRose.png';
import Image from 'react-bootstrap/esm/Image';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import { MdSpaceDashboard } from "react-icons/md";
import { MdForum } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import './HeaderAdminComponent.scss';
import { useSelector } from 'react-redux';

function HeaderAdminComponent() {

    const user = useSelector(state => state?.user);

    return (
        <div className='HeaderAdminComponent'>
            <div className='HeaderAdminComponent__header'>
                <Image width={60} src={AdminRose} />
                <span>{user?.player.name}</span>
            </div>

            <div className='HeaderAdminComponent__home'>
                <ul className='HeaderAdminComponent__home_listUl'>
                    <li>
                        <NavLink to={'/admin/manager/Dashboard'} className='HeaderAdminComponent__home__item'>
                            <MdSpaceDashboard />
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className='HeaderAdminComponent__home__item' to='/admin/manager/users'>
                            <FaUser />
                            Quản Lý User
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className='HeaderAdminComponent__home__item' to='/admin/manager/forum'>
                            <MdForum />
                            Quản Lý Bài Viết
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className='HeaderAdminComponent__home__item' to='/admin/manager/forum-comments'>
                            <MdForum />
                            Quản Lý Comment
                        </NavLink>
                    </li>

                </ul>
            </div>
        </div>
    );
}

export default HeaderAdminComponent;