import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";

import { Formik } from 'formik';
import * as yup from 'yup';


const schema = yup.object().shape({
  name: yup.string().required(),
  typeOfOrder: yup.string().required(),
  circulation: yup.string().required(),
  binding: yup.string().required(),
  width: yup.string().required(),
  height: yup.string().required(),
  terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
});

function CreateOrder() {
  const [values, setValues] = useState({
    // nameOfOrder: '',
    // typeOfOrder: '',
    // circulation: '',
  //   binding: '',
  //   width: '',
  //   height: '',
  //   created: '',
  //   due_date: '',
  //   delivery_date: '',
  //   terms: false,
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("event.target---", event.target.errors)
    setValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    // isValid = "true"
  };

  const { number, nameOfOrder, owner, typeOfOrder, circulation, binding, width, height, created, due_date, delivery_date} = values;


  // const [number, setNumber] = useState("");
  // const [nameOfOrder, setNameOfOrder] = useState("");
  // const [owner, setOwner] = useState("");
  // const [type, setType] = useState("");
  // const [circulation, setCirculation] = useState("");
  // const [binding, setBinding] = useState("");
  // const [width, setWidth] = useState("");
  // const [height, setHeight] = useState("");
  // const [created, setCreated] = useState("");
  // const [due_date, setDue_date] = useState("");
  // const [delivery_date, setDelivery_date] = useState("");

  const [validated, setValidated] = useState(false);

  const [errororder, setErrorOrder] = useState();
  const [errors, setErrors] = useState();

  const addOrder = async () => {
    try {
    const response = await fetch("http://127.0.0.1:8000/api/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nameOfOrder,
        typeOfOrder,
        circulation,
        binding,
        width,
        height,
        // created,
        // due_date,
        // delivery_date
      })
    });
    const data = await response.json();
    if (response.status === 201) {
      alert("All good! status: 201");
    } else {
      alert("Something went wrong, response.status:!", response.status);
      return data;
    }    
    } catch (error) {
      console.error(error);
    } 
  };

  const handleSubmit = async e => {
    const form = e.currentTarget;
    console.log ("form ------ ", form);
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      console.log("form.checkValidity() === false", e.target)
    }
    else {
    e.preventDefault();
    const newOrder = await addOrder();
    setValidated(true);
    setErrors(newOrder)
    };
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        nameOfOrder: '',
        typeOfOrder: '',
        circulation: '',
        binding: '',
        width: '',
        height: '',
        created: '',
        due_date: '',
        delivery_date: '',
        terms: false,
      }}
    >
      {({
        // handleSubmit,
        // handleChange,
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
                value={nameOfOrder}
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
                value={typeOfOrder}
                onChange={handleChange}
                isInvalid={!!errors.typeOfOrder}
                isValid={touched.typeOfOrder && !errors.typeOfOrder}
              >
                <option value="">Select...</option>
                <option value="BK" >Book</option>
                <option value="CL">Calendar</option>
                <option value="MZ">Magazine</option>
                <option value="NP">Newspaper</option>
                <option value="FL">Flyers</option>
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
                value={circulation}
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
                value={binding}
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

            <Form.Group as={Col} md="2" controlId="validationFormik05">
              <Form.Label>Width</Form.Label>
              <Form.Control
                type="number"
                placeholder="Width"
                name="width"
                value={width}
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

            <Form.Group as={Col} md="2" controlId="validationFormik05">
              <Form.Label>Height</Form.Label>
              <Form.Control
                type="number"
                placeholder="Height"
                name="height"
                value={height}
                onChange={handleChange}
                isInvalid={!!errors.height}
              />
              <Form.Control.Feedback type="invalid">
                {errors.height}
              </Form.Control.Feedback>
            </Form.Group>
            </Row>

            <Row className="mb-3">

            </Row>
          
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