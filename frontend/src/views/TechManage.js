import React from 'react'
import { Sidebar } from '../containers';
import TopNav from '../containers/topnav/TopNav';
import Nav from 'react-bootstrap/Nav';
// import PrintingQueue from '../components/printingqueue/PrintingQueue';
import Color_switch from '../temp/color_switch';

const TechManage = () => {
    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
          <Sidebar />
          <div className="flex-lg-1 h-screen overflow-y-lg-auto">
            <TopNav />
            <div>
              <Color_switch></Color_switch>
            </div>
            {/* <Header /> */}
            {/* <main className="py-6 bg-surface-secondary"> */}
              {/* <Main /> */}
            {/* </main> */}
            {/* <p>{res}</p> */}
            {/* <PrintingQueue /> */}
          </div>
      </div>
      );
}

export default TechManage