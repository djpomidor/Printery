/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import avatar from '../../assets/avatar_saul.jpg';
import logo_cmyk from '../../assets/logo-cmyk.png'
import GetFilteredOrders from './GetFilteredOrders';

const Sidebar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg scrollbar" id="sidebar">
    <div className="container-fluid">
      <button className="navbar-toggler ms-n2" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        
        <a className="navbar-brand d-inline-block py-lg-2 mb-lg-5 px-lg-6 me-0" href="/">
           <img alt="..." src={ logo_cmyk } style={{width: "40px", height: "40px"}}className=''/> 
          <span className="fs-5 fw-semibold">Printery</span></a>
          <GetFilteredOrders/>

         


    </div>
</nav>
  )
}

export default Sidebar