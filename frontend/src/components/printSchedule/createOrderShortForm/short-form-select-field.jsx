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
  isInvalid,
}) => {
  return (
    <Field name={name}>
      {({ field, form }) => {
        // console.log("!!_field.name_", field.name)
        // console.log("!!_form_!!_", form)
        // console.log("!form.errors[field.name]!_", form.errors[field.name])
        // const isInvalid = form.touched[field.name] && !!form.errors[field.name];
        return (
          <Form.Group as={as} md={md} controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <InputGroup>
              {inputGroupPrepend}
              <Form.Control
                {...field}
                type={type}
                isInvalid={isInvalid}
                as="select"
                defaultValue={defaultValue}
              >
                {children}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
              <ErrorMessage name={field.name}  />
                {/* {form.errors[field.name]} */}
              </Form.Control.Feedback>
            </InputGroup>
            {/* Добавляем ErrorMessage для явного отображения
            <ErrorMessage name={field.name} component="div" className="text-danger" /> */}
          </Form.Group>
        );
      }}
    </Field>
  );
};

FormSelectField.defaultProps = {
  type: "select",
  inputGroupPrepend: null,
};

export default FormSelectField;
