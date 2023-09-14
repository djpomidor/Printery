import React  from 'react';
import { useEffect, useState } from "react";
import useAxios from "../../utils/useAxios";

import OrdersList from './OrdersList';

function GetFilteredOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();

  const [res, setRes] = useState("");
  const api = useAxios();  
     
  useEffect(() => {
    const fetchData = async () => {
      const currentDate = "2023-07-27 15:33:28.146113";
      try {
        const response = await api.get("/orders/printShedule/" + currentDate);
        // console.log('response!!!', response.data);
        setRes(response.data.response);
        setOrders(response.data);
        
      } catch {
        setError("error");
        setRes("Something went wrong: ");
        console.log('Error:', error);
        console.log('Aaalarmee!!!', res);
        console.error(error);
      }
    };
    fetchData();

  }, []);
 
  return (
    // <>
    // <div>
    //   {orders.map((order, i)=> (
    //     <Order key={i} {...order} />
    //   ))}
    // </div>
    // </>
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