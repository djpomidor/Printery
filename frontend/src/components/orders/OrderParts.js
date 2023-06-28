import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import handleChange from './CreateOrder.js'

import * as yup from 'yup';
import { Formik, Field, FieldArray } from 'formik';

import { useContext } from 'react';
import { CreateOrder } from './CreateOrder.js';

const OrderParts = (props) => {
  // console.log("!!", props.aaa)
  return (
    <Card key={props.aaa}>
    <Card.Body>
      <Card.Title>{props.title}</Card.Title>
      
      <Form.Group className="mb-3">
        <Form.Control 
          
          id={props.title.toLowerCase().replace(/ /g, "-")}
          onChange={props.handleChange}
          type="text"
          name={props.part_name[props.index]}
          value={props.part_name[props.index]}
          // defaultValue={props.part_name}
          // readOnly
          // isValid='True'
          // disabled 
          />
      </Form.Group>
        
        <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationFormik01">
              <Form.Label>Number of pages</Form.Label>
              <Field
                type="number"
                name={props.part_name + '_pages'}
                placeholder="Number of pages"
                value={props.values.pages}
                onChange={props.handleChange}
                // isValid={props.touched.BLO_pages && !props.BLO_errors.pages}
                // isInvalid={props.errors.BLO_pages}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationFormik02">
              <Form.Label>Printing color</Form.Label>
              <Form.Select
                type="text"
                name={props.part_name + "_color"}
                value={props.values.color}
                onChange={props.handleChange}
                // isInvalid={!!props.errors.color}
                // isValid={touched.color && !errors.color}
              >
                <option value="">Select...</option>
                <option value='4_4'>4(CMYK)+4(CMYK)</option>
                <option value='4_0'>4(CMYK)+0</option>
                <option value='1_1'>1(Black)+1(Black)</option>
              </Form.Select>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">{props.errors.color}</Form.Control.Feedback>
            </Form.Group>
          
            <Form.Group as={Col} md="4" controlId="validationFormik03">
              <Form.Label>Paper</Form.Label>
              <Form.Select
                type="text"
                name={props.part_name + "_paper"}
                value={props.values.paper}
                onChange={props.handleChange}
                // isInvalid={!!props.errors.paper}
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
                {props.errors.paper}
              </Form.Control.Feedback>
            </Form.Group>
          </Row> 

         
    </Card.Body>
  </Card>
  )
}

export default OrderParts