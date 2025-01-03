/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React from 'react';
// import ShowOrderDetails from './ShowOrderDetails'
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Collapse from 'react-bootstrap/Collapse';


const Part = (part) => {
  return (
      <tr>
        <td>
          {(part.part_name === 'BLO')?('Block'):''}
          {(part.part_name === 'COV')?('Cover'):''}
          {(part.part_name === 'INS')?('Insert'):''}  
        </td>
        <td>{part.pages}</td>
        <td>{part.color_display}</td>
        <td>{`${part.paper.type_display}, ${part.paper.density} гр/м`}<sup>2</sup></td>
        <td>{part.laminate}</td>
        <td>{part.uflak}</td>
      </tr>
  )
}

function Order(props) {
  const [open, setOpen] = useState(false);
  return (
    <>
    <tr id={props.orderNumber} 
        onClick={() => setOpen(!open)}
        aria-controls={props.pk}
        aria-expanded={open}
        style={{cursor:'pointer'}}>
      <td>{props.number}</td>
      <td>{props.nameOfOrder}, {props.typeOfOrder}</td>
      <td>{props.width}x{props.height}</td>
      <td>{props.circulation}</td>
        {/* {props.parts.map(part => <th>{part.part_name}</th>)} */}
      <td>{props.delivery_date}</td>
      {/* <td>{props.due_date}</td> */}
    </tr>
    <tr>
      {/* <td></td> */}
    <td colSpan="6">
    <Collapse in={open}>
      <div id={props.pk} className="px-2 pt-2 pb-4">
      <Table hover size="sm">
        {(props.parts.length !== 0) ?
        (
          <thead>
          <tr>
            <th></th>
            <th>Pages</th>
            <th>Color</th>
            <th>Paper</th>
            <th></th>
            <th>Offset Lak</th>
            <th>Laminate</th>
            
        </tr>
        </thead>
        ):
        ''
      }
        <tbody>
      {props.parts.map((part, i) => (
        <Part key={i} {...part}/>
        ))}
        </tbody>
      </Table>
      </div>
    </Collapse>
    </td>
    </tr>
    </>
  )
}

export default Order