/* eslint-disable react/display-name */
import React from "react";
import { Col, Row, InputGroup, Form } from "react-bootstrap";
import FormTextField from "../../orders/form-field";
import FormSelectField from "../../orders/form-select-field"

export default () => {
  return (
    <>
    <Row className="mb-3">
      <FormTextField
        as={Col}
        sm="4"
        controlId="validationFormik01"
        label="Наименование"
        type="text"
        name="nameOfOrder"
        placeholder=""
      />
      
      <FormTextField
        as={Col}
        sm="4"
        controlId="validationFormik03"
        label="Тираж"
        type="number"
        name="circulation"
        placeholder="Кол-во бумаги"
      />  
    </Row>

    </>
  );
};
