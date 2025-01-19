/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
// import React from 'react';
import Order from './Order'
import Table from 'react-bootstrap/Table';
import '../orders/css/style.css';

const OrdersList = ({orders, title, updateTrigger, setUpdateTrigger}) => {
  const [searchTerm, setSearchTerm] = useState("");
  // console.log("!__", orders);
  const filteredOrders = orders.filter((order) =>
    order.orderNumber.toString().includes(searchTerm)
  );

  return (
    <>
    <div className="form-outline">
    <input className="form-control"
          type="text"
          placeholder="Поиск по номеру"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)} />
    </div>
    <Table striped bordered hover className="custom-table" >
        <thead>
        <tr>
          <th scope="col">с/з</th>
          <th scope="col">Title</th>
          <th scope="col">Size</th>
          <th scope="col">Circulation</th>
          <th scope="col">Delivery Date</th>
          {/* <th scope="col">Due Date</th> */}
        </tr>
        </thead>
        <tbody>
            {filteredOrders.map((order, i) => (
                <Order key={i} {...order} updateTrigger={updateTrigger} setUpdateTrigger={setUpdateTrigger}/>
            ))}
        </tbody>
    </Table>
    </>
  )
  
}

export default OrdersList