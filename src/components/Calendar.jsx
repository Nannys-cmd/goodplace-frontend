import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Calendar.css";

export default function CalendarComponent({ selectedDates, onDateChange }) {
  const [dates, setDates] = useState(selectedDates || [null, null]);

  useEffect(() => {
    setDates(selectedDates);
  }, [selectedDates]);

  const handleChange = (range) => {
    setDates(range);
    if (onDateChange) onDateChange(range);
  };

  return (
    <div className="calendar-wrapper">
      <div className="selected-dates">
        {dates[0] && dates[1]
          ? `Fechas elegidas: ${dates[0].toLocaleDateString()} - ${dates[1].toLocaleDateString()}`
          : "Selecciona fechas"}
      </div>
      <Calendar selectRange={true} onChange={handleChange} value={dates} />
    </div>
  );
}
