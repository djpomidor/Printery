import React from 'react'

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
          <ul className="nav nav-tabs overflow-x border-0">
              <li className="nav-item"><a href="http://localhost:3000/user-cabinet" className="nav-link active">View all</a></li>
              <li className="nav-item"><a href="http://localhost:3000/user-cabinet" className="nav-link">Most recent</a></li>
              <li className="nav-item"><a href="http://localhost:3000/user-cabinet" className="nav-link">Popular</a></li>
          </ul>
      </div>
    </div>
    </header>
  )
}

export default Header