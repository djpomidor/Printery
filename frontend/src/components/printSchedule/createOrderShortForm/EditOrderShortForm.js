/* eslint-disable no-unused-vars */
import React from 'react';
import {Button, Col, Row, Form } from 'react-bootstrap';
import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { useFormikContext, Formik, Field, FieldArray, ErrorMessage } from 'formik';
import { addOrder } from './addOrder-short';
import ShortEditFormSection from './short-edit-form-section';
import { initialValues, schema, } from './initialValues';
import FormSectionParts from './short-form-section-parts'
import { UpdateOrder } from './updateOrder-short';
import GetInitialValues from './GetInitialValues';

const EditOrderShortForm = (props) => {
  console.log("-props-", props)
  const { user } = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState();

  // Создаем начальные значения из props, чтобы они отобразились в форме
  const initialValues = {
    orderId: props.initialValues.orderId,
    number: props.initialValues.number || '',
    nameOfOrder: props.initialValues.nameOfOrder || '',  // Если нет значения, будет пустая строка
    machine: props.machine,
    parts: [
      {
        id: props.initialValues.order_part,
        color: props.initialValues.color,
        paper: 
          {
            type: props.initialValues.paper_value,
            density: props.initialValues.paper_density,
          },
        printing: [
          {
            pk: props.initialValues.pk,
            printed_sheets: props.initialValues.printed_sheets,
            circulation_sheets: props.initialValues.circulation_sheets
          } 
        ],
          
      }
  ]

    // Добавьте остальные поля, которые вам нужны
  };
  
  console.log("-initialValues-", initialValues)
  
  const onSubmit = async (values) => {
    const updateOrder =  UpdateOrder(values, user);
    setValidated(true);
    setErrors(updateOrder);
    console.log("!update_errors$__", errors)
    props.handleClose(true)
    props.setUpdateTrigger(prevState => !prevState)
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
        isSubmitting,
      }) => (
        <Form noValidate onSubmit={handleSubmit} >
          <ShortEditFormSection 
              props={props}
              handleChange={handleChange} // Передаем handleChange в дочерний компонент
          />
          {/* <FormSectionParts parts={values.parts} errors={errors}/> */}
          <hr></hr>
          <Button
                  // disabled={!isValid || isSubmitting}
                  variant="primary"
                  as="input"
                  // size="lg"
                  type="submit"
                  value="Сохранить"
                />
  
          <Col>
                <pre style={{ margin: "0 auto" }}>
                  {JSON.stringify(
                    { ...values, ...errors, isValid, isSubmitting },
                    null,
                    2
                  )}
                </pre>
              </Col>           

        </Form>
      )}
    </Formik>
  );
}

export default EditOrderShortForm;