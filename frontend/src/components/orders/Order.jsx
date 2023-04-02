// import React from 'react'
// import ShowOrderDetails from './ShowOrderDetails'

const Order = (props) => {
  const ShowOrderDetails = (props) => {
    return (
      console.log("Order:", props)
    )
  }
  return (
    <tr id={props.number} onClick={()=>ShowOrderDetails(props)}>
    <th>{props.number}</th>
    <th>{props.name}, {props.type}</th>
    <th>{props.width} x {props.height}</th>
    <th>{props.circulation}</th>
    {/* {props.parts.map(part => <th>{part.part_name}</th>)} */}
    <th>{props.due_date}</th>
</tr>
  )
}

export default Order