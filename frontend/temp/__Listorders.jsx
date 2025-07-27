import React from 'react'
import ReactDOM from 'react-dom/client'

const Listorders = () => {
//   return (
    // <script type="text/babel">

    // import React, { useState } from "react";

const showOrderDetails = ()=> {
    console.log("SSSSSSSSSSSSSSS")
}
    
const Order = (props)=> {
    return (
        <tr id={props.number} onClick={showOrderDetails}>
            <th>{props.number}</th>
            <th>{props.name}, {props.type}</th>
            <th>{props.width} x {props.height}</th>
            <th>{props.circulation}</th>
            <th>{props.due_date}</th>
        </tr>
    )
}

const OrdersList = ({orders, title})=> {
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
                    <Order key={i} {...order} onClick={showOrderDetails}/>
                ))}


            </tbody>
        </table>    
        )
    }

function GetOrder(number){
    fetch('/orders/' + number)
    .then(response => response.json())
    .then(data => {
        ReactDOM.render(<OrdersList orders={data} title="Latest orders!!"/>,document.getElementById("orders"));

    })
};

// (async () => {
// const data = await GetOrder('all')
// console.log(data)
// })()

    // async function GetOrder(number) {
    //     let order = await fetch('/orders/' + number);
    //     let myText = await order.json();
    //  console.log(myText);
    //  return myText;
    // }

    // const GetOrder = async () => {
    //     try {
    //         let res = await fetch('/orders/30');
    //         let { results } = res.json();
    //         console.log("!!!!!!", results);
    //         } 
    //         catch (error) {
    //         console.error(error);
    //     }
    // };

    
    // console.log("!!!!data!!!!", data)
    


// ReactDOM.render(<OrdersList order={data} title="Latest orders"/>,document.getElementById("orders"));

// </script> 
//   );
}

export default Listorders