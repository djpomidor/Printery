import React, { useState } from "react";
import { Button, Card, Col, Row, Form } from "react-bootstrap";
import { FieldArray, Field } from "formik";
import FormTextField from "./short-form-field";
import FormSelectField from "./short-form-select-field"
import FormNumberPartField from "./short-form-parts-number-field"
import Calendar from "../../../containers/rightpanel/calendar";
import DatePicker from "react-datepicker";
import ru from 'date-fns/locale/ru';

function FormSectionParts({ parts, errors }) {
  const [parent_day, setParent_day] = useState(new Date());
  return (
    <FieldArray name="parts">
    {({ insert, remove, push }) => (
      <>
        {parts.length > 0 &&
          parts.map((part, index) => (
            <div className="mb-3 pb-3 row" key={index} style={{backgroundColor: "beige"}}>
              <hr></hr>
              <div className="collapse">
                <Field
                  name={`parts.${index}.part_name`}
                  type="text"
                />
              </div>
              <div className="d-flex align-items-center">
                <h5>
                  {(part.part_name === 'BLO') ? ('Block') : ''}
                  {(part.part_name === 'COV') ? ('Cover') : ''}
                  {(part.part_name === 'INS') ? ('Insert') : ''}
                </h5>

                <button
                  type="button"
                  className="ms-auto"
                  onClick={() => remove(index)}
                >
                  <i className="bi-x"></i>
                </button>
              </div>
              <hr></hr>
              <Row className="mb-4">
                <Col>
                <label htmlFor={`date_of_print_${index}`} className="form-label">Дата печати:</label>
                <div className="form-control d-flex gap-2">
                <i className="bi bi-calendar-event"></i>
                <DatePicker 
                  dateFormat="dd/MM/yyyy"
                  locale={ru}
                  selected={parent_day} 
                  onChange={(date) => setParent_day(date)} 
                  icon="bi bi-calendar-event"
                  placeholderText="Select date"
                  name={`parts.${index}.printing.[0].parent_day`}
                  controlId={`parts.${index}.printing.[0].parent_day`}/>

                </div>
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
                  <option value='4_4'>4(CMYK)+4(CMYK)</option>
                  <option value='4_0'>4(CMYK)+0</option>
                  <option value='1_1'>1(Black)+1(Black)</option>
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

             
            </div>
          ))}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => push({ part_name: '', pages: '' })}
        >Add Part</Button>
          
        
      </>
    )}
  </FieldArray>
  );
}

export default FormSectionParts;
