import React from "react";
import { Button, Card, Col, Row, Form } from "react-bootstrap";
import { FieldArray, Field } from "formik";
import FormTextField from "./form-field";
import FormSelectField from "./form-select-field"
import FormNumberPartField from "./form-parts-number-field"

function FormSectionParts({ parts, errors }) {
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
                <FormNumberPartField
                  as={Col}
                  sm="4"
                  label="Кол-во страниц"
                  name={`parts.${index}.pages`}
                  controlId={`parts.${index}.pages`}
                  type="number"
                  index={index}
                  // error={console.log("!!!sdf", errors.parts[index].pages)}
                  errors={errors}
                  // error2={console.log("!!!sdf", errors.friends && errors.parts[index] && errors.parts[index].pages)}
                />
                
                <FormSelectField
                  as={Col}
                  sm="4"
                  label="Красочность"
                  name={`parts.${index}.color`}
                  controlId={`parts.${index}.color`}
                  type="text"
                  // error={console.log("!!!sdf", errors.parts[index].color)}
                >
                  <option value="">Select...</option>
                  <option value='4+4'>4(CMYK)+4(CMYK)</option>
                  <option value='4+0'>4(CMYK)+0</option>
                  <option value='1+1'>1(Black)+1(Black)</option>
                </FormSelectField>
  
                <FormSelectField
                  as={Col}
                  sm="4"
                  label="Бумага"
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

              {/* <div>
                <label className="form-label" htmlFor={'parts.${index}.paper_density'}>Плотность</label>
                <Field
                  component={SelectField}
                  options={densityOptions}
                  name={`parts.${index}.paper_density`}
                />
              </div> */}

              <div className="col">
                <label className="form-label" htmlFor={'parts.${index}.paper_density'} >Плотность (гр/м<sup>2</sup>)</label>
                  <Field
                    className="form-control"
                    name={`parts.${index}.paper.density`}
                    type="text"
                    id={`parts.${index}.paper.density`}
                    list="paper_density" />
                

                <datalist id="paper_density">
                  <option value="">Select...</option>
                  <option value='80'></option>
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
              </div>
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
