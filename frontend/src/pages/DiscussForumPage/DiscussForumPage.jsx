

import NotifyAdminDetailsComponent from '../../components/NotifyAdminDetailsComponent/NotifyAdminDetailsComponent';
import Image from 'react-bootstrap/Image';
import AdminRose from '../../public/images/adminRose.png';
import './DiscussForumPage.scss';
import { GetDetaisPostForumService } from '../../services/AccountService';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import namec from '../../public/images/namec.png';
import xayda from '../../public/images/xayda.png';
import traidat from '../../public/images/traidat.png';
import DiscussDetailsComponent from '../../components/DiscussDetailsComponent/DiscussDetailsComponent';
import parse from 'html-react-parser';

function DiscussForumPage() {

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

        <div className='DiscussForumPage'>
            <div className='DiscussForumPage__info'>
                {(() => {
                    switch (dataNotifyAdmin?.data?.post.avartar) {
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
                <span>{dataNotifyAdmin?.data?.post.name}</span>
            </div>
            <div className='DiscussForumPage__content'>
                <h5>{dataNotifyAdmin?.data?.post.title}</h5>
                <span>{dataNotifyAdmin?.data?.post.createdAt}</span>
                <DiscussDetailsComponent content={parse(parse(dataNotifyAdmin?.data?.post.content))} />
            </div>
        </div>
    );
}

export default DiscussForumPage;