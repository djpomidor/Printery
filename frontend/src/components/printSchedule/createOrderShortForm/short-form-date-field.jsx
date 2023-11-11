import React from 'react';
import { Form, InputGroup } from "react-bootstrap";
import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';

const DatePickerField = ({ as, md, controlId, label, placeholder, field, form, ...rest }) => {
    const onChange = (date) => {
        form.setFieldValue(field.name, date);
    };

    return (
        // <Form.Group as={as} md={md} controlId={controlId}>
        //     <Form.Label>{label}</Form.Label>
            <DatePicker
                wrapperClassName="datePicker"
                dateFormat="dd.MM.yyyy"
                locale={ru}
                icon="bi bi-calendar-event"
                selected={field.value}
                placeholder={placeholder}
                onChange={onChange}
                {...rest} />
        // </Form.Group>;
    )
};

export default DatePickerField