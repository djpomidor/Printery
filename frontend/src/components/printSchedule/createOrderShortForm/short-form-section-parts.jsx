import React, { useState } from "react";
import { Button, Card, Col, Row, Form } from "react-bootstrap";
import { FieldArray, Field } from "formik";
import FormTextField from "./short-form-field";
import FormSelectField from "./short-form-select-field"
import FormNumberPartField from "./short-form-field"
import DatePickerField from "./short-form-date-field";
import Accordion from 'react-bootstrap/Accordion';
import CloseButton from 'react-bootstrap/CloseButton';

function FormSectionParts({ parts, errors }) {
  return (
    <FieldArray name="parts">
      {({ insert, remove, push }) => (
        <>
          {parts.length > 0 &&
            parts.map((part, index) => (
              <Accordion className="mb-3" key={index} defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey={index}>
                  <div key={index} >
                    <div className="d-flex align-items-center">
                      <Accordion.Header>
                        <h5>
                          {(part.part_name === 'BLO') ? ('Блок') : ''}
                          {(part.part_name === 'COV') ? ('Обложка') : ''}
                          {(part.part_name === 'INS') ? ('Вклейка') : ''}
                          {(part.part_name === 'FRZ') ? ('Форзац') : ''}
                          </h5>
                          {(part.part_name === '') ? 
                            <FormSelectField
                              controlId={`parts.${index}.part_name`}
                              name={`parts.${index}.part_name`}
                              type="text"
                            >
                              <option value='BLO'>Блок</option>
                              <option value='COV'>Обложка</option>
                              <option value='INS'>Вклейка</option>
                              <option value='FRZ'>Форзац</option>
                              

                            </FormSelectField> : ''}
                        
                      </Accordion.Header>
                      <Button 
                        variant="light"
                        // size="sm"
                        className="px-4 ms-auto shadow-none" 
                        onClick={() => remove(index)} >
                        <i className="bi bi-trash"></i>
                      </Button>

                    </div>
                    <Accordion.Body>
                      <Row className="mb-4">
                        <FormSelectField
                          sm="4"
                          controlId={`parts.${index}.printing.[0].machine`}
                          label="Печатная машина"
                          type="text"
                          name={`parts.${index}.printing.[0].machine`}
                          placeholder=""
                        >
                          <option value='1'>SM-1</option>
                          <option value='2'>SM-2</option>
                          <option value='3'>Rapida</option>
                        </FormSelectField>
                      </Row>
                      <Row className="mb-4">
                        <Col>
                          <label htmlFor={`parts.${index}.printing.[0].printing_day`} className="form-label">Дата печати:</label><br></br>
                          <Field
                            className="form-control"
                            id={`date_of_print_${index}`}
                            placeholderText="Выберите дату"
                            name={`parts.${index}.printing.[0].printing_day`}
                            autoComplete="off"
                            component={DatePickerField} />
                        </Col>
                        <Col>
                          <FormSelectField
                            sm="6"
                            controlId={`parts.${index}.printing.[0].day_or_night`}
                            label="День/ночь"
                            type="text"
                            name={`parts.${index}.printing.[0].day_or_night`}
                            placeholder=""
                          >
                            <option value=''>...</option>
                            <option value='day'>День</option>
                            <option value='night'>Ночь</option>
                          </FormSelectField>
                        </Col>
                      </Row>
                      <Row className="mb-4">
                        <FormSelectField
                          as={Col}
                          sm="6"
                          label="Красочность:"
                          name={`parts.${index}.color`}
                          controlId={`parts.${index}.color`}
                          type="text"
                        >
                          <option value="">Select...</option>
                          <option value='4+4'>4+4</option>
                          <option value='4+0'>4+0</option>
                          <option value='1+1'>1+1</option>
                          <option value='1+0'>1+0</option>
                        </FormSelectField>

                        <FormNumberPartField
                          as={Col}
                          sm="6"
                          label="Печ. листы:"
                          name={`parts.${index}.printing.[0].printed_sheets`}
                          controlId={`parts.${index}.printing.[0].printed_sheets`}
                          type="number"
                          index={index}
                          errors={errors}
                        />
                      </Row>
                      <Row>
                        <FormNumberPartField
                          as={Col}
                          sm="6"
                          label="Тираж:"
                          name={`parts.${index}.printing.[0].circulation_sheets`}
                          controlId={`parts.${index}.printing.[0].circulation_sheets`}
                          type="number"
                          index={index}
                          errors={errors}
                        />
                        <FormSelectField
                          as={Col}
                          sm="6"
                          label="Бумага:"
                          className="form-control"
                          name={`parts.${index}.paper.type`}
                          type="text"
                        >
                          <option value="">Select...</option>
                          <option value="GL">Глянцевая</option>
                          <option value="MAT">Матовая</option>
                          <option value="OFF">Офсетная</option>
                          <option value="CAR">Картон</option>
                        </FormSelectField>
                      </Row>
                    </Accordion.Body>
                  </div>
                </Accordion.Item>
              </Accordion>
            ))}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => push({
              part_name: '',
              pages: 0,
              color: '',
              paper: {
                name: "",
                type: "",
                density: 0,
                width: 0,
                height: 0
              },
              printing: [
                {
                  printed_sheets: 0,
                  circulation_sheets: 0,
                  parent_day: '',
                  printing_day: "",
                  day_or_night: "day",
                  machine: '1',
                }
              ]
            })}
          >+ бумага </Button>
        </>
      )}
    </FieldArray>
  );
}

export default FormSectionParts;
