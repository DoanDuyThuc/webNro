
import Image from 'react-bootstrap/Image';
import maphongba from '../../public/images/gif_maphongba.gif';
import saida from '../../public/images/gif_gif_Saiyain.gif';
import kame from '../../public/images/gif_supber_kame.gif';
import './HomePage.scss';
import { useSelector } from 'react-redux';

function HomePage() {

    return (
        <div className='HomePage' >
            <div className='home_introduce'>
                <h4>Giới Thiệu</h4>
                <div className='home_context'>
                    <p>
                        Ngọc Rồng Online là Trò Chơi Trực Tuyến với cốt truyện xoay quanh bộ truyện tranh 7 viên Ngọc Rồng. Người chơi sẽ hóa thân thành một trong những anh hùng của 3 hành tinh: Trái Đất, Xayda, Namếc. Cùng luyện tập, tăng cường sức mạnh và kỹ năng. Đoàn kết cùng chiến đấu chống lại các thế lực hung ác. Cùng nhau tranh tài.
                        <br />

                        Đặc điểm nổi bật:
                        <br />

                        - Thể loại hành động, nhập vai. Trực tiếp điều khiển nhân vật hành động. Dễ chơi, dễ điều khiển nhân vật. Đồ họa sắc nét. Có phiên bản đồ họa cao cho điện thoại mạnh và phiên bản pixel cho máy cấu hình thấp.
                        <br />

                        - Cốt truyện bám sát nguyên tác. Người chơi sẽ gặp tất cả nhân vật từ Bunma, Quy lão kame, Jacky-chun, Tàu Pảy Pảy... cho đến Fide, Pic, Poc, Xên, Broly, đội Bojack.
                        <br />

                        - Đặc điểm nổi bật nhất: Tham gia đánh doanh trại độc nhãn. Tham gia đại hội võ thuật. Tham gia săn lùng ngọc rồng để mang lại điều ước cho bản thân.
                        <br />

                        - Tương thích tất cả các dòng máy trên thị trường hiện nay: Máy tính PC, Điện thoại di động Nokia Java, Android, iPhone, Windows Phone, và máy tính bảng Android, iPad.
                    </p>
                </div>
                <div className='home_image'>
                    <p className='home_image_banner'>Một Số Hình Ảnh Cơ Bản</p>
                    <p className='home_image_item'>
                        <Image src={maphongba} />
                        <Image src={saida} />
                        <Image src={kame} />
                    </p>
                </div>
            </div>

            <div className='home_guide'>
                <h4>Hướng Dẫn Tân Thủ</h4>
                <div className='home_context'>
                    <p>
                        <strong>1. Đăng ký tài khoản</strong>
                    </p>
                    <p>
                        Ngọc Rồng Online sử dụng Tài Khoản riêng, không chung với bất kỳ Trò Chơi nào khác.
                        <br />

                        Bạn có thể đăng ký tài khoản miễn phí ngay trong game, hoặc trên trang Diễn Đàn.
                        <br />

                        Khi đăng ký, bạn nên sử dụng đúng số điện thoại hoặc email thật của mình. Nếu sử dụng thông tin sai, người có số điện thoại hoặc email thật sẽ có thể lấy mật khẩu của bạn.
                        <br />

                        Số điện thoại và email của bạn sẽ không hiện ra cho người khác thấy. Admin không bao giờ hỏi mật khẩu của bạn.
                    </p>
                    <p><strong>2. Hướng dẫn điều khiển</strong></p>
                    <p>
                        Đối với máy bàn phím: Dùng phím mũi tên, phím số, để điều khiển nhân vật. Phím chọn giữa để tương tác.
                        <br />

                        Đối với máy cảm ứng: Dùng tay chạm vào màn hình cảm ứng để di chuyển. Chạm nhanh 2 lần vào 1 đối tượng để tương tác.
                        <br />

                        Đối với PC: Dùng chuột, click chuột phải để di chuyển, click chuột trái để chọn, click đôi vào đối tượng để tương tác
                    </p>
                    <p><strong>3. Một số thông tin căn bản</strong></p>
                    <p>
                        - Đậu thần dùng để tăng KI và HP ngay lập tức.
                        <br />

                        - Bạn chỉ mang theo người được 10 hạt đậu. Nếu muốn mang nhiều hơn, hãy xin từ bạn bè trong Bang.
                        <br />

                        - Tất cả các sách kỹ năng đều có thể học miễn phí tại Quy Lão Kame, khi bạn có đủ điểm tiềm năng.
                        <br />

                        - Bạn không thể bay, dùng kỹ năng, nếu hết KI.
                        <br />

                        - Tấn công quái vật cùng bạn bè trong Bang sẽ mang lại nhiều điểm tiềm năng hơn đánh một mình.
                        <br />

                        - Tập luyện với bạn bè tại khu vực thích hợp sẽ mang lại nhiều điểm tiềm năng hơn đánh quái vật.
                        <br />

                        - Khi được nâng cấp, đậu thần sẽ phục hồi nhiều HP và KI hơn.
                        <br />

                        - Vào trò chơi đều đặn mỗi ngày để nhận được Ngọc miễn phí.
                        <br />

                        - Đùi gà sẽ phục hồi 100% HP, KI. Cà chua phục hồi 100% KI. Cà rốt phục hồi 100% HP.
                        <br />

                        - Cây đậu thần kết một hạt sau một thời gian, cho dù bạn đang offline.
                        <br />

                        - Sau 3 ngày không tham gia trò chơi, bạn sẽ bị giảm sức mạnh do lười luyện tập.
                        <br />

                        - Bạn sẽ giảm thể lực khi đánh quái, nhưng sẽ tăng lại thể lực khi không đánh nữa.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;