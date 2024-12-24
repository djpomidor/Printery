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
import AuthContext from "../context/AuthContext";
import  { useContext } from "react";
import Collapse from 'react-bootstrap/Collapse';


function PrintSchedulePage() {
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [machine, setMachine] = useState("sm1"); // состояние для хранения текущего значения machine
  const handleTabChange = (selectedTab) => {
    setMachine(selectedTab); // обновление текущего значения machine при изменении вкладки
  };
  const { userGroups } = useContext(AuthContext);
  const [open, setOpen] = useState(true)


  return (
    <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
      
      <Collapse in={open} dimension="width">
        <div id="sidebarCollapseByUser" className="bg-light">
          <Sidebar/>
        </div>
      </Collapse>
      <button
        className="ms-n2"
        type="button"
        onClick={() => setOpen(!open)}
        aria-controls="sidebarCollapseByUser"
        aria-expanded={open}
      >
        <i className={open ? "bi bi-caret-left" : "bi bi-caret-right"}></i>
      </button>

      <div className="flex-lg-1 h-screen overflow-y-lg-auto">
        <TopNav header="График печати"/>
        <main className="py-6 bg-surface-secondary">
        <Header onTabChange={handleTabChange} />
        <div className="container-fluid overflow-x: auto;">
        <div className="row">
        {/* <div className="sticky-top top-lg-36 d-lg-block overlap-10 flex-none bg-white shadow-sm mb-5 " id="topbar"> 
        fgdgdfsgd</div> */}
          <div className={`col-lg-${userGroups.includes("ctp_operators")?('10'):("8")} table-responsive `}>
          <PrintSchedule machine={machine} updateTrigger={updateTrigger} setUpdateTrigger={setUpdateTrigger} className="py-6 bg-surface-secondary"/>
        </div>
        {userGroups.includes("ctp_operators") || (
         <RightPanel updateTrigger={updateTrigger} setUpdateTrigger={setUpdateTrigger}/>
        )}
       </div>
       </div>
       </main>
      </div> 
  </div>
  );
}

export default PrintSchedulePage;
