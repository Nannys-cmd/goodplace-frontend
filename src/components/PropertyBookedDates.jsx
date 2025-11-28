// Frontend/src/components/PropertyBookedDates.jsx
import React, { useEffect, useState } from "react";
import { API_URL } from "../config";
import "../styles/Events.css";

export default function PropertyBookedDates({ property }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!property) return null;

  useEffect(() => {
    async function fetchBookings() {
      try {
        setLoading(true);
        setError(null);

        const url = `${API_URL}/bookings?propertyId=${property.id}`;

        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Error al cargar reservas");
        }

        // Ordenar por fecha
        const sorted = [...data].sort((a, b) => {
          const sa = new Date(a.start).getTime();
          const sb = new Date(b.start).getTime();
          return sa - sb;
        });

        setBookings(sorted);
      } catch (err) {
        setError("No se pudieron cargar las reservas internas.");
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [property.id]);

  return (
    <section className="ical-section" style={{ marginTop: "2rem" }}>
      <h3 className="section-subtitle">Fechas ocupadas por reservas internas</h3>

      {loading && <p>Cargando reservas...</p>}

      {error && (
        <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
      )}

      {!loading && !bookings.length && (
        <p className="muted">Esta propiedad no tiene reservas cargadas.</p>
      )}

      {!loading && bookings.length > 0 && (
        <div className="events-grid">
          {bookings.map((b, idx) => {
            let rango = "Sin fecha";

            try {
              const start = new Date(b.start);
              const end = new Date(b.end);

              rango = `${start.toLocaleDateString("es-AR")} - ${end.toLocaleDateString("es-AR")}`;
            } catch {}

            return (
              <div key={idx} className="event-card">
                <h4>Reserva #{b.id}</h4>
                <p className="muted">{rango}</p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
