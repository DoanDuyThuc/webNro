
import Image from 'react-bootstrap/Image';
import namec from '../../public/images/namec.png';
import xayda from '../../public/images/xayda.png';
import traidat from '../../public/images/traidat.png';
import AdminRose from '../../public/images/adminRose.png';

import './ForumDiscussComponent.scss';
import { NavLink } from 'react-router-dom';

function ForumDiscussComponent({ data }) {

    return (
        <div className='ForumDiscuss'>
            <h5 className='ForumNotify__Header'>Những Lời Đàm Tiếu</h5>

            {data.map((item, index) => (

                <div key={index} className='ForumDiscuss__content'>
                    {(() => {
                        switch (item?.avartar) {
                            case '0':
                                return <Image src={traidat} height={60} width={60} />
                            case '1':
                                return <Image src={namec} height={60} width={60} />

                            case '2':
                                return <Image src={xayda} height={60} width={60} />
                            default:
                                return <Image src={AdminRose} height={60} width={60} />
                        }
                    })()}
                    <div className='ForumDiscuss__content__title'>
                        <h4>
                            <NavLink to={`/forum/discuss/${item.id}`}>{item.title}</NavLink>
                        </h4>
                        <span>
                            Đăng bởi: {item.name}
                        </span>
                    </div>
                </div>
            ))}

        </div>
    );
}

export default ForumDiscussComponent;