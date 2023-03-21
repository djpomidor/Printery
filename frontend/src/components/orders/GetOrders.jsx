import React from 'react';
import axios from "axios";
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
=======
  const [error, setError] = useState();

  useEffect(()=>{
        fetch('/api/orders/')
        .then(response => {
            if (response.ok) {
              return response.json()
            } else {
              throw Error(`Something went wrong: code ${response.status}`)
            }
          })
        .then(setOrders)
        .catch(error => {
            console.log('!@!@!@!',error)
            setError('Ошибка, подробности в консоли')
          })
      }, []);
  
  return (
      <div>
      {error?
       <p>{error}</p>
      :
        <OrdersList orders={orders} title="Latest orders!!"/>
      }
      </div>
  );
}

export default GetOrders