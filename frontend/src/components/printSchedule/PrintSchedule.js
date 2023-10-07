/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled/macro";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import OrderCard from './OrderCard';
import useAxios from "../../utils/useAxios";
import { v4 as uuidv4 } from 'uuid';
import daysOfPrint from './utils/daysOfPrint';

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
  ${Day}:nth-of-type(even) { 
    // was nth-child
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
const DateToday = styled.div`
  font-weight: 800 !important;
  color: red;
  padding: 2px 10px;
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
        try {
          const response = await api.get("/orders/printShedule/" + new window.Date().toISOString());
          const fetchedOrders = response.data;
          const fetchedColumns = daysOfPrint(fetchedOrders); // Pass fetchedOrders to the daysOfPrint function
          setState({ orders: fetchedOrders, columns: fetchedColumns });
        } catch (error) {
          setRes("Something went wrong: ", error);
          console.log('Aaalarmee!!!', res);
          console.error(error);
        }
      };
      fetchData();
    }, []);
 
  const updatePositions = async (itemId, newPosition, newColumnId) => {
    try {
      const response = await api.put(`/orders/printShedule/${itemId}_BLO/update_position/`, {
        position: newPosition,
        parent_day: newColumnId,
      });
        // Do anything with the updated item data if necessary
      // console.log(response.data);
      } catch (error) {
      // Handle errors
      console.error(error);
    }
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
      newColumns[source.droppableId].items.forEach((item, index) => {
        updatePositions(item.order_part, index, source.droppableId); 
      });
      newColumns[destination.droppableId] = { ...destColumn, items: destItems };
      newColumns[destination.droppableId].items.forEach((item, index) => {
        updatePositions(item.order_part, index, destination.droppableId);
      });

    } else {
      const column = newColumns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      newColumns[source.droppableId] = { ...column, items: copiedItems };
      newColumns[source.droppableId].items.forEach((item, index) => {
        updatePositions(item.order_part, index, source.droppableId);
      });
    }
    setState(prevState => ({
      ...prevState,
      columns: newColumns
    }));
  };
  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, state.columns, setState)}>
      <Container>
        <OrderColumnStyles> 
          {Object.entries(state.columns).map(([columnId, column], index) => {
            return (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <Day>
                    {(column.date === new window.Date().toLocaleDateString('Ru', {  
                       day: "numeric", 
                       month:"numeric", 
                       weekday:"short",
                     }))?
                    <DateToday>
                      <h1 style={{fontWeight: 'bold'}}>{(index % 2 === 0)?(column.date):''}</h1>
                      <h5>{(index % 2 === 0 )?'Сегодня':''}</h5>
                    </DateToday>:
                    <Date><h1>{(index % 2 === 0)?(column.date):''}</h1></Date>
                }
                    <DayNight><p>{(index % 2 === 0 )?('День'):('Ночь')}</p></DayNight>
                  <OrderList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div>
                    {column.items.map((item, index) => (
                      <OrderCard key={item.pk} item={item} index={index} />   // was key={item} !!
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