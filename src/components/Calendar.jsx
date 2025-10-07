// Frontend/src/components/Calendar.jsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Calendar.css";

export default function CalendarComponent({ events = [], onDateChange }) {
  const [selectedDates, setSelectedDates] = useState([null, null]);

  const handleChange = (dates) => {
    setSelectedDates(dates);
    if (onDateChange) onDateChange(dates);
  };

  // Colorea días según si hay eventos (opcional)
  const tileClassName = ({ date }) => {
    if (!events) return "";
    const day = date.toISOString().split("T")[0];
    const event = events.find((e) => e.date === day);
    return event ? "evento-dia" : "";
  };

  // Punto o tooltip para los eventos (opcional)
  const tileContent = ({ date }) => {
    if (!events) return null;
    const event = events.find((e) => e.date === date.toISOString().split("T")[0]);
    return event ? <div className="event-dot" title={event.title}>•</div> : null;
  };

  return (
    <div className="calendar-wrapper">
      <div className="selected-dates">
        {selectedDates[0] && selectedDates[1]
          ? `Fechas elegidas: ${selectedDates[0].toLocaleDateString()} - ${selectedDates[1].toLocaleDateString()}`
          : "Selecciona fechas"}
      </div>
      <Calendar
        selectRange={true}
        onChange={handleChange}
        value={selectedDates}
        tileClassName={tileClassName}
        tileContent={tileContent}
      />
    </div>
  );

}
