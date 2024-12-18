import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Field, ErrorMessage } from "formik";

const FormSelectField = ({
  as,
  md,
  controlId,
  label,
  name,
  type,
  inputGroupPrepend,
  children,
  defaultValue,
  errors,
}) => {
  return (
    <Field name={name}>
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
                isValid={form.touched[field.name] && !form.errors[field.name]}
                isInvalid={form.touched[field.name] && !!form.errors[field.name]}
                feedback={form.errors[field.name]}
                as="select"
                defaultValue={defaultValue}
              >
                {children}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {/* {form.errors[field.name]} */}
                <ErrorMessage name={field.name} />
                {/* {errors[field.name]} */}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        );
      }}
      </Field>
  );
};

FormSelectField.defaultProps = {
  type: "select",
  inputGroupPrepend: null
};

export default FormSelectField;
