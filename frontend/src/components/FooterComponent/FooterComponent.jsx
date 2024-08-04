
import Image from 'react-bootstrap/Image';
import old from '../../public/images/12.png';
import logo from '../../public/images/logo.png';
import './FooterComponent.scss'

function FooterComponent() {

    return (
        <div className='Footer' >
            <div className='Footer_text'>
                <Image height={12} className='footer_image' src={old} />
                <span>Dành cho người chơi trên 12 tuổi. Chơi quá 180 phút mỗi ngày sẽ hại sức khỏe.</span>
            </div>
            <div style={{ textAlign: 'center' }}>

                <Image height={100} className='footer_image' src={logo} />
            </div>
        </div>
    );
}

export default FooterComponent;