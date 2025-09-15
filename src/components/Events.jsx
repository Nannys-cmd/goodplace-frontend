// Events.jsx
import React from "react";
import "../styles/Events.css";

export default function Events({ events }) {
  return (
    <div className="events-grid">
      {events.map((e, index) => (
        <div key={index} className="event-card">
          <h4>{e.title}</h4>
          <p className="muted">{e.date}</p>
        </div>
      ))}
      <p className="muted" style={{ marginTop: 12 }}>
        En la versión final se podrá integrar un calendario público con eventos locales.
      </p>
    </div>
  );
}
