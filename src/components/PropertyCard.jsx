// Frontend/src/components/PropertyCard.jsx
import React from "react";
import "../styles/PropertyCard.css";

export default function PropertyCard({ property, onReserve }) {
  return (
    <div className="card">
      <div className="image-wrapper">
        <img src={property.img} alt={property.title} />
        <div className="overlay">
          <span className={`status ${property.available ? "available" : "unavailable"}`}>
            {property.available ? "Disponible" : "No disponible"}
          </span>
          <span className="price-tag">USD {property.price}/noche</span>
        </div>
      </div>

      <div className="card-content">
        <h3>{property.title}</h3>
        <p className="muted">{property.subtitle}</p>

        {/* Solo botón de reserva (sin enlace a Booking) */}
        <div className="actions">
          <button
            className="btn reserve-btn"
            onClick={() => onReserve(property)}
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
}
