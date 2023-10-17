/* eslint-disable react/display-name */
import React from "react";
import { Col, Row, InputGroup, Form } from "react-bootstrap";
import FormTextField from "./form-field";
import FormSelectField from "./form-select-field"

export default () => {
  return (
    <>
      <Row className="mb-3">
        <FormSelectField
          as={Col}
          sm="4"
          controlId="validationFormik04"
          label="Скрепление"
          type="text"
          name="binding"
        >
          <option value="">Select...</option>
          <option value="GLU">Glue</option>
          <option value="STA">Staple</option>
          <option value="HAR">Hardcover</option>
          <option value="FOL">Folding</option>
        </FormSelectField>

        <FormTextField
          as={Col}
          sm="4"
          controlId="validationFormik05"
          label="Ширина"
          type="number"
          name="width"
        />
        <div className="text-center col-sm-auto gy-10 p-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </div>
        <FormTextField
          as={Col}
          sm="4"
          controlId="validationFormik05"
          label="Высота"
          type="number"
          name="height"
        />

      </Row>

    </>
  );
};
