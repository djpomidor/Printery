/* eslint-disable react/prop-types */
import React from 'react';
import { Draggable, } from 'react-beautiful-dnd';
import styled from '@emotion/styled';

const OrderInformation = styled.div`
  border-bottom-width: 2px;
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  padding: 0 15px;
  border-radius: 1px;
  background: ${({ isDragging }) =>
    isDragging ? 'rgba(255, 59, 59, 0.15)' : 'white'};
  // background: white;
  margin-top: 10px;
  margin-left: 16px;
  padding-left:0px;
  padding-top: 5px;
  padding-bottom: 5px;

  .secondary-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 12px;
    font-weight: 400px;
    color: #7d7d7d;
  }
  /* .priority{ */
  /* margin-right: 12px; */
  /* align-self: center;
    svg{
      width: 12px !important;
      height: 12px !important;
      margin-right: 12px; */
  /* margin-top: 2px; */
  /* } */
  /* } */
`;

const OrderIdItem = styled.div`
  padding-right: 10px;
  padding-left: 5px;
  min-width: 95px;
`;
const OrderItem = styled.div`
  padding-right: 10px;
  padding-left: 5px;
  min-width: 100px;
  white-space: nowrap;
`;
// const Inputt = styled.input`

// `;

const OrderCard = ({ item, index }) => {
  return (
    <Draggable key={item.pk} draggableId={String(item.pk)} index={index}>
      {(provided) => (
        <div class="fs-5"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <OrderInformation>
            
            <OrderIdItem>{"с/з " + item.number}</OrderIdItem>
            {(item.partName == 'блок')?
            <OrderItem>{item.nameOfOrder}</OrderItem>:
            <OrderItem>{item.nameOfOrder + ", " + item.partName}</OrderItem>
            }
            <OrderItem>{item.printed_sheets + "п.л."}</OrderItem>
            <OrderItem>{"x" + item.circulation_sheets}</OrderItem>
            <OrderItem>{item.paper.substr(0,3)+'.'}</OrderItem>
            {/* <input name="myInput" type = "checkbox" value = {item.nameOfOrder} /> */}
            {/* <OrderItem>{new Date(item.created).toLocaleDateString('Ru', {
                    month: 'short',
                    day: '2-digit',
                  })}
            </OrderItem> */}
            {/* {console.log("printing!!", item.parts[0].printing[0])} */}
            {/* <OrderItem>{item.parts[0].printing[0].part_name}</OrderItem> */}
          </OrderInformation>
        </div>
      )}
    </Draggable>
  );
};

export default OrderCard;
