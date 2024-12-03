import { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import PrintSchedule from "../components/printSchedule/PrintSchedule";
import Header from "../components/printSchedule/Header.js";
import  { useContext } from "react";
import AuthContext from "../context/AuthContext";

import '.././css/main.css';
import '.././css/utilities.css';

import { Search, UserMenu, VerticalMenu } from '.././components';
import { Main, Sidebar, TopNav } from '.././containers';
import RightPanel from ".././components/printSchedule/RightPanel.jsx";
import RightPanelCtp from ".././components/printSchedule/RightPanelCtp.jsx";

function CtpPage() {
  const [res, setRes] = useState("");
  const api = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/test/");
        setRes(response.data.response);
      } catch {
        setRes("Something went wrong");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [machine, setMachine] = useState("sm1"); // состояние для хранения текущего значения machine
  const handleTabChange = (selectedTab) => {
    setMachine(selectedTab); // обновление текущего значения machine при изменении вкладки
  };
  const { userGroups } = useContext(AuthContext);

  return (
    <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
      {/* {userGroups.includes("ctp_operators") || (
      <Sidebar />
     )} */}
      <div className="flex-lg-1 h-screen overflow-y-lg-auto">
        <TopNav header="График печати"/>
        <main className="py-6 bg-surface-secondary">
        <Header onTabChange={handleTabChange} />
        <div className="container-fluid overflow-x: auto;">
        <div className="row">
          <div className='col-lg-10 table-responsive'>
          <PrintSchedule machine={machine} updateTrigger={updateTrigger} setUpdateTrigger={setUpdateTrigger} className="py-6 bg-surface-secondary"/>
        </div>
        {userGroups.includes("ctp_operators") ? (
          <>
         <RightPanelCtp updateTrigger={updateTrigger} setUpdateTrigger={setUpdateTrigger}/>
         <div>sdfsdfsdfsd</div>
         </>
        ) : (
          <RightPanel updateTrigger={updateTrigger} setUpdateTrigger={setUpdateTrigger}/>

        )}
       </div>
       </div>
       </main>
      </div>
  </div>
  );
}

export default CtpPage;

