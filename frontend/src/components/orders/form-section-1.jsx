/* eslint-disable react/display-name */
import React from "react";
import { Col, Row, InputGroup, Form } from "react-bootstrap";
import FormTextField from "./form-field";
import FormSelectField from "./form-select-field"

export default () => {
  return (
    <>
    <Row className="mb-3">
      <FormTextField
        as={Col}
        sm="4"
        controlId="validationFormik01"
        label="Наименование заказа"
        type="text"
        name="nameOfOrder"
        placeholder=""
      />
      
      <FormSelectField
        as={Col}
        sm="4"
        controlId="validationFormik02"
        label="Описание"
        type="text"
        name="typeOfOrder"
      >
        <option value="">Select...</option>
        <option value="BK">Книга</option>
        <option value="CL">Календарь</option>
        <option value="MZ">Журнал</option>
        <option value="NP">Газета</option>
        <option value="FL">Флаер</option>
        <option value="POS">Плакат</option>
        <option value="INS">Инструкция</option>
      </FormSelectField>

      <FormTextField
        as={Col}
        sm="4"
        controlId="validationFormik03"
        label="Тираж"
        type="number"
        name="circulation"
        placeholder="Кол-во экземпляров"
      />  
    </Row>

    </>
  );
};
