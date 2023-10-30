import React  from 'react';
import { useEffect, useState } from "react";
import useAxios from "../../utils/useAxios";

import OrdersList from './OrdersList';

function GetFilteredOrders(props) {
  // const [updateTrigger, setUpdateTrigger] = useState(false);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();

  const [res, setRes] = useState("");
  const api = useAxios();  
     
  useEffect(() => {
    const fetchData = async () => {
      const currentDate = "2023-07-27 15:33:28.146113";
      try {
        const response = await api.get("/orders/print-shedule/" + currentDate);
        setRes(response.data.response);
        setOrders(response.data);
        
      } catch (error) {
        setError('Something went wrong: ' + error.message);
        console.error(error);
      }
    };
    fetchData();

  }, [props.updateTrigger]);

  // props.setUpdateTrigger(false);
 
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

export default GetFilteredOrders