/* eslint-disable no-unused-vars */

import React from 'react';
import { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";

import '.././css/bootstrap.css';
import '.././css/main.css';
import '.././css/utilities.css';

import { Search, UserMenu, VerticalMenu } from '.././components';
import { Header, Main, RightPanel, Sidebar, TopNav } from '.././containers';

function ManagePage() {
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
  }, []);

  return (
    <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
      <Sidebar />
      <div className="flex-lg-1 h-screen overflow-y-lg-auto">
        <TopNav />
          <Main />
      </div>
  </div>
  );
}

export default ManagePage;
