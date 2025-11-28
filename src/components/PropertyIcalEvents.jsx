// Frontend/src/components/PropertyIcalEvents.jsx
import React, { useEffect, useState } from "react";
import { API_URL } from "../config";
import "../styles/Events.css";

export default function PropertyIcalEvents({ property }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!property) return null;

  useEffect(() => {
    async function loadIcal() {
      if (!property.icalUrl) {
        setEvents([]);
        return;
      }

      try {
        setLoading(true);
        const url = `${API_URL}/calendar?url=${encodeURIComponent(
          property.icalUrl
        )}`;

        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Error");

        const sorted = [...data].sort((a, b) => {
          return (
            new Date(a.start).getTime() -
            new Date(b.start).getTime()
          );
        });

        setEvents(sorted);
      } catch (err) {
        setError("No se pudo cargar el calendario externo.");
      } finally {
        setLoading(false);
      }
    }

    loadIcal();
  }, [property.id, property.icalUrl]);

  return (
    <section className="ical-section" style={{ marginTop: "2rem" }}>
      <h3 className="section-subtitle">
        Fechas ocupadas según calendario externo (iCal)
      </h3>

      {!property.icalUrl && (
        <p className="muted">
          Esta propiedad no tiene un calendario iCal asociado.
        </p>
      )}

      {loading && <p>Cargando iCal...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !events.length && property.icalUrl && (
        <p className="muted">Sin eventos en el iCal externo.</p>
      )}

      {!loading && events.length > 0 && (
        <div className="events-grid">
          {events.map((ev, idx) => {
            const start = new Date(ev.start);
            const end = new Date(ev.end);

            const rango = `${start.toLocaleDateString(
              "es-AR"
            )} - ${end.toLocaleDateString("es-AR")}`;

            return (
              <div key={idx} className="event-card">
                <h4>{ev.title || "Reserva externa"}</h4>
                <p className="muted">{rango}</p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
