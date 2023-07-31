// import React from 'react'
import Nav from 'react-bootstrap/Nav'

const Header = ({ setComponent }) => {
  return (
    <header className="position-lg-sticky top-lg-0 d-none d-lg-block overlap-10 flex-none bg-white shadow-sm mb-5 rounded">
    <div className="container-fluid ">
        {/* <div className="border-bottom pt-6"> */}
          <div className="row align-items-center py-3">
           <div className="col-sm col-12">
              <h1 className="h1"><span className="d-inline-block me-3"></span>График печати</h1>
           </div>
           <div className="col-sm-auto col-12 mt-4 mt-sm-0">
             <div className="hstack gap-2 justify-content-sm-end">
                 <a href="#modalExport" className="btn btn-sm btn-neutral border-base" data-bs-toggle="modal">
                     <span className="pe-2"><i className="bi bi-people-fill"></i> </span><span>Share</span>
                 </a>
                 {/* <a href="#offcanvasCreate" className="btn btn-sm btn-primary" data-bs-toggle="offcanvas">
                     <span className="pe-2"><i className="bi bi-plus-square-dotted"></i> </span><span>Create</span>
                 </a> */}
                  <button className="btn btn-sm btn-primary" onClick={() => setComponent("OrdersTable")}>My Orders</button>
                  <button className="btn btn-sm btn-primary" onClick={() => setComponent("CreateOrder")}>Create</button>
             </div>
           </div>
          </div>
          <Nav variant="tabs">
          <Nav.Item>
              <Nav.Link  href="http://localhost:3000/print-schedule" >SM-1</Nav.Link> 
          </Nav.Item>    
          <Nav.Item>
          <Nav.Link  href="http://localhost:3000/print-schedule" >SM-2</Nav.Link> 
          </Nav.Item>    
          <Nav.Item>
          <Nav.Link  href="http://localhost:3000/print-schedule" >Rapida</Nav.Link> 
          </Nav.Item>
          </Nav>
      {/* </div> */}
    </div>
    </header>
    
  )
}

export default Header