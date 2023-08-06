/* eslint-disable react/prop-types */
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';

const OrderInformation = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 0 15px;
  border-radius: 1px;
  /* background: ${({ isDragging }) =>
    isDragging ? 'rgba(255, 59, 59, 0.15)' : 'white'}; */
  background: white;
  margin-top: 15px;

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

const OrderItem = styled.div`
  padding-right: 10px;
  padding-left: 10px;
  width: 100px;
`;

// const Inputt = styled.input`
      
// `;

const OrderCard = ({ item, index }) => {
  return (
    <Draggable key={item.pk} draggableId={String(item.pk)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <OrderInformation>
            {/* <input name="myInput" type = "checkbox" value = {item.nameOfOrder} /> */}
            <OrderItem>{item.number}</OrderItem>
            <OrderItem>{item.nameOfOrder}</OrderItem>
            <OrderItem>{item.circulation}</OrderItem>
            <OrderItem>{new Date(item.created).toLocaleDateString('Ru', {
                    month: 'short',
                    day: '2-digit',
                  })}</OrderItem>

            {/* <div className="secondary-details">
              <p>
                <span>
                  {new Date(item.due_date).toLocaleDateString('en-us', {
                    month: 'short',
                    day: '2-digit',
                  })}
                </span>
              </p>
            </div> */}
          </OrderInformation>
        </div>
      )}
    </Draggable>
  );
};

export default OrderCard;

// <span className="priority">
// {item.Priority === 'High' ? (<RedArrow />) : item.Priority === 'Medium' ? (<YellowArrow />) : (<BlueArrow />)}
// </span>
// <div><CustomAvatar name={item.Assignee} isTable={false} size={16} /></div>