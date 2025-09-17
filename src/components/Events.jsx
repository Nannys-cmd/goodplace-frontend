// Frontend/src/components/Events.jsx
import React from "react";
import "../styles/Events.css";

export default function Events({ events }) {
  return (
    <div className="events-grid">
      {events.map((e, index) => {
        let formattedDate = "Sin fecha";
        if (e.date) {
          try {
            formattedDate = new Date(e.date).toISOString().split("T")[0];
          } catch {}
        }

        return (
          <div key={index} className="event-card">
            <h4>{e.title}</h4>
            <p className="muted">{formattedDate}</p>
          </div>
        );
      })}
      <p className="muted" style={{ marginTop: 12 }}>
        En la versión final se mostrará la disponibilidad real de reservas y feriados.
      </p>
    </div>
  );
}
