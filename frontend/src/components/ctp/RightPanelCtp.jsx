import React from 'react'
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Button, Col, Row } from 'react-bootstrap'
import Collapse from 'react-bootstrap/Collapse';

import CreateOrderShortForm from '../printSchedule/createOrderShortForm/CreateOrderShortForm';
import GetFilteredOrders from '../printSchedule/GetFilteredOrders'
import PartDetails from './PartDetails';

const RightPanelCtp = (props) => {
  console.log("-!-!-!_props", props)
  
  const [open, setOpen] = useState(false)
  return (
    <div className="col-lg-2">
      <div className="card position-sticky top-40">
        <div className="card-body pb-0">
          <h6 className="mb-4">Детали заказа</h6>
          <hr className="mt-4 mb-0"></hr>
          <PartDetails
            partDetails = {props.part}
            >

          </PartDetails>
            {/* <Row>

              <Button
                onClick={() => setOpen(!open)}
                aria-controls='collapse-form'
                aria-expanded={open}
              >
                Добавить
              </Button>
              <Collapse in={open}>
                <div id="collapse-form">
                  <CreateOrderShortForm setUpdateTrigger={props.setUpdateTrigger} />
                </div>
              </Collapse>
            </Row>
          <hr className="mt-4 mb-0" />
          <Row>
          <GetFilteredOrders updateTrigger={props.updateTrigger} setUpdateTrigger={props.setUpdateTrigger}/>
          </Row> */}


        </div>
      </div>
    </div>
  )
}

export default RightPanelCtp