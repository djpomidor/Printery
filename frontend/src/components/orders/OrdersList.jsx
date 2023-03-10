import React from 'react'
import Order from './Order'
import ShowOrderDetails from './ShowOrderDetails'

const OrdersList = ({orders, title}) => {
  return (
    <table className="table table-hover table-nowrap">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Size</th>
          <th scope="col">Circulation</th>
          <th scope="col">Due Date</th>
        </tr>
        </thead>
        <tbody>
            {orders.map((order, i) => (
                <Order key={i} {...order}/>
            ))}
        </tbody>
    </table>
  )
}

export default OrdersList