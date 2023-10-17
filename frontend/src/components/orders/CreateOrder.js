/* eslint-disable no-unused-vars */
import React from 'react';
import {Button, Col, Row, Form } from 'react-bootstrap';
import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useFormikContext, Formik, Field, FieldArray, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { addOrder } from './addOrder';
import SelectField from './SelectField';
import FormSection1 from './form-section-1';
import FormSection2 from './form-section-2';
import FormSectionParts from './form-section-parts';


const schema = yup.object().shape({
  nameOfOrder: yup.string().required(),
  typeOfOrder: yup.string().required(),
  circulation: yup.string().required(),
  binding: yup.string().required(),
  width: yup.string().required(),
  height: yup.string().required(),
  parts: yup.array().of(
    yup.object().shape({
      part_name: yup.string().required(),
      pages: yup.number(),
      color: yup.string(),
      paper_id: yup.number(),
      paper_density: yup.string(),
    })
  ),
  terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
});

const CreateOrder = () => {
  const { user } = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState();

  const onSubmit = async (values) => {
    const newOrder = await addOrder(values, user);
    setValidated(true);
    setErrors(newOrder)
  };

  const name_of_parts = [['Block', 'BLO'], ['Cover', 'COV'], ['insert', 'INS']]

  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={{
        nameOfOrder: '',
        typeOfOrder: '',
        circulation: '',
        binding: '',
        width: '',
        height: '',
        parts: [
          {
            part_name: 'BLO',
            pages: 1,
            color: '',
            paper: '',
            paper_density: '',
          },
          {
            part_name: 'COV',
            pages: '',
            color: '',
            paper: '',
            paper_density: '',
          },
          {
            part_name: 'INS',
            pages: '',
            color: '',
            paper: '',
            paper_density: '',
          },
        ],
        created: '',
        terms: false,
      }}
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
          <FormSection1 />
          <FormSection2 />
          <FormSectionParts parts={values.parts} errors={errors}/>
          <hr></hr>
          <Form.Group className="mb-3">
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
          </Form.Group>
          <Button
                  // disabled={!isValid || isSubmitting}
                  variant="primary"
                  as="input"
                  // size="lg"
                  type="submit"
                  value="Submit"
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

export default CreateOrder;