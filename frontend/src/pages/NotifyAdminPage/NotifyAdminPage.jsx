

import NotifyAdminDetailsComponent from '../../components/NotifyAdminDetailsComponent/NotifyAdminDetailsComponent';
import Image from 'react-bootstrap/Image';
import AdminRose from '../../public/images/adminRose.png';
import './NotifyAdminPage.scss';
import { GetDetaisPostForumService } from '../../services/AccountService';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';


function NotifyAdminPage() {

    const { id } = useParams();

    const fetchNotifyAdmin = async () => {
        const response = await GetDetaisPostForumService(id);
        return response
    }

    const dataNotifyAdmin = useQuery(['forum_detais'],
        () => fetchNotifyAdmin(), {
        enabled: !!id,
        onSuccess: (data) => {
            return data;
        },
        onError: (error) => {
            console.error('Error fetching player data:', error);
        },
    });


    return (

        <div className='NotifyAdminPage'>
            <div className='NotifyAdminPage__info'>
                <Image width={40} src={AdminRose} />
                <span>{dataNotifyAdmin?.data?.post.name}</span>
            </div>
            <div className='NotifyAdminPage__content'>
                <h5>{dataNotifyAdmin?.data?.post.title}</h5>
                <span>{dataNotifyAdmin?.data?.post.createdAt}</span>
                <NotifyAdminDetailsComponent content={parse(parse(dataNotifyAdmin?.data?.post.content))} />
            </div>
        </div>
    );
}

export default NotifyAdminPage;