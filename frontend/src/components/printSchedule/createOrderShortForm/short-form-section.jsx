/* eslint-disable react/display-name */
import React from "react";
import { Col, Row, InputGroup, Form } from "react-bootstrap";
import FormTextField from "./short-form-field";
import FormNumberField from "./short-form-field";

export default () => {
  return (
    <>
      <Row className="mt-3 mb-3">
        <Col xs={5} className="my-custom-col">
          <FormNumberField
            // as={Col}
            sm="4"
            controlId="validationFormik01"
            label="№ заказа"
            type="number"
            name="orderNumber"
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
    </>
  );
};
