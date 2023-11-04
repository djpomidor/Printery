import React, { useState } from "react";
import DatePicker from "react-datepicker";
import ru from 'date-fns/locale/ru';

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
    className="form-control form-control-flush text-sm text-muted font-semibold flatpickr-input"
    // showIcon 
    dateFormat="dd/MM/yyyy"
    locale={ru}
    selected={startDate} 
    onChange={(date) => setStartDate(date)} 
    icon="bi bi-calendar-event"
    placeholderText="Select date"
    />
  );
};

export default Calendar;