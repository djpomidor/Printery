import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import Modal from 'react-bootstrap/Modal';
import AddOrderToScheduleForm from './AddOrderToScheduleForm.js';

const Part = (props) => {
  const { part, updateTrigger, setUpdateTrigger } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <tr>
        <td>
          <Button
            variant="light"
            className="p-0 shadow-none"
            onClick={handleShow}
          >
            <i className="bi bi-arrow-bar-left"></i>
          </Button>
        </td>
        <td>
          {part.part_name === 'BLO' ? 'Блок' : ''}
          {part.part_name === 'COV' ? 'Обложка' : ''}
          {part.part_name === 'VKL' ? 'Вклейка' : ''}
        </td>
        <td>{part.color_display}</td>
        <td>{part.paper.type_display + ', ' + part.paper.density}</td>
        <td>{part.laminate}</td>
        <td>{part.uflak}</td>
      </tr>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Поставить в график печати</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddOrderToScheduleForm
            initialValues={part}
            number={props.number}
            nameOfOrder={props.nameOfOrder}
            part_name={part.part_name}
            updateTrigger={updateTrigger}
            setUpdateTrigger={setUpdateTrigger}
            handleClose={handleClose}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

function Order(props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr
        id={props.number}
        onClick={() => setOpen(!open)}
        aria-controls={props.pk}
        aria-expanded={open}
        style={{ cursor: 'pointer' }}
      >
        <td>{props.orderNumber}</td>
        <td>
          {props.nameOfOrder}, {props.typeOfOrder}
        </td>
        <td>
          {props.width}x{props.height}
        </td>
        <td>{props.circulation}</td>
        <td>{props.delivery_date}</td>
      </tr>
      <tr>
        <td colSpan="6">
          <Collapse in={open}>
            <div id={props.pk} className="px-2 pt-2 pb-4">
              <Table hover size="sm">
                {props.parts.length !== 0 && (
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                      <th>Color</th>
                      <th>Paper</th>
                      <th></th>
                      <th>Offset Lak</th>
                      <th>Laminate</th>
                    </tr>
                  </thead>
                )}
                <tbody>
                  {props.parts.map((part, i) => (
                    <Part
                      key={i}
                      part={part}
                      number={props.number}
                      nameOfOrder={props.nameOfOrder}
                      updateTrigger={props.updateTrigger}
                      setUpdateTrigger={props.setUpdateTrigger}
                    />
                  ))}
                </tbody>
              </Table>
            </div>
          </Collapse>
        </td>
      </tr>
    </>
  );
}

export default Order;
