import React from 'react'
import ShowOrderDetails from './ShowOrderDetails'

const Order = (props) => {
  return (
    <tr id={props.number} onClick={ShowOrderDetails}>
    <th>{props.number}</th>
    <th>{props.name}, {props.type}</th>
    <th>{props.width} x {props.height}</th>
    <th>{props.circulation}</th>
    <th>{props.due_date}</th>
</tr>
  )
}

export default Order