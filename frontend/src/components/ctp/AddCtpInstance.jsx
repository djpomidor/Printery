/* eslint-disable no-unused-vars */
import React from 'react';
import {Button, Col, Row, Form } from 'react-bootstrap';
import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext.js";
import { useFormikContext, Formik, Field, FieldArray, ErrorMessage } from 'formik';
// import AddOrderToScheduleFormSection from './addOrderToSchedule-form-section';
// import { initialValues, schema, } from './createOrderShortForm/initialValues';
// import { UpdateOrder } from './updateOrder-short';
// import updatePositions from './PrintSchedule.js'
// import { UpdateOrder } from './createOrderShortForm/updateOrder-short.js'
import {UpdateCtpInfo} from './UpdateCtpInfo.js'
import * as yup from 'yup';

const AddCtpInstance = (props) => {
  console.log("-props2-", props)
  const { user } = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState();
  
  const schema = yup.object().shape({
    plates: yup.number(),
    plates_bad: yup.number(),
    plates_done_date: yup.date(),
    notes: yup.string(),
  });

  // Создаем начальные значения из props, чтобы они отобразились в форме
  const initialValues = {
    // part_id: props.initialValues.order || "",
    part_id: 1221,
    plates: 12,
    plates_bad: 2,    
    plates_done_date: null,
    notes:""
    
  //   parts: [
  //     {
  //       id: props.initialValues.printing[0].order_part ||"",
  //       printing: [
  //         {
  //           pk: props.initialValues.printing[0].pk || "",
  //           printing_day: '',
  //           day_or_night: '',
  //           machine: ''
  //         } 
  //       ],
  //     }
  // ]
  };
  
  console.log("-initialValues-", initialValues)
  
  const onSubmit = async (values) => {
    const updateOrder =  UpdateCtpInfo(values, user);
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
          {/* <AddOrderToScheduleFormSection 
              props={props}
              handleChange={handleChange} // Передаем handleChange в дочерний компонент
          /> */}
          {/* <FormSectionParts parts={values.parts} errors={errors}/> */}
          {/* <hr></hr> */}
          <Button
                  // disabled={!isValid || isSubmitting}
                  variant="primary"
                  as="input"
                  // size="lg"
                  type="submit"
                  value="Сохранить"
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

export default AddCtpInstance;