

import ForumDiscussComponent from '../../components/ForumDiscussComponent/ForumDiscussComponent';
import ForumNotifyComponent from '../../components/ForumNotifyComponent/ForumNotifyComponent';
import './ForumPage.scss';


function ForumPage() {

    return (

        <div className='ForumPage'>
            <ForumNotifyComponent />
            <ForumDiscussComponent />
        </div>
    );
}

export default ForumPage;