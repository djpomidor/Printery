import React from 'react'
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Button, Col, Row } from 'react-bootstrap'
import Collapse from 'react-bootstrap/Collapse';

import CreateOrderShortForm from './createOrderShortForm/CreateOrderShortForm';
import GetFilteredOrders from './GetFilteredOrders'

const RightPanel = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className="col-lg-4">
      <div className="card position-sticky top-32">
        <div className="card-body pb-0">
          <h6 className="mb-4">Заказы</h6>
          <hr className="mt-4 mb-0"></hr>
          <Container>
            <Row>

              <Button
                onClick={() => setOpen(!open)}
                aria-controls='collapse-form'
                aria-expanded={open}
              >
                Добавить
              </Button>
              <Collapse in={open}>
                <div id="example-collapse-text">
                <CreateOrderShortForm>

                </CreateOrderShortForm>
                </div>
              </Collapse>
            </Row>
          </Container>
          <hr className="mt-4 mb-0" />
          <Row>
            <GetFilteredOrders />
          </Row>


        </div>
      </div>
    </div>
  )
}

export default RightPanel