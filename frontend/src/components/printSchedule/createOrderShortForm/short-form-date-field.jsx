import React from 'react';
import DatePicker from 'react-datepicker';
import { Form } from "react-bootstrap";
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import { Field, ErrorMessage } from "formik";
import "../../../css/flatpickr.css"


const DatePickerField = ({ field, form, placeholder, isInvalid, ...rest }) => {
    const error = form.errors[field.name];
    const touched = form.touched[field.name];
    // const isInvalid = touched && !!error;
    // console.log("------isInvalid----------", isInvalid)
    // console.log("------rest----------", rest)
    // console.log("------error----------", error)

    const onChange = (date) => {
        form.setFieldValue(field.name, date);
    };

    return (
        <Form.Group>
            <DatePicker
                wrapperClassName={`datePicker ${isInvalid ? 'is-invalid' : ''}`}
                dateFormat="dd.MM.yyyy"
                locale={ru}
                selected={field.value || null} // Если значение пустое, устанавливаем null
                placeholderText={placeholder}
                onChange={onChange}
                className={`form-control ${isInvalid ? 'is-invalid' : ''}`} // Bootstrap классы для стиля ошибок
                {...rest}
            />
            {isInvalid && (
                <div className="invalid-feedback"><ErrorMessage name={field.name}/></div>
            )}
              {/* <Form.Control.Feedback type="invalid">
              <ErrorMessage name={field.name}/> */}
                {/* {form.errors[field.name]} */}
              {/* </Form.Control.Feedback> */}
            {/* </InputGroup> */}
            {/* Добавляем ErrorMessage для явного отображения */}
            {/* <ErrorMessage name={field.name} component="div" className="text-danger" />             */}
        </Form.Group>
    );
};

export default DatePickerField;
