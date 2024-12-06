/* eslint-disable react/prop-types */
import React from 'react';
import { Draggable, } from 'react-beautiful-dnd';
import styled from '@emotion/styled';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import EditOrderShortForm from './createOrderShortForm/EditOrderShortForm'; 
import  { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const OrderInformation = styled.div`
  // border-bottom-width: 2px;
  display: flex;
  justify-content: space-between;
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
  box-shadow: 0 .2rem .5rem rgba(0, 0, 0, .1);

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

const OrderName = styled.div`
  padding-right: 10px;
  padding-left: 5px;
  min-width: 250px;
`;

const OrderItem = styled.div`
  padding-right: 10px;
  padding-left: 5px;
  white-space: nowrap;
  min-width: 70px;
`;

const OrderItemRight = styled.div`
  // padding-right: 10px;
  padding-left: 5px;
  white-space: nowrap;
  text-align: right;
  min-width: 90px;
`;

const OrderIcon = styled.div`
  padding-right: 10px;
  padding-left: 5px;
  white-space: nowrap;
  min-width: 30px;
`;

// const Inputt = styled.input`

// `;

const OrderCard = ({ item, index, machine, orders_full, updateTrigger, setUpdateTrigger, updatePositions, part, onSelectPart }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { userGroups } = useContext(AuthContext);

  return (
    <Draggable key={item.pk} 
      draggableId={String(item.pk)} 
      index={index}
      isDragDisabled={userGroups.includes("ctp_operators") || "true"}
      >
      {(provided) => (
        <div className="fs-5"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <OrderInformation className="p-2 bg-white rounded">

            <OrderIdItem>{"№ " + item.orderNumber}</OrderIdItem>
            {(item.partName === 'блок') ?
              <OrderName>{item.nameOfOrder}</OrderName> :
              <OrderName>{item.nameOfOrder + ", " + item.partName}</OrderName>
            }
            <OrderItem>{item.color}</OrderItem>
            <OrderItem>{item.printed_sheets + "п.л."}</OrderItem>
            <OrderItem>{"x" + item.circulation_sheets}</OrderItem>
            <OrderItem>{item.paper}</OrderItem>
            {/* <OrderItem>{item.paper.substr(0, 3) + '.'}</OrderItem> */}
            {userGroups.includes("ctp_operators") ? (
              <>
                <OrderItemRight>
                  <div className='badge badge-lg badge-dot'>
                  <Button
                    variant='light'
                    className='p-0 shadow-none'
                    onClick={console.log("kjsdkjdskj")}>
                      <i className="bg-danger"></i>
                  </Button>
                  <Button 
                    variant='light'
                    className='p-0 shadow-none'>
                      <i className="bg-warning"></i>
                  </Button>
                  <Button 
                    variant='light'
                    className='p-0 shadow-none'>
                      <i className="bg-success"></i>
                  </Button>
                  
                </div>
                <Button 
                    variant='light'
                    className='p-0 shadow-none'
                    onClick={() => onSelectPart(item)}>
                      <div className="align-middle">
                      <OrderIcon><i className="bi bi-info-circle" ></i></OrderIcon>
                      </div>
                  </Button>
                </OrderItemRight>
              </>
            
          ) : (
          <>
            <OrderItemRight>
              <Button
                // size='sm'
                variant='light'
                className='p-0 shadow-none'
                onClick={handleShow}
              >
                <OrderIcon><i className="bi bi-pencil-square"></i></OrderIcon>
              </Button>
            {/* </OrderItemRight>
            <OrderItemRight> */}
              <Button
                variant='light'
                className='p-0 shadow-none'
                onClick={() => {updatePositions(item.order_part, 0, ""); setUpdateTrigger(prevState => !prevState)}}
              >
                <OrderIcon><i className="bi bi-trash"></i></OrderIcon>
              </Button>
            </OrderItemRight>
            </>
          )}

            {/* <input name="myInput" type = "checkbox" value = {item.nameOfOrder} /> */}
            {/* <OrderItem>{new Date(item.created).toLocaleDateString('Ru', {
                    month: 'short',
                    day: '2-digit',
                  })}
            </OrderItem> */}
            {/* {console.log("printing!!", item.parts[0].printing[0])} */}
            {/* <OrderItem>{item.parts[0].printing[0].part_name}</OrderItem> */}

            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Редактирование заказа</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                   <EditOrderShortForm 
                        initialValues={item} 
                        machine={machine} 
                        updateTrigger={updateTrigger}
                        setUpdateTrigger={setUpdateTrigger}
                        handleClose={handleClose}
                        onSelectPart={onSelectPart}
                        />
              </Modal.Body>
              {/* <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary">Understood</Button>
              </Modal.Footer> */}
            </Modal>

          </OrderInformation>
        </div>
      )}
    </Draggable>
  );
};

export default OrderCard;
