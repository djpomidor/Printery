import React from 'react'
import Order from './Order'
import Table from 'react-bootstrap/Table';

const OrdersList = ({orders, title}) => {
  return (
    <>
    <Table striped bordered hover >
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Size</th>
          <th scope="col">Circulation</th>
          <th scope="col">Delivery Date</th>
          <th scope="col">Due Date</th>
        </tr>
        </thead>
        <tbody>
            {orders.map((order, i) => (
                <Order key={i} {...order}/>
            ))}
        </tbody>
    </Table>
    </>
  )
  
}

export default OrdersList