import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PrintingQueue = () => {
    return (
        <Container className="p-8">
            <Row>
              <Col>
                <Nav variant="pills" defaultActiveKey="/home">
                     <Nav.Item>
                       <Nav.Link href="/home">Active</Nav.Link>
                     </Nav.Item>
                     <Nav.Item>
                       <Nav.Link eventKey="link-1">Option 2</Nav.Link>
                     </Nav.Item>
                     <Nav.Item>
                <Nav.Link eventKey="/aaa" >
                  Disabled
                </Nav.Link>
              </Nav.Item>
                </Nav>

              </Col>
            </Row>
        </Container>

        
        
      );
}

export default PrintingQueue