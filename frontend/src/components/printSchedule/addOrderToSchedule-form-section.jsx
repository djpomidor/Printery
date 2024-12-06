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
  const { errors, touched } = useFormikContext();
  const { values } = useFormikContext(); // Достаем значения и контекст из Formik
  return (
    <>
      <Row className="mt-3 mb-3">
        <h3>№ {props.number}  {props.nameOfOrder}, {props.part_name}</h3>
      </Row>

      {/* <Col>
      <Field
        name={`parts.${index}.printing.[0].printing_day`}
        component={DatePickerField}
        placeholder="Выберите дату"
      />
      </Col> */}


      {/* <Col>
      <Field 
        name="parts.${index}.printing.[0].printing_day" 
        component={DatePickerField} 
        autoComplete="off"
        placeholderText="Выберите дату"
        >
          {({ field }) => (
            <Form.Group controlId="printing_day">
              <Form.Label>Дата печати:</Form.Label>
              <Form.Control
                {...field}

                isInvalid={touched.parts?.[0]?.printing?.[0]?.printing_day && !!errors.parts?.[0]?.printing?.[0]?.printing_day}
              >
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.parts?.[0]?.printing?.[0]?.printing_day}
              </Form.Control.Feedback>
            </Form.Group>
          )}
      </Field>      
      </Col> */}
      
      <Row className="mb-4">
        <label htmlFor={`parts.${index}.printing.[0].printing_day`} className="form-label">Дата печати:</label><br></br>
        <Field
          // className="form-control"
          // id={`date_of_print_${index}`}
          controlId={`parts.${index}.printing.[0].printing_day`}
          placeholderText="Выберите дату"
          name={`parts.${index}.printing.[0].printing_day`}
          autoComplete="off"
          isInvalid={touched.parts?.[0]?.printing?.[0]?.printing_day && !!errors.parts?.[0]?.printing?.[0]?.printing_day}
          component={DatePickerField} />
      </Row> 

      {/* <Col>
      <Field name="parts.0.printing.0.day_or_night">
        {({ field }) => (
          <Form.Group controlId="day_or_night">
            <Form.Label>День/Ночь</Form.Label>
            <Form.Control
              {...field}
              as="select"
              isInvalid={touched.parts?.[0]?.printing?.[0]?.day_or_night && !!errors.parts?.[0]?.printing?.[0]?.day_or_night}
            >
              <option value="">...</option>
              <option value="day">День</option>
              <option value="night">Ночь</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.parts?.[0]?.printing?.[0]?.day_or_night}
            </Form.Control.Feedback>
          </Form.Group>
        )}
      </Field>  
      </Col> */}
      <Row className="mb-4">
        <FormSelectField
          sm="6"
          controlId={`parts.${index}.printing.[0].day_or_night`}
          label="День/ночь"
          type="text"
          name={`parts.${index}.printing.[0].day_or_night`}
          onChange={handleChange}
          isInvalid={touched.parts?.[0]?.printing?.[0]?.day_or_night && !!errors.parts?.[0]?.printing?.[0]?.day_or_night}
        >
          <option value=''></option>
          <option value='day'>День</option>
          <option value='night'>Ночь</option>
        </FormSelectField>      
      </Row>

      <Row className="mb-4">
        <FormSelectField  //Печатная машина
          sm="4"
          controlId={`parts.${index}.printing.[0].machine`}
          label="Печатная машина"
          type="text"
          name={`parts.${index}.printing.[0].machine`}
          errors={errors}
          onChange={handleChange}
          isInvalid={touched.parts?.[0]?.printing?.[0]?.machine && !!errors.parts?.[0]?.printing?.[0]?.machine}
        >
          <option value=''></option>
          <option value='1'>СМ-1</option>
          <option value='2'>СМ-2</option>
          <option value='3'>Рапида</option>
        </FormSelectField>
      </Row>
    </>
  );
};

export default AddOrderToScheduleFormSection;
