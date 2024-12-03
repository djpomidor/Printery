import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
// import XmlToJsonParser from '../../components/orders/createOrder/XmlToJsonParser.jsx';

const Header = ({ setComponent }) => {
  return (
    <header>
    <div className="container-fluid">
        <div className="border-bottom pt-6">
          <div className="row align-items-center">
           <div className="col-sm col-12">
              <h1 className="h2 ls-tight"><span className="d-inline-block me-3"></span>Заказы</h1>
           </div>
           <div className="col-sm-auto col-12 mt-4 mt-sm-0">
             <div className="hstack gap-2 justify-content-sm-end">
                 {/* <a href="#modalExport" className="btn btn-sm btn-neutral border-base" data-bs-toggle="modal">
                     <span className="pe-2"><i className="bi bi-people-fill"></i> </span><span>Share</span>
                 </a> */}
                 {/* <a href="#offcanvasCreate" className="btn btn-sm btn-primary" data-bs-toggle="offcanvas">
                     <span className="pe-2"><i className="bi bi-plus-square-dotted"></i> </span><span>Create</span>
                 </a> */}
                  <button className="btn btn-sm btn-primary" onClick={() => setComponent("XmlToJsonParser")}>Парсер</button>
                  <button className="btn btn-sm btn-primary" onClick={() => setComponent("OrdersTable")}>Все заказы</button>
                  <button className="btn btn-sm btn-primary" onClick={() => setComponent("CreateOrder")}>Создать заказ</button>
             </div>
           </div>
          </div>
{/* 
          <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Парсер</Nav.Link> */}
            
            {/* <Button className="btn btn-sm btn-primary" onClick={() => setComponent("XmlToJsonParser")}>Парсер</Button> */}
            {/* <Nav.Link href="#link">Link</Nav.Link> */}
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          {/* </Nav>
        </Navbar.Collapse>
      </Container> */}
     {/* </Navbar> */}
     
          {/* <ul className="nav  overflow-x border-0">
              <li className="nav-item"><a href="http://localhost:3000/user-cabinet" className="nav-link active">View all</a></li>
              <li className="nav-item"><a href="http://localhost:3000/user-cabinet" className="nav-link">Most recent</a></li>
              <li className="nav-item"><a href="http://localhost:3000/user-cabinet" className="nav-link">Popular</a></li>
          </ul> */}
      </div>
    </div>
    </header>
  )
}

export default Header