/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
// import React from 'react';
import Order from './Order'
import Table from 'react-bootstrap/Table';
import './css/style.css';

const OrdersList = ({orders, title}) => {
  const [searchTerm, setSearchTerm] = useState("");
  console.log("!__", orders);
  const filteredOrders = orders.filter((order) =>
    order.number.toString().includes(searchTerm)
  );

  return (
    <>
    <input
          type="text"
          placeholder="Поиск по номеру"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)} />
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
                <Order key={i} {...order}/>
            ))}
        </tbody>
    </Table>
    </>
  )
  
}

export default OrdersList