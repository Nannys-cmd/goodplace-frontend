// Frontend/src/components/PropertyCard.jsx
import React, { useState } from "react";
import "../styles/PropertyCard.css";

export default function PropertyCard({ property, onReserve }) {
  const [showMap, setShowMap] = useState(false);

  if (!property) return null;

  return (
    <div className="card">
      <div className="image-wrapper">
        <img src={property.img} alt={property.title} />
        <div className="overlay">
          <span
            className={`status ${
              property.available ? "available" : "unavailable"
            }`}
          >
            {property.available ? "Disponible" : "No disponible"}
          </span>

          {property.price && (
            <span className="price-tag">
              USD {property.price} / noche
            </span>
          )}
        </div>
      </div>

      <div className="card-content">
        <h3 className="card-title">{property.title}</h3>

        {property.subtitle && (
          <p className="card-subtitle">{property.subtitle}</p>
        )}

        {property.beds && (
          <p className="card-info">
            <strong>Camas: </strong>
            {property.beds}
          </p>
        )}

        {typeof property.capacity === "number" && (
          <p className="card-info">
            <strong>Capacidad: </strong>
            {property.capacity} huéspedes
          </p>
        )}
      </div>

      <div className="card-footer">
        <div className="actions">
          <button
            className="btn reserve-btn"
            type="button"
            disabled={!property.available}
            onClick={() => {
              if (!property.available) return;
              if (onReserve) onReserve(property);
            }}
          >
            Reservar
          </button>

          {property.mapLink && (
            <button
              className="btn map-btn"
              type="button"
              onClick={() => setShowMap(true)}
            >
              Ver mapa
            </button>
          )}
        </div>
      </div>

      {showMap && property.mapLink && (
        <div className="map-overlay" onClick={() => setShowMap(false)}>
          <div
            className="map-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-map"
              type="button"
              onClick={() => setShowMap(false)}
            >
              ×
            </button>

            <iframe
              src={property.mapLink}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title={`Mapa de ${property.title}`}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
