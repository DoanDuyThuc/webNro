

import { useQuery } from 'react-query';
import ForumDiscussComponent from '../../components/ForumDiscussComponent/ForumDiscussComponent';
import ForumNotifyComponent from '../../components/ForumNotifyComponent/ForumNotifyComponent';
import { GetPostForumService } from '../../services/AccountService';
import './ForumPage.scss';
import { useState } from 'react';


function ForumPage() {

    const [forumNotify, setForumNotify] = useState([]);
    const [forumDiscuss, setForumDiscuss] = useState([]);

    //data fetch
    const fetchForum = async () => {
        const dataForum = await GetPostForumService();
        return dataForum;
    };

    useQuery(['forum'],
        () => fetchForum(), {
        // enabled: !!user?.user?.id && !!user?.accset_Token,
        onSuccess: (data) => {
            const notify = data?.post.filter((item) => item?.account.is_admin === true);
            setForumNotify(notify);
            const discuss = data?.post.filter((item) => item?.account.is_admin === false);
            setForumDiscuss(discuss);

        },
        onError: (error) => {
            console.error('Error fetching player data:', error);
        },
    });

    return (

        <div className='ForumPage'>
            <ForumNotifyComponent data={forumNotify} />
            <ForumDiscussComponent data={forumDiscuss} />
        </div>
    );
}

export default ForumPage;