
import Image from 'react-bootstrap/Image';
import AdminRose from '../../public/images/adminRose.png';
import Ticked from '../../public/images/Ticked.png';
import './ForumNotifyComponent.scss';
import { NavLink } from 'react-router-dom';

function ForumNotifyComponent({ data }) {

    return (
        <div className='ForumNotify'>
            <h5 className='ForumNotify__Header'>Thông Báo Mới</h5>
            {data.map((item, index) => (
                <div key={index} className='ForumNotify__Content'>
                    <Image width={60} src={AdminRose} />
                    <div className='ForumNotify__Content__title'>
                        <h4>
                            <NavLink to={`/forum/notify/${item.id}`}>{item.title}</NavLink>
                        </h4>
                        <span>
                            Đăng bởi: {item.name}
                        </span>
                    </div>
                    <Image width={30} src={Ticked} />
                </div>
            ))}
        </div>
    );
}

export default ForumNotifyComponent;