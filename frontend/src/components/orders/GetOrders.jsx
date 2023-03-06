import React from 'react'
import OrdersList from './OrdersList';

const GetOrders = () => {
  
        fetch('http://localhost:8000/api/orders/')
        .then(response => response.json())
        .then(data => {
         
        <OrdersList orders={data} title="Latest orders!!"/>;
         console.log("!!!!!!!!!", data);
        })
        

}

export default GetOrders