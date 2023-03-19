import React from 'react';
<<<<<<< HEAD
=======
import axios from "axios";
>>>>>>> 65e9cb5465c0ee949f7aec77ee4784d4593cea6d
import OrdersList from './OrdersList';
import {useEffect, useState, useRef} from "react";

const GetOrders = () => {
  const [orders, setOrders] = useState([]);
<<<<<<< HEAD

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
>>>>>>> 65e9cb5465c0ee949f7aec77ee4784d4593cea6d
  );
}

export default GetOrders