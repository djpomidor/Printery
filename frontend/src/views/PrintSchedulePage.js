/* eslint-disable no-unused-vars */
import React from 'react';
import { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";

// import '.././css/main.css';
// import '.././css/utilities.css';

import { Search, UserMenu, VerticalMenu } from '../components';
import { Main, TopNav } from '../containers';
import Sidebar from "../containers/sidebar/Sidebar.jsx";
import PrintSchedule from "../components/printSchedule/PrintSchedule";
import Header from "../components/printSchedule/Header.js";
import RightPanel from "../components/printSchedule/RightPanel.jsx";


function PrintSchedulePage() {
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [machine, setMachine] = useState("sm1"); // состояние для хранения текущего значения machine
  const handleTabChange = (selectedTab) => {
    setMachine(selectedTab); // обновление текущего значения machine при изменении вкладки
  };

  return (
    <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
      <Sidebar />
      <div className="flex-lg-1 h-screen overflow-y-lg-auto">
        <TopNav />
        <main className="py-6 bg-surface-secondary">
        <Header onTabChange={handleTabChange} />
        <div className="container-fluid overflow-x: auto;">
        <div className="row">
          <div className='col-lg-8 table-responsive'>
          <PrintSchedule machine={machine} updateTrigger={updateTrigger} setUpdateTrigger={setUpdateTrigger} className="py-6 bg-surface-secondary"/>
        </div>
       <RightPanel updateTrigger={updateTrigger} setUpdateTrigger={setUpdateTrigger}/>
       </div>
       </div>
       </main>
      </div> 
  </div>
  );
}

export default PrintSchedulePage;
