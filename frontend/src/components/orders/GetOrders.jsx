import React from 'react';
import OrdersList from './OrdersList';
import {useEffect, useState, useRef} from "react";

const GetOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(()=>{
        fetch('http://localhost:8000/api/orders/')
        .then(response => response.json())
        .then(setOrders);
  }, []);
  
  return (
        <OrdersList orders={orders} title="Latest orders!!"/>
  );
}

export default GetOrders