/* eslint-disable react/display-name */
import React from "react";
import { Col, Row, InputGroup, Form } from "react-bootstrap";
import FormTextField from "../../orders/form-field";
import FormSelectField from "../../orders/form-select-field"

export default () => {
  return (
    <>
      <Row className="mt-3 mb-3">
        <Col xs={5}>
          <FormTextField
            // as={Col}
            sm="4"
            controlId=""
            label="№ заказа"
            type="number"
            name="orderId"
            placeholder=""
          />
        </Col>
        <Col >
        <FormTextField
          // as={Col}
          sm="4"
          controlId="validationFormik02"
          label="Наименование"
          type="text"
          name="nameOfOrder"
          placeholder=""
        />
        </Col>
      </Row>
      <FormTextField
        as={Col}
        sm="4"
        controlId="validationFormik03"
        label="Тираж"
        type="number"
        name="circulation"
        placeholder="Кол-во бумаги"
      />


    </>
  );
};
