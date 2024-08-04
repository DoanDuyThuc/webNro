
import './NotFoundPage.scss';
import notFoundImage from '../../public/images/Scarecrow.png';
import { useNavigate } from 'react-router-dom';


function NotFoundPage() {

    const navigate = useNavigate();

    return (

        <div className="display">
            <div className="display__img">
                <img src={notFoundImage} alt="404-Scarecrow" />
            </div>
            <div className="display__content">
                <h2 className="display__content--info">404 Not found</h2>
                <p className="display__content--text">
                    Trang bạn đang tìm kiếm có thể đã bị xóa hoặc tạm thời không khả dụng
                </p>
                <button onClick={() => navigate('/')} className="btn">QUAY LẠI TRANG CHỦ</button>;
            </div>
        </div>
    );
}

export default NotFoundPage;