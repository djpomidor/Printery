/* eslint-disable react/display-name */
import React from "react";
import { Col, Row, InputGroup, Form } from "react-bootstrap";
import FormTextField from "./short-form-field";
import FormNumberField from "./short-form-field";
import FormSelectField from "./short-form-select-field"
import FormNumberPartField from "./short-form-field"

const ShortEditFormSection = (props) => {
  const index = 0;
  const values = props.props.initialValues;
  console.log("!!!!1", props);
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
            name="orderId"
            placeholder=""
            disabled="disabled"
            readOnly="readOnly"
            value={values.number}
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
            placeholder={values.nameOfOrder}
          // value={props.props.initialValues.nameOfOrder}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <FormSelectField
          sm="4"
          controlId="validationFormik03"
          label="Печатная машина"
          type="text"
          // name={`parts.${index}.printing.[0].machine`}
          name="machine"
          // placeholder={props.props.machine}
          defaultValue={props.props.machine}
        >
          <option value={props.props.machine}>{props.props.machine}</option>
          <option value='1'>SM-1</option>
          <option value='2'>SM-2</option>
          <option value='3'>Rapida</option>
        </FormSelectField>
      </Row>
      <Row className="mb-4">
        <FormSelectField
          as={Col}
          sm="6"
          label="Красочность:"
          name={`parts.${index}.color`}
          controlId={`parts.${index}.color`}
          type="text"
        >
          <option value={values.color}>{values.color}</option>
          <option value='4_4'>4+4</option>
          <option value='4_0'>4+0</option>
          <option value='1_1'>1+1</option>
        </FormSelectField>

        <FormNumberPartField
          as={Col}
          sm="6"
          label="Печ. листы:"
          name={`parts.${index}.printing.[0].printed_sheets`}
          controlId={`parts.${index}.printing.[0].printed_sheets`}
          type="number"
          index={index}
        // errors={errors}
        />
      </Row>
      <Row>
        <FormNumberPartField
          as={Col}
          sm="6"
          label="Тираж:"
          name={`parts.${index}.printing.[0].circulation_sheets`}
          controlId={`parts.${index}.printing.[0].circulation_sheets`}
          type="number"
          index={index}
        // errors={errors}
        />
        <FormSelectField
          as={Col}
          sm="6"
          label="Бумага:"
          className="form-control"
          name={`parts.${index}.paper.type`}
          type="text"
        >
          <option value="">Select...</option>
          <option value="GL">Глянцевая</option>
          <option value="MAT">Матовая</option>
          <option value="OFF">Офсетная</option>
          <option value="CAR">Картон</option>
        </FormSelectField>
      </Row>
    </>
  );
};

export default ShortEditFormSection;
