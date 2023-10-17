/* eslint-disable react/prop-types */
import React from 'react';
import CreatableSelect from 'react-select';

const densityOptions = [
  { value: '', label: 'Select...' },
  { value: '80', label: '80' },
  { value: '100', label: '100' },
  { value: '105', label: '105' },
  { value: '115', label: '115' },
  { value: '120', label: '120' },
  { value: '130', label: '130' },
  { value: '150', label: '150' },
  { value: '170', label: '170' },
  { value: '200', label: '200' },
  { value: '250', label: '250' },
  { value: '300', label: '300' },
  { value: '350', label: '350' },
];


const SelectField = ({ options, field, form }) => {
  const handleChange = (value) => {
    form.setFieldValue(field.name, value.value);
  };

  const handleBlur = () => {
    form.setFieldTouched(field.name, true);
  };

  return (
    <CreatableSelect
      isClearable
      options={options}
      name={field.name}
      value={options ? options.find(option => option.value === field.value) : ''}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default SelectField;