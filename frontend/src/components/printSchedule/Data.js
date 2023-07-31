import { v4 as uuidv4 } from 'uuid';
import {Getdata} from './PrintSchedule';
import { useEffect, useState } from "react";
import useAxios from "../../utils/useAxios";

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    pk: `${k}`,
    id: `id-${k}`,
    number: `item ${k}`,
    name: "name",
    number_of_lists: "number_of_lists",
    tirage: "tirage",
    color: "color",
    paper: "paper"
  }));

// // const Getdata = () =>  {
//     console.log('Start Getdata_!')
//   // const [orders, setOrders] = useState([]);
//   // const [error, setError] = useState();

//   // const [res, setRes] = useState("");
//   // const api = useAxios();  
//   console.log('Start Getdata_!!')   
//   // useEffect(() => {
//     async function Getdata() {
//       const currentDate = "2023-07-27 15:33:28.146113";
//       try {
//         const response = await fetch("/orders/last-month/" + currentDate);
//         console.log('response!!!', response.data);
//         // setRes(response.data.response);
//         // setOrders(response.data);
//         const orderData = await response.json();
//         console.log("orderData! ",orderData);
        
//       } catch {
//         console.log('Aaalarmee!!!')
//         // setRes("Something went wrong");
//       }
//     // };
//     // fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, []);
  // console.log('Start Getdata_!!!')
  // return orderData;
// };
// export default Getdata;

// export const data = [
//   {
//     number: '1',
//     nameOfOrder: 'Книга',

//   },
//   {
//     pk: '2',
//     nameOfOrder: 'Fix Styling',
//     // Assigned_To: 'Dave',
//     // Assignee: 'Romona',
//     // Status: 'To-do',
//     // Priority: 'Low',
//     due_date: '26-May-2020',
//   },
//   {
//     pk: '3',
//     nameOfOrder: 'Handle Door Specs',
//     // Assigned_To: 'Roman',
//     // Assignee: 'Romona',
//     // Status: 'To-do',
//     // Priority: 'Low',
//     due_date: '27-May-2020',
//   },
//   {
//     pk: '4',
//     nameOfOrder: 'morbi',
//     // Assigned_To: 'Gawen',
//     // Assignee: 'Kai',
//     // Status: 'Done',
//     // Priority: 'High',
//     due_date: '23-Aug-2020',
//   },
//   {
//     pk: '5',
//     nameOfOrder: 'proin',
//     // Assigned_To: 'Bondon',
//     // Assignee: 'Antoinette',
//     // Status: 'In Progress',
//     // Priority: 'Medium',
//     due_date: '05-Jan-2021',
//   },
// ];

const daysGenerator = () => {
  let dates = [];
  [...Array(14).keys()].map(index => {
  const date = new Date();
  date.setDate((date.getDate() - 7) + index);
  let d = date.toLocaleDateString('Ru', {  
    day: "numeric", 
    month:"numeric", 
    weekday:"short",
  });
  dates.push(d);
  return dates.push(d);
});
return dates;
};

// https://stackoverflow.com/questions/42974735/create-object-from-array


  // const items = [{
  //       pk: '1',
  //       nameOfOrder: 'Книга',
    
  //     },
  //     {
  //       pk: '2',
  //       nameOfOrder: 'Книга2',
    
  //     },]

  export const daysOfPrint = (data)=> {
  console.log("111", data);
  const items = data;

  console.log("222", items);
  const obj = {};
  const days = daysGenerator();
  const curentDate = new Date();
  for (const [index, key] of days.entries()) {
      obj[uuidv4()] = {
        date: key,
        timeofday: (index % 2 === 0)? "day":"night",
        // items: (key === "вт, 25.07" && index % 2 === 0)?<Getdata draggableId={index} />:[],
        items: (key === "вт, 25.07" && index % 2 === 0)?items:[],
        // items: items,
      };
  };
  return obj;
};
console.log("!!! daysOfPrint_", daysOfPrint())



// export const daysOfPrint_ = {
//   [uuidv4()]: {
//     date: getDayPrint("01/01/2023"),
//     items: data,
//   },
//   [uuidv4()]: {
//     date: 'We, 23.09',
//     items: [],
//   },
//   [uuidv4()]: {
//     date: getDayPrint(),
//     items: [],
//   },
//   [uuidv4()]: {
//     date: 'Fr, 25.09',
//     items: [],
//   },
//   [uuidv4()]: {
//     date: c,
//     items: [],
//   },
//   [uuidv4()]: {
//     date: 'Fr, 25.09',
//     items: [],
//   },  
// };