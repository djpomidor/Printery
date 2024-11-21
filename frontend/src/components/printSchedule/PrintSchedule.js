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
  background: #fff;
  // min-width: 800px;
  // border-radius: 5px;
  padding: 15px 15px;
  // margin-right: 45px;
  height: fit-content;
  text-overflow: ellipsis;
`;
const Day = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: baseline;
  // border-radius: 5px;
  background-color: #fff;
  min-width: 120px;
  
`;
const OrderColumnStyles = styled.div`
  ${Day}:nth-of-type(odd) {
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
    padding-left: 1.25rem;
    padding-top: 1.25rem;
    padding-right: 1.25rem;
    // border-bottom-width: 3px;
  }
  // margin: 8px;
  // display: flex;
  width: 100%;
  min-height: 80vh;
  ${Day}:nth-of-type(even) { 
    // was nth-child
    margin-bottom: 20px;
    border-bottom-left-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
    border: 0 solid #eceef3;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    padding-bottom: 1.5rem;    
    box-shadow: 0 3px 3px -1px rgba(10, 22, 70, 0.1), 0 0 1px 0 rgba(10, 22, 70, 0.06);

  }
`;
const Date = styled.div`
  // color: #10957d;
  // background: rgba(16, 149, 125, 0.15);
  // padding: 2px 10px;
  // border-radius: 5px;
  // align-self: flex-start;
  // min-width: 20vh;
  // max-width: 100px;
  // width:21vh;
  min-width: 18vh;
`;
const DateToday = styled.div`
  font-weight: 800 !important;
  color: #ff4e4e;
  padding: 2px 0px;
  width:21vh;
  min-width: 18vh;
`;
 const DayNight = styled.div`
  margin-left: 15px;
  margin-right: 10px;
  font-weight: 700;
`;
const DayNightList = styled.div`
  border-top-width: 2px;
  border-right-width: 2px;
  border-bottom-width: 2px;
  border-left-width: 2px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-top: 10px;
  border-radius: 10px;
  margin-bottom: 5px;
  width: 100%;
`;

const PrintSchedule = (props) => {
  const [state, setState] = useState({ orders: [], columns: {}, orders_full: [] });
  const api = useAxios();
  const [res, setRes] = useState("");
     
    useEffect(() => {
      const fetchData = async () => {
        try {
          var today = new window.Date();
          var beforeYesterday = new window.Date(today);
          beforeYesterday.setDate(today.getDate() - 14);
          const response = await api.get(`/orders/print-shedule/${beforeYesterday.toISOString().substring(0,10)}`);
          const orders_full = response.data;
          const fetchedOrders = response.data;
          console.log("!$!$!$!$", response.data)
          
          const fetchedColumns = daysOfPrint(fetchedOrders, props.machine); // Pass fetchedOrders to the daysOfPrint function
          setState({ orders: fetchedOrders, columns: fetchedColumns, orders_full: orders_full });
          
        } catch (error) {
          setRes("Something went wrong: ", error);
          console.log('Aaalarmee!!!', res);
          console.error(error);
        }
      };
      fetchData();
    }, [props.machine, props.updateTrigger]);  // Добавление machine в список зависимостей
 
  const updatePositions = async (itemId, newPosition, newColumnId) => {
    try {
      const response = await api.put(`/orders/print-shedule/${itemId}-update_position/`, {
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
  
  const onDragEnd = (result, columns, setState, orders_full) => {
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
      columns: newColumns,
      // orders_full: orders_full,
    }));
  };

  // console.log("!!!", orders)
  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, state.columns, setState)} direction="vertical">
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
                    <DayNightList>
                    <DayNight><h4>{(index % 2 === 0 )?('День'):('Ночь')}</h4></DayNight>
                  <OrderList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div>
                    {column.items.map((item, index, orders_full) => (
                      <OrderCard 
                        key={item.pk} 
                        item={item} 
                        index={index} 
                        machine={props.machine} 
                        orders_full={orders_full}
                        updateTrigger={props.updateTrigger}
                        setUpdateTrigger={props.setUpdateTrigger}
                        updatePositions={updatePositions}
                        />   // was key={item} !!
                    ))}
                    {provided.placeholder}
                    </div>
                  </OrderList>
                  </DayNightList>
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