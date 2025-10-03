import React from "react";
import "../styles/Events.css";

export default function Events({ events = [] }) {
  if (!events.length) {
    return <p style={{ textAlign: "center" }}>No hay eventos disponibles.</p>;
  }

  return (
    <div className="events-grid">
      {events.map((e, index) => {
        let formattedDate = "Sin fecha";
        if (e?.date) {
          try {
            formattedDate = new Date(e.date).toISOString().split("T")[0];
          } catch {}
        }

        return (
          <div key={index} className="event-card">
            <h4>{e?.title || "Evento sin título"}</h4>
            <p className="muted">{formattedDate}</p>
          </div>
        );
      })}
      <p className="muted" style={{ marginTop: 12 }}>

      </p>
    </div>
  );
}
