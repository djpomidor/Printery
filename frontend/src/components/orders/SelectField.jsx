import React from 'react';
import Select from 'react-select';

const SelectField = ({ options, field, form }) => {
  const handleChange = (value) => {
    form.setFieldValue(field.name, value.value);
  };

  const handleBlur = () => {
    form.setFieldTouched(field.name, true);
  };

  return (
    <Select
      options={options}
      name={field.name}
      value={options ? options.find(option => option.value === field.value) : ''}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default SelectField;