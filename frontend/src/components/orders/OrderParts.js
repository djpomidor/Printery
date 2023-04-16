import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import handleChange from './CreateOrder.js'

import * as yup from 'yup';
import { Formik } from 'formik';

import { useContext } from 'react';
import { CreateOrder } from './CreateOrder.js';

const OrderParts = (values, errors, handleChange) => {
  console.log('handleChange!!', handleChange);
  console.log('values!!', values);
  return (
    <Card>
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
        <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationFormik01">
              <Form.Label>Number of pages</Form.Label>
              <Form.Control
                type="text"
                name="number"
                placeholder="Short name of the product"
                value={values.number}
                onChange={handleChange}
                // isValid={touched.number && !errors.number}
                isInvalid={errors.number}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationFormik02">
              <Form.Label>Printing color</Form.Label>
              <Form.Select
                type="text"
                name="color"
                value={values.color}
                onChange={handleChange}
                isInvalid={!!errors.color}
                // isValid={touched.color && !errors.color}
              >
                <option value="">Select...</option>
                <option value='4_4'>4(CMYK)+4(CMYK)</option>
                <option value='4_0'>4(CMYK)+0</option>
                <option value='1_1'>1(Black)+1(Black)</option>
              </Form.Select>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">{errors.circulation}</Form.Control.Feedback>
            </Form.Group>
          
            <Form.Group as={Col} md="4" controlId="validationFormik03">
              <Form.Label>Paper</Form.Label>
              <Form.Select
                type="text"
                name="paper"
                value={values.paper}
                onChange={handleChange}
                isInvalid={!!errors.paper}
                // isValid={touched.paper && !errors.paper}
              >
                <option value="">Select...</option>
                <option value="BK" >Paper1</option>
                <option value="CL">Paper2</option>
                <option value="MZ">Paper3</option>
                <option value="NP">Paper4</option>
                <option value="FL">Paper5</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.circulation}
              </Form.Control.Feedback>
            </Form.Group>
          </Row> 

         
    </Card.Body>
  </Card>
  )
}

export default OrderParts