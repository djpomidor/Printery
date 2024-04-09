/* eslint-disable no-unused-vars */
import React from 'react';
import {Button, Col, Row, Form } from 'react-bootstrap';
import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { useFormikContext, Formik, Field, FieldArray, ErrorMessage } from 'formik';
import { addOrder } from './addOrder-short';
import ShortEditFormSection from './short-edit-form-section';
import { schema, } from './initialValues';
import FormSectionParts from './short-form-section-parts'
import { UpdateOrder } from './updateOrder-short';
import GetInitialValues from './GetInitialValues';

const EditOrderShortForm = (props, machine) => {
  console.log("---__---", machine)
  const { user } = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState();

  const onSubmit = async (values) => {
    const newOrder = await UpdateOrder(values, user, props);
    setValidated(true);
    setErrors(newOrder);
    console.log("!@#$__", errors)
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={GetInitialValues}
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
          <ShortEditFormSection props={props}></ShortEditFormSection>
          {/* <FormSectionParts parts={values.parts} errors={errors}/> */}
          <hr></hr>
          <Button
                  // disabled={!isValid || isSubmitting}
                  variant="primary"
                  as="input"
                  // size="lg"
                  type="submit"
                  value="Добавить заказ"
                />
  
          {/* <Col>
                <pre style={{ margin: "0 auto" }}>
                  {JSON.stringify(
                    { ...values, ...errors, isValid, isSubmitting },
                    null,
                    2
                  )}
                </pre>
              </Col>            */}

        </Form>
      )}
    </Formik>
  );
}

export default EditOrderShortForm;