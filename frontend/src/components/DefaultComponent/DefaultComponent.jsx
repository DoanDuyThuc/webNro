
import FooterComponent from '../FooterComponent/FooterComponent';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './DefaultComponent.scss';

function DefaultComponent({ children }) {

    return (
        <main className='page_body'>
            <div className='container_Web'>
                <Container className='container_Web_main'>
                    <HeaderComponent />
                    {children}
                    <FooterComponent />
                </Container>
            </div>
        </main>
    );
}

export default DefaultComponent;