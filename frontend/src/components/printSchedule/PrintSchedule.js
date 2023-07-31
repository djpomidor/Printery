import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled/macro";
// import styled from '@emotion/styled';
import { daysOfPrint } from './Data';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import OrderCard from './OrderCard';
import useAxios from "../../utils/useAxios";

// console.log("daysOfPrint!!", daysOfPrint)

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
  //////////////////////////////
  const Getdata = () => {
    console.log('Getdata start');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();

  const [res, setRes] = useState("");
  const api = useAxios();  
     
  // useEffect(() => {
    const fetchData = async () => {
      const currentDate = "2023-07-27 15:33:28.146113";
      try {
        const response = await api.get("/orders/last-month/" + currentDate);
        console.log('response!!!', response.data);
        
        setRes(response.data.response);
        setOrders(response.data);
        console.log('orders!!!!!!!!!!!!!!!!!!!!', orders);
        console.log('response!!!_2', response.data);
        return  response.data;
        
      } catch {
        console.log('Aaalarmee!!!')
        setRes("Something went wrong");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
 
  console.log('orders! 2', orders);
  return orders;
};

  /////////////////////////////
  console.log('Getdata()! ', Getdata());
  const days = daysOfPrint(Getdata());
  console.log("___",daysOfPrint());
  console.log("_____",days);
  const [columns, setColumns] = useState(days);
  console.log("!!!!columns", columns)

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <Container>
        <OrderColumnStyles>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <Day>
                    {/* {console.log("_+_+_+_", column.items)} */}
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