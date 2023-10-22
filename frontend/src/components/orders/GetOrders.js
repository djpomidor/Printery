import React from 'react';
import { useEffect, useState } from "react";
import useAxios from "../../utils/useAxios";

import OrdersList from './OrdersList';

function GetOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();

  const [res, setRes] = useState("");
  const api = useAxios();  
     
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/orders/");
        // console.log('response!!!', response.data);
        setRes(response.data.response);
        setOrders(response.data);
        
      } catch {
        setError("error");
        console.log('Aaalarmee!!!',error)
        setRes("Something went wrong, try refreshing the page");
        console.error(error);
      }
    };
    fetchData();
    // eslint -disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  return (
      <>
      {res?
       <p>{res}</p>
      :
        <OrdersList orders={orders} title=""/>
      }
      </>
  );
}

export default GetOrders