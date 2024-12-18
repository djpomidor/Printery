import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Field } from "formik";
import { ErrorMessage } from 'formik';

const FormTextField = ({
  as,
  md,
  controlId,
  label,
  name,
  type,
  placeholder,
  error,
  inputGroupPrepend,
  disabled,
  readOnly,
  value,
  //onChange,
  //defaultValue,

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
                disabled={disabled}
                readOnly={readOnly}
                value={value}
                //onChange={onChange}
                //defaultValue={defaultValue}
              />

              <Form.Control.Feedback type="invalid">
                {form.errors[field.name]}
                {/* {form.touched[field.name] && form.errors[field.name] ? form.errors[field.name] : null} */}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        );
      }}
      </Field> 
  );
};

FormTextField.defaultProps = {
  type: "text",
  inputGroupPrepend: null
};

export default FormTextField;
