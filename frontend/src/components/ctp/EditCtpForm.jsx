import React from 'react';
import AuthContext from "../../context/AuthContext";
import { Formik, Form, Field } from 'formik';
import {Col, Row, Button} from 'react-bootstrap';
import * as yup from 'yup';
import UpdateCtpInfo from './UpdateCtpInfo.js'


const schema = yup.object().shape({
    orderNumber: yup.string(),
    nameOfOrder: yup.string(),
    ctp: yup.object().shape({
        plates: yup.number(),
        plates_bad: yup.number(),
        notes: yup.string(),
        plates_done_date: yup.string(),
  
        })
        
    // Добавьте другие поля валидации
});

const EditCtpForm = ({ initialValues, onSubmit, onCancel }) => {
    console.log("+!!+!+!+", initialValues)
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                <Form>
                    <Col className="mt-4 mb-2">
                    <b>№ {initialValues.orderNumber || 'Не указано'} {initialValues.nameOfOrder || ''}</b>
                </Col>
                <Row className='align-items-center'>
                    <Col sm={8}>
                        <label htmlFor="plates" className="col-form-label"  >Кол-во пластин:</label>
                    
                     </Col>
                     
                     <Col sm={4} className="ps-0">
                     <Field 
                        name="ctp.plates" 
                        id="plates"  
                        className="form-control "/>
                        {touched.plates && errors.plates && (
                            <div className="text-danger">{errors.plates}</div>
                        )}
                        </Col>
                </Row>
                <Row>
                    <Col sm={8}>    
                        <label  htmlFor="plates_bad" className="col-form-label">Брак:</label>
                    </Col>
                        
                    <Col sm={4}>
                        <Field name="ctp.plates_bad" 
                        className="form-control"
                        id="plates_bad"
                        />
                        </Col>
                        {touched.plates_bad && errors.plates_bad && (
                            <div className="text-danger">{errors.plates_bad}</div>
                        )}
                </Row>
                        <label htmlFor="ctp.notes" className="col-form-label">Примечания:</label>
                        <Field name="ctp.notes" 
                            id="ctp.notes"
                            as="textarea" 
                            className="form-control overflow-hidden"/>
                        {touched.notes && errors.notes && (
                            <div className="text-danger">{errors.notes}</div>
                        )}
                    <Row className='mb-10 mt-5'>
                        <label htmlFor="ctp.plates_done_date" className="col-form-label">Дата вывода:</label>
                        <Field 
                            name="ctp.plates_done_date"
                            id="ctp.plates_done_date"
                        />
                        {touched.plates_done_date && errors.plates_done_date && (
                            <div className="text-danger">{errors.plates_done_date}</div>
                        )}
                    </Row>
                    {/* Добавьте остальные поля */}
                    <div>
                    <Button
                        variant="secondary" 
                        type="submit"
                        size="sm">
                            Сохранить</Button>
                    <Button 
                        variant="secondary"
                        onClick={onCancel}
                        size="sm"
                        className="m-2">
                            Отмена</Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default EditCtpForm;
