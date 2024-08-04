

import NotifyAdminDetailsComponent from '../../components/NotifyAdminDetailsComponent/NotifyAdminDetailsComponent';
import Image from 'react-bootstrap/Image';
import AdminRose from '../../public/images/adminRose.png';
import './NotifyAdminPage.scss';

function NotifyAdminPage() {



    return (

        <div className='NotifyAdminPage'>
            <div className='NotifyAdminPage__info'>
                <Image width={40} src={AdminRose} />
                <span>Admin</span>
            </div>
            <div className='NotifyAdminPage__content'>
                <h5>💥[CHÍNH THỨC RA MẮT SEVER 3 - HỒI SINH NGỌC RỒNG]</h5>
                <span>2024-06-19 12:33:43</span>
                <NotifyAdminDetailsComponent />
            </div>
        </div>
    );
}

export default NotifyAdminPage;