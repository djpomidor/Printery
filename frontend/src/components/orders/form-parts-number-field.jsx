import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Field } from "formik";
import { ErrorMessage } from 'formik';

const FormNumberPartField = ({
  as,
  md,
  controlId,
  label,
  name,
  type,
  placeholder,
  errors,
  index,
  inputGroupPrepend
}) => {
  return (
    <Field name={name} >
      {({ field, form }) => {
        const isValid = !form.errors[field.name];
        const isInvalid = form.touched[field.name] && !isValid;
        return (
          <Form.Group as={as} md={md} controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <InputGroup>
              {inputGroupPrepend}
              <Form.Control
                {...field}
                type={type}
                placeholder={placeholder}
                isValid={form.touched[field.name] && isValid}
                isInvalid={isInvalid}
                feedback={form.errors[field.name]}
              />

               
{/* {console.log("LLL",form.errors.parts[field])}  */}

<Form.Control.Feedback type="invalid">
  {errors.parts && errors.parts[index] && errors.parts[index].pages}
</Form.Control.Feedback>

            </InputGroup>
          </Form.Group>
        );
      }}
      </Field> 
  );
};

FormNumberPartField.defaultProps = {
  type: "number",
  inputGroupPrepend: null
};

export default FormNumberPartField;
