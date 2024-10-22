/* eslint-disable no-unused-vars */
import React from 'react';
import {Button, Col, Row, Form } from 'react-bootstrap';
import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { useFormikContext, Formik, Field, FieldArray, ErrorMessage } from 'formik';
import { addOrder } from './addOrder-short';
import FormSection from './short-form-section';
import FormSectionParts from './short-form-section-parts';
import { schema, initialValues } from './initialValues';

const CreateOrderShortForm = (props) => {
  const { user } = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState();

  const onSubmit = async (values, { resetForm }) => {
    const newOrder = await addOrder(values, user, props);
    setValidated(true);
    setErrors(newOrder);
    console.log("!@#$__", errors)
    resetForm();
  };

  // const name_of_parts = [['Block', 'BLO'], ['Cover', 'COV'], ['insert', 'INS']]
  
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
        <Form noValidate onSubmit={handleSubmit}>
          <FormSection />
          <FormSectionParts parts={values.parts} errors={errors}/>
          <hr></hr>
          {/* <Form.Group className="mb-3">
            <Form.Check
              required
              name="terms"
              label="Agree to terms and conditions"
              onChange={handleChange}
              isInvalid={!!errors.terms}
              feedback={errors.terms}
              feedbackType="invalid"
              id="validationFormik0"
            />
          </Form.Group> */}
          <Button
                  // disabled={!isValid || isSubmitting}
                  variant="primary"
                  as="input"
                  // size="lg"
                  type="submit"
                  value="Добавить заказ"
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

export default CreateOrderShortForm;