
import Row from 'react-bootstrap/esm/Row';
import './DefaultAdminComponent.scss';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import HeaderAdminComponent from '../HeaderAdminComponent/HeaderAdminComponent';

function DefaultAdminComponent({ children }) {

    return (
        <div className='AdminComponent'>
            <Container fluid>

                <Row className='AdminComponent__Container'>
                    <Col style={{ paddingLeft: 0 }} sm='3'>
                        <HeaderAdminComponent />
                    </Col>
                    <Col sm='9'>
                        {children}
                    </Col>
                </Row>
            </Container>

        </div>
    );
}

export default DefaultAdminComponent;