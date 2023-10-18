import React from "react";
import { Button, Card, Col, Row, Form } from "react-bootstrap";
import { FieldArray, Field } from "formik";
import FormTextField from "./form-field";
import FormSelectField from "./form-select-field"

function FormSectionParts({ parts }) {
  return (
    <FieldArray name="parts">
    {({ insert, remove, push }) => (
      <>
        {parts.length > 0 &&
          parts.map((part, index) => (
            <div className="mb-3 row" key={index}>
              <hr></hr>
              <div className="collapse">
                <Field
                  name={`parts.${index}.part_name`}
                  type="text"
                />
              </div>
              <div className="d-flex align-items-center">
                <h6>
                  {(part.part_name === 'BLO') ? ('Block') : ''}
                  {(part.part_name === 'COV') ? ('Cover') : ''}
                  {(part.part_name === 'INS') ? ('Insert') : ''}
                </h6>

                <button
                  type="button"
                  className="ms-auto"
                  onClick={() => remove(index)}
                >
                  <i className="bi-x"></i>
                </button>
              </div>
              {/* <Row className="mb-3"> */}
                <FormTextField
                  as={Col}
                  sm="4"
                  label="Кол-во страниц"
                  name={`parts.${index}.pages`}
                  controlId={`parts.${index}.pages`}
                  type="number"
                  error={console.log("AAAAAAAAAAAAA", parts)}
                />

                <FormSelectField
                  as={Col}
                  sm="4"
                  label="Цветность"
                  name={`parts.${index}.color`}
                  controlId={`parts.${index}.color`}
                  type="text"
                >
                  <option value="">Select...</option>
                  <option value='4_4'>4(CMYK)+4(CMYK)</option>
                  <option value='4_0'>4(CMYK)+0</option>
                  <option value='1_1'>1(Black)+1(Black)</option>
                </FormSelectField>
  
                <FormSelectField
                  as={Col}
                  sm="4"
                  label="Бумага"
                  className="form-control"
                  name={`parts.${index}.paper_id`}
                  type="number"
                >
                  <option value="">Select...</option>
                  <option value="1">Глянцевая</option>
                  <option value="2">Матовая</option>
                  <option value="3">Офсетная</option>
                  <option value="4">Картон</option>
                </FormSelectField>

              {/* <div>
                <label className="form-label" htmlFor={'parts.${index}.paper_density'}>Плотность</label>
                <Field
                  component={SelectField}
                  options={densityOptions}
                  name={`parts.${index}.paper_density`}
                />
              </div> */}

              {/* <div>
                <label className="form-label" htmlFor={'parts.${index}.paper_density'} >
                  <Field
                    className="form-control"
                    name={'parts.${index}.paper_density'}
                    type="text"
                    id={'parts.${index}.paper_density'}
                    list="paper_density" />
                </label>

                <datalist id="paper_density">
                  <option value='80'>80</option>
                  <option value='100'></option>
                  <option value='105'></option>
                  <option value='115'></option>
                  <option value='120'></option>
                  <option value='130'></option>
                  <option value='150'></option>
                  <option value='170'></option>
                  <option value='200'></option>
                  <option value='250'></option>
                  <option value='300'></option>

                </datalist>
              </div> */}
            </div>
          ))}
        <Button
          type="button"
          onClick={() => push({ part_name: '', pages: '' })}
        >
          Add Part
        </Button>
      </>
    )}
  </FieldArray>
  );
}

export default FormSectionParts;
