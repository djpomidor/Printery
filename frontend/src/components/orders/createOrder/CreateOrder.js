/* eslint-disable no-unused-vars */
import React from 'react';
import {Button, Col, Row, Form } from 'react-bootstrap';
import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { useFormikContext, Formik, Field, FieldArray, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { addOrder } from './addOrder';
import SelectField from './SelectField';
import FormSection1 from './form-section-1';
import FormSection2 from './form-section-2';
import FormSectionParts from './form-section-parts';
import XmlToJsonParser from './XmlToJsonParser.jsx';
import Collapse from 'react-bootstrap/Collapse';
import {initialValues} from "./initialValues";


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
  // terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
});

const inilValues = initialValues;
const CreateOrder = () => {
  const { user } = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState();
  const [open, setOpen] = useState(false);
 
  const [initialValues, setInitialValues] = useState(inilValues);

  function deepMerge(target, source) {
    if (Array.isArray(source)) {
      // Если source — массив, то объединяем его с target (или заменяем, если target пуст)
      return source.map((item, index) => {
        if (typeof item === 'object') {
          // Сливаем элементы массивов, если они объекты
          return deepMerge(target[index] || {}, item);
        }
        // Иначе заменяем элемент
        return item;
      });
    }
  
    // Если target и source — объекты, выполняем рекурсивное слияние
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!target[key]) target[key] = {}; // Если ключ отсутствует, создаем объект
        target[key] = deepMerge(target[key], source[key]);
      } else {
        // Заменяем значение
        target[key] = source[key];
      }
    }
  
    return target;
  }
  

    // Функция для обновления состояния родителя
    const handleInitialValues = (value) => {
      const json1 = initialValues;
      const json2 = value;
      // const merged = deepMerge(initialValues, value);
      // console.log(JSON.stringify(merged, null, 2));
      
      const merged = deepMerge({}, json1);
      deepMerge(merged, json2);
      setInitialValues(merged);
      console.log("Данные от ребенка:", merged);
    };
  
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
      initialValues={initialValues}
      enableReinitialize={true}
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
        <>
        <div className="mb-5">
           <Button 
            variant="outline-secondary"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}> импортировать из XML файла
          </Button>
        </div >  
        <Collapse in={open}>
        <div id="example-collapse-text">
          <XmlToJsonParser sendInitialValues={handleInitialValues} />
        </div>
      </Collapse>

        <Form noValidate onSubmit={handleSubmit}>
          <FormSection1 />
          <FormSection2 />
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
        </>
      )}
    </Formik>
  );
}

export default CreateOrder;