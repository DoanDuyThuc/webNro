
import Image from 'react-bootstrap/Image';
import AdminRose from '../../public/images/adminRose.png';
import Ticked from '../../public/images/Ticked.png';
import './ForumNotifyComponent.scss';
import { NavLink } from 'react-router-dom';
import { GetPostForumAdminService } from '../../services/AccountService';
import { useQuery } from 'react-query';

function ForumNotifyComponent() {

    //data fetch
    const fetchForum = async () => {
        const dataForum = await GetPostForumAdminService();
        return dataForum;
    };

    const data = useQuery(['forum_admin'],
        () => fetchForum(), {
        // enabled: !!user?.user?.id && !!user?.accset_Token,
        onSuccess: (data) => {
            return data?.post;
        },
        onError: (error) => {
            console.error('Error fetching player data:', error);
        },
    });


    return (
        <div className='ForumNotify'>
            <h5 className='ForumNotify__Header'>Thông Báo Mới</h5>
            {!data.isLoading ? (
                data?.data?.post.map((item, index) => (
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
                ))
            ) : 'Loading...'}
        </div>
    );
}

export default ForumNotifyComponent;