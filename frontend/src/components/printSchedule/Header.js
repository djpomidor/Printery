/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './css/printSchedule.css';

const Header = ({ onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState('sm1');

  const handleClick = (tab) => {
    setSelectedTab(tab); // обновление выбранной вкладки при клике
    onTabChange(tab); // вызов колбэк-функции onTabChange с выбранной вкладкой
  };
  
  return (
    <header className="sticky-top top-lg-0 d-lg-block overlap-10 flex-none bg-white shadow-sm mb-5 rounded">
      <div className="container-fluid ">
        <div className="row align-items-center py-6">
          <div className="col-sm col-12">
            <h1 className="h1"><span className="d-inline-block me-3"></span>График печати</h1>
          </div>
          <div className="col-sm-auto col-12 mt-4 mt-sm-0">
            <div className="hstack gap-2 justify-content-sm-end">
              {/* <a href="#modalExport" className="btn btn-sm btn-neutral border-base" data-bs-toggle="modal">
                     <span className="pe-2"><i className="bi bi-people-fill"></i> </span><span>Share</span>
                 </a> */}
              {/* <a href="#offcanvasCreate" className="btn btn-sm btn-primary" data-bs-toggle="offcanvas">
                     <span className="pe-2"><i className="bi bi-plus-square-dotted"></i> </span><span>Create</span>
                 </a> */}
              {/* <button className="btn btn-sm btn-primary" onClick={() => setComponent("OrdersTable")}>Редактировать</button> */}
              {/* <button className="btn btn-sm btn-primary" onClick={() => setComponent("CreateOrder")}>Сохранить изменения</button> */}

            </div>
            {/* <p>Последнее изменение было в <br/> 13.10,  23 окт.</p> */}
          </div>
        </div>
        <Tabs
          id="tabs"
          activeKey={selectedTab}
          onSelect={(k) => handleClick(k)} 
          className="mb-3 ms-2 w-50 fs-5"
          // justify
        >
          <Tab eventKey="sm1" title="SM-1" className="fs-5"></Tab>
          <Tab eventKey="sm2" title="SM-2" className="fs-5"></Tab>
          <Tab eventKey="rapida" title="Rapida" className="fs-5"></Tab>
        </Tabs>
        {/* </div> */}
      </div>
      
    </header>

  )
}

export default Header