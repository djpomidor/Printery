/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled/macro";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import OrderCard from './OrderCard';
import useAxios from "../../utils/useAxios";
import { v4 as uuidv4 } from 'uuid';

const Container = styled.div`
  display: flex;
`;
const OrderList = styled.div`
  min-height: 50px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 800px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 45px;
  height: fit-content;
`;
const Day = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: baseline;
  border-radius: 5px;
  background: #f3f3f3d1;
  
`;
const OrderColumnStyles = styled.div`
  margin: 8px;
  // display: flex;
  // width: 100%;
  min-height: 80vh;
  ${Day}:nth-child(even) {
    margin-bottom: 20px;
  }
`;
const Date = styled.div`
  // color: #10957d;
  // background: rgba(16, 149, 125, 0.15);
  padding: 2px 10px;
  // border-radius: 5px;
  // align-self: flex-start;
  // min-width: 20vh;
  // max-width: 100px;
  width:23vh;
`;
 const DayNight = styled.div`
  margin-right: 10px
`;

const PrintSchedule = () => {
  const [state, setState] = useState({ orders: [], columns: {} });
  const api = useAxios();
  const [res, setRes] = useState("");
     
    useEffect(() => {
      const fetchData = async () => {
        // const d = new window.Date().toISOString();
        try {
          const response = await api.get("/orders/last-month/" + new window.Date().toISOString());
          const fetchedOrders = response.data;
          const fetchedColumns = daysOfPrint(fetchedOrders); // Pass fetchedOrders to the daysOfPrint function
          setState({ orders: fetchedOrders, columns: fetchedColumns });
        } catch (error) {
          setRes("Something went wrong");
          console.log('Aaalarmee!!!', res);
          console.error(error);
        }
      };
      fetchData();
    }, []);
 
  const daysGenerator = () => {
    let dates = [];
    [...Array(8).keys()].map(index => {
    const d = new window.Date();
    d.setDate((d.getDate() - 2) + index);
    let day = d.toLocaleDateString('Ru', {  
      day: "numeric", 
      month:"numeric", 
      weekday:"short",
    });
    dates.push(day);
    return dates.push(day);
  });
  return dates;
  };

  const daysOfPrint = (items) => {
    // Pass fetchedOrders (items) as an argument
    console.log("items",items)
    const obj = {};
    const days = daysGenerator();
    const currendDay = new window.Date();
    for (const [index, key] of days.entries()) {
      let temp;
      for (const [i, order] of items.entries()){
        const dateStr = order.created;
        const jsDate = new window.Date(order.created.replace(' ', 'T', 'Z'));
        
        // console.log("!@#$%2222", jsDate)
        
        temp = jsDate.toLocaleDateString('Ru', {day: "numeric",month:"numeric",weekday:"short",   })
        // console.log("!@#$%", temp)
      }
      console.log("!__temp", temp)
      obj[uuidv4()] = {
        date: key,
        timeofday: index % 2 === 0 ? "day" : "night",
        items: key === new window.Date().toLocaleDateString('Ru', {day: "numeric",month:"numeric",weekday:"short",   }) && index % 2 === 0 ? items : [],
      };
    
  }
  console.log("!__obj", obj)
    return obj;
  };

  const onDragEnd = (result, columns, setState) => {

    if (!result.destination) return;
    const { source, destination } = result;
  
    const newColumns = { ...columns };
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = newColumns[source.droppableId];
      const destColumn = newColumns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      newColumns[source.droppableId] = { ...sourceColumn, items: sourceItems };
      newColumns[destination.droppableId] = { ...destColumn, items: destItems };
    } else {
      const column = newColumns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      newColumns[source.droppableId] = { ...column, items: copiedItems };
    }
  
    setState(prevState => ({
      ...prevState,
      columns: newColumns
    }));
    console.log("!__result", result)
    console.log("!__columns2", state.columns)
    

  };
  return (

    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, state.columns, setState)}
    >
      <Container>
        {    console.log("!__columns2", state.columns)}
        <OrderColumnStyles>
          {Object.entries(state.columns).map(([columnId, column], index) => {
            return (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <Day>
                    {/* {console.log("_+_+_+_snapshot", snapshot)} */}
                    <Date><h1>{(index % 2 === 0)?(column.date):''}</h1></Date>
                    <DayNight><p>{(index % 2 === 0 )?('День'):('Ночь')}</p></DayNight>
                  <OrderList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    
                    <div>
                    {column.items.map((item, index) => (
                      <OrderCard key={index} item={item} index={index} />   // was key={item} !!
                    ))}
                    {provided.placeholder}
                    </div>
                  </OrderList>
                  </Day>
                )}
              </Droppable>
            );
          })}
        </OrderColumnStyles>
      </Container>
    </DragDropContext>
  );
};

export default PrintSchedule;