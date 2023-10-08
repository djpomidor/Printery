/* eslint-disable no-unused-vars */
import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useFormikContext, Formik, Field, FieldArray, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { addOrder } from '../../api/orders';
import SelectField from './SelectField';

const schema = yup.object().shape({
  nameOfOrder: yup.string().required(),
  typeOfOrder: yup.string().required(),
  circulation: yup.string().required(),
  binding: yup.string().required(),
  width: yup.string().required(),
  height: yup.string().required(),
  parts: yup.array().of(
    yup.object().shape({
      part_name: yup.string(),
      pages: yup.string().required(),
      color: yup.string().required(),
      paper_id: yup.number(),
      paper_density: yup.string(),
    })
  ),
  terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
});

const densityOptions = [
  { value: '', label: 'Select...' },
  { value: '80', label: '80' },
  { value: '100', label: '100' },
  { value: '105', label: '105' },
  { value: '115', label: '115' },
  { value: '120', label: '120' },
  { value: '130', label: '130' },
  { value: '150', label: '150' },
  { value: '170', label: '170' },
  { value: '200', label: '200' },
  { value: '250', label: '250' },
  { value: '300', label: '300' },
  { value: '350', label: '350' },
];

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
            pages: '',
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
                isInvalid={!!errors.nameOfOrder}
                isValid={touched.nameOfOrder && !errors.nameOfOrder}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">{errors.nameOfOrder}</Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">{errors.typeOfOrder}</Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">{errors.circulation}</Form.Control.Feedback>
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
                      <hr></hr>
                      <div className="collapse">
                        <Field
                          name={`parts.${index}.part_name`}
                          type="text"
                        />
                      </div>
                      <div className="d-flex align-items-center">
                        <h6>
                          {(part.part_name === 'BLO') ? ('Block') : ''}
                          {(part.part_name === 'COV') ? ('Cover') : ''}
                          {(part.part_name === 'INS') ? ('Insert') : ''}
                        </h6>

                        <button
                          type="button"
                          className="ms-auto"
                          onClick={() => remove(index)}
                        >
                          <i className="bi-x"></i>
                        </button>
                      </div>
                      <div className="col-md-3">
                        <label className="form-label" htmlFor={`parts.${index}.pages`}>Pages</label>
                        <Field
                          className="form-control"
                          name={`parts.${index}.pages`}
                          id={`parts.${index}.pages`}
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
                          id={`parts.${index}.color`}
                          type="text"
                        >
                          <option value="">Select...</option>
                          <option value='4_4'>4(CMYK)+4(CMYK)</option>
                          <option value='4_0'>4(CMYK)+0</option>
                          <option value='1_1'>1(Black)+1(Black)</option>
                        </Field>
                      </div>

                      <div className="col-md-4">
                        <label className="form-label" htmlFor={`parts.${index}.paper_id`}>Paper</label>
                        <Field
                          as="select"
                          className="form-control"
                          name={`parts.${index}.paper_id`}
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
                      <div>
                        <label className="form-label" htmlFor={'parts.${index}.paper_density'}>Плотность</label>
                        <Field
                          component={SelectField}
                          options={densityOptions}
                          name={`parts.${index}.paper_density`}
                        />
                      </div>
                      <div>
                        <label className="form-label" htmlFor={'parts.${index}.paper_density'} >
                          <Field
                            className="form-control"
                            name={'parts.${index}.paper_density'}
                            type="text"
                            id={'parts.${index}.paper_density'}
                            list="paper_density" />
                        </label>

                        <datalist id="paper_density">
                          <option value='80'>80</option>
                          <option value='100'></option>
                          <option value='105'></option>
                          <option value='115'></option>
                          <option value='120'></option>
                          <option value='130'></option>
                          <option value='150'></option>
                          <option value='170'></option>
                          <option value='200'></option>
                          <option value='250'></option>
                          <option value='300'></option>

                        </datalist>
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  className="secondary"
                  onClick={() => push({ part_name: '', pages: '' })}
                >
                  Add Part
                </button>
              </>
            )}
          </FieldArray>
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
          <Button type="submit">Submit form</Button>
        </Form>
      )}
    </Formik>
  );
}

export default CreateOrder;