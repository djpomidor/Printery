/* eslint-disable no-unused-vars */
import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import { useHistory } from "react-router-dom";


import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import OrderParts from './OrderParts';

import { useFormikContext, Formik, Field, FieldArray, ErrorMessage } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
  nameOfOrder: yup.string(),
  typeOfOrder: yup.string().required(),
  circulation: yup.string().required(),
  binding: yup.string().required(),
  width: yup.string(),
  height: yup.string(),
  parts: yup.array().of(
    yup.object().shape({
      part_name: yup.string(),
      pages: yup.string(),
      color: yup.string(),
      paper: yup.number(),
    })
  ),
  terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
});

const CreateOrder = () => {
  const { user } = useContext(AuthContext);
  // console.log("user.pk---", user.user_id);
  const [validated, setValidated] = useState(false);
  const [errororder, setErrorOrder] = useState();
  const [errors, setErrors] = useState();

  const addOrder = async (values, user) => {
    console.log("!!!!!!!__", values)
    // const { number, nameOfOrder, typeOfOrder, circulation, binding, width, height, order, part_name, pages, paper, color, laminate, uflak, created, due_date, delivery_date} = props;
    values.owner = [user.user_id]
    

    //   values.parts.map((part, index) => {
    //     // console.log("values--!", part);
    //     // if (part.pages==0) {
    //     //   values.parts.splice(index);
    //     //   // console.log("values--!", part.part_name);
    //     // }
    // })
    values.parts = values.parts.filter(function (part) {
      part.paper = parseInt(part.paper)
      return part.pages != 0;
    });


    try {
      const response = await fetch("http://127.0.0.1:8000/api/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values, null, 2
          // nameOfOrder,
          // typeOfOrder,
          // circulation,
          // binding,
          // width,
          // height,
          // owner,
          // parts:[{order, part_name, pages, paper, color, laminate, uflak }],
          // created,
          // due_date,
          // delivery_date
        )
      });
      const data = await response.json();
      if (response.status === 201) {
        alert("All good! status: 201");
        console.log("___--", data);
        // window.location.reload();
      } else {
        alert("Something went wrong, response.status:!", response.status);
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (values) => {
    const newOrder = await addOrder(values, user);
    setValidated(true);
    setErrors(newOrder)
  };

  // const parts = ['Block','Cover','Insert']
  const name_of_parts = [['Block', 'BLO'], ['Cover', 'COV'], ['insert', 'INS']]

  return (
    <Formik
      validationSchema={schema}
      // onSubmit={async (values) => {
      //   await new Promise((r) => setTimeout(r, 500));
      //   alert(JSON.stringify(values, null, 2));
      // }}
      onSubmit={onSubmit}
      initialValues={{
        nameOfOrder: '',
        typeOfOrder: '',
        circulation: '',
        binding: '',
        width: '',
        height: '',
        // parts: ['Block', 'Cover', 'Insert'],
        parts: [
          {
            part_name: 'BLO',
            pages: '',
            color: '',
            paper: '',
          },
          {
            part_name: 'COV',
            pages: '',
            color: '',
            paper: '',
          },
          {
            part_name: 'INS',
            pages: '',
            color: '',
            paper: '',
          },
        ],
        created: '',
        // due_date: '',
        // delivery_date: '',
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
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationFormik01">
              <Form.Label>Order name</Form.Label>
              <Form.Control
                type="text"
                name="nameOfOrder"
                placeholder="Short name of the product"
                value={values.nameOfOrder}
                onChange={handleChange}
                isValid={touched.nameOfOrder && !errors.nameOfOrder}
                isInvalid={errors.nameOfOrder}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationFormik02">
              <Form.Label>Type</Form.Label>
              <Form.Select
                type="text"
                name="typeOfOrder"
                value={values.typeOfOrder}
                onChange={handleChange}
                isInvalid={!!errors.typeOfOrder}
                isValid={touched.typeOfOrder && !errors.typeOfOrder}
              >
                <option value="">Select...</option>
                <option value="BK">Книга</option>
                <option value="CL">Календарь</option>
                <option value="MZ">Журнал</option>
                <option value="NP">Газета</option>
                <option value="FL">Флаер</option>
                <option value="POS">Плакат</option>
                <option value="INS">Инструкция</option>

              </Form.Select>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">{errors.circulation}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationFormik03">
              <Form.Label>Circulation</Form.Label>
              <Form.Control
                type="number"
                placeholder="Circulation"
                name="circulation"
                value={values.circulation}
                onChange={handleChange}
                isInvalid={!!errors.circulation}
              />
              <Form.Control.Feedback type="invalid">
                {errors.circulation}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationFormik04">
              <Form.Label>Binding</Form.Label>
              <Form.Select
                type="text"
                name="binding"
                placeholder="Binding style"
                value={values.binding}
                onChange={handleChange}
                isValid={touched.binding && !errors.binding}
                isInvalid={!!errors.binding}
              >
                <option value="">Select...</option>
                <option value="GLU">Glue</option>
                <option value="STA">Staple</option>
                <option value="HAR">Hardcover</option>
                <option value="FOL">Folding</option>
              </Form.Select>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {errors.binding}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationFormik05">
              <Form.Label>Width</Form.Label>
              <Form.Control
                type="number"
                placeholder="Width"
                name="width"
                value={values.width}
                onChange={handleChange}
                isInvalid={!!errors.width}
              />
              <Form.Control.Feedback type="invalid">
                {errors.width}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="text-center col-sm-auto gy-10 p-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </div>
            <Form.Group as={Col} md="3" controlId="validationFormik06">
              <Form.Label>Height</Form.Label>
              <Form.Control
                type="number"
                placeholder="Height"
                name="height"
                value={values.height}
                onChange={handleChange}
                isInvalid={!!errors.height}
              />
              <Form.Control.Feedback type="invalid">
                {errors.height}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <FieldArray name="parts">
            {({ insert, remove, push }) => (
              <>
                {values.parts.length > 0 &&
                  values.parts.map((part, index) => (
                    <div className="mb-3 row" key={index}>
                      <div className="collapse">
                        <Field
                          name={`parts.${index}.part_name`}
                          type="text"
                        />
                      </div>
                      <h6>
                        {(part.part_name === 'BLO') ? ('Block') : ''}
                        {(part.part_name === 'COV') ? ('Cover') : ''}
                        {(part.part_name === 'INS') ? ('Insert') : ''}
                      </h6>
                      <div className="col-md-3">
                        <label className="form-label" htmlFor={`parts.${index}.pages`}>Pages</label>
                        <Field
                          className="form-control"
                          name={`parts.${index}.pages`}
                          placeholder="100"
                          type="number"
                        />
                      </div>

                      <div className="col-md-5">
                        <label className="form-label" htmlFor={`parts.${index}.color`}>Color</label>
                        <Field
                          as="select"
                          className="form-control"
                          name={`parts.${index}.color`}
                          type="text"
                        >
                          <option value="">Select...</option>
                          <option value='4_4'>4(CMYK)+4(CMYK)</option>
                          <option value='4_0'>4(CMYK)+0</option>
                          <option value='1_1'>1(Black)+1(Black)</option>
                        </Field>
                      </div>

                      <div className="col-md-4">
                        <label className="form-label" htmlFor={`parts.${index}.paper`}>Paper</label>
                        <Field
                          as="select"
                          className="form-control"
                          name={`parts.${index}.paper`}
                          type="number"
                        >
                          <option value="">Select...</option>
                          <option value="1">Глянцевая</option>
                          <option value="2">Матовая</option>
                          <option value="3">Офсетная</option>
                          <option value="4">Картон</option>
                        </Field>
                      </div>

                      <ErrorMessage
                        name={`parts.${index}.name`}
                        component="div"
                        className="field-error"
                      />


                      {/* <div className="col">
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
                      </div> */}
                    </div>
                  ))}
                {/* <button
                  type="button"
                  className="secondary"
                  onClick={() => push({ part_name: '', pages: '' })}
                >
                  Add Friend
                </button> */}
              </>
            )}
          </FieldArray>



          {/* {  values.parts.map((part, i) => (
              <OrderParts index={i} part_name={['BLO', 'COV', 'INS']} key={i} title={part} errors={errors} values={values} handleChange={handleChange}></OrderParts>
          ))} */}



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
          <Button type="submit">Submit form</Button>
        </Form>
      )}
    </Formik>
  );
}

export default CreateOrder;