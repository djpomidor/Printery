/* eslint-disable react/display-name */
import React from "react";
import { Col, Row, InputGroup, Form } from "react-bootstrap";
import FormTextField from "./createOrderShortForm/short-form-field.jsx";
import FormNumberField from "./createOrderShortForm/short-form-field.jsx";
import FormSelectField from "./createOrderShortForm/short-form-select-field.jsx"
// import FormNumberPartField from "./printSchedule/short-form-field"
import { FieldArray, Field } from "formik";
import DatePickerField from "./createOrderShortForm/short-form-date-field";
import { useFormikContext } from 'formik';

const AddOrderToScheduleFormSection = ( {props, handleChange }) => {
  const index = 0;
  
  const { values } = useFormikContext(); // Достаем значения и контекст из Formik
  console.log("!jhfjhfjh__", props)
  return (
    <>
      <Row className="mt-3 mb-3">

          <h1>с/з № {props.number}  {props.nameOfOrder}, {props.part_name}</h1>
          {/* <FormNumberField  //№ заказа
            sm="5"
            controlId="validationFormik01"
            label="№ заказа"
            type="number"
            name="orderId"
            placeholder=""
            disabled={true}
            value={props.number}
            //readOnly={true}
          /> */}

        
        {/* <Col xs={6}>
          <FormTextField  //Наименование
            sm="5"
            controlId="validationFormik02"
            label="Наименование"
            type="text"
            name="nameOfOrder"
            disabled={true}
            //placeholder={values.nameOfOrder}
            // value={values.nameOfOrder} // контролируемое значение
            // onChange={handleChange} // добавляем обработчик для изменения значения
          />
        </Col> */}
          


      </Row>

      <Col>
        <label htmlFor={`parts.${index}.printing.[0].printing_day`} className="form-label">Дата печати:</label><br></br>
        <Field
          className="form-control"
          id={`date_of_print_${index}`}
          placeholderText="Выберите дату"
          name={`parts.${index}.printing.[0].printing_day`}
          autoComplete="off"
          component={DatePickerField} />
      </Col>

      <FormSelectField
          sm="6"
          controlId={`parts.${index}.printing.[0].day_or_night`}
          label="День/ночь"
          type="text"
          name={`parts.${index}.printing.[0].day_or_night`}
          placeholder=""
        >
          <option value=''>...</option>
          <option value='day'>День</option>
          <option value='night'>Ночь</option>
        </FormSelectField>

      <Row className="mb-4">
        <FormSelectField  //Печатная машина
          sm="4"
          controlId={`parts.${index}.printing.[0].machine`}
          label="Печатная машина"
          type="text"
          name={`parts.${index}.printing.[0].machine`}
          //name="machine"
          //defaultValue={values.machine}
          //value={values.machine} 
          onChange={handleChange}
        >
          {/* <option value={values.machine}>{values.machine}</option> */}
          <option value=''>...Выберете</option>
          <option value='1'>СМ-1</option>
          <option value='2'>СМ-2</option>
          <option value='3'>Рапида</option>
        </FormSelectField>
      </Row>
      <Row className="mb-4">

      </Row>
      <Row>

      </Row>
    </>
  );
};

export default AddOrderToScheduleFormSection;
