import React, { useState } from "react";
import "../styles/PropertyCard.css";

export default function PropertyCard({ property, onReserve }) {
  const [showMap, setShowMap] = useState(false);
  const toggleMap = () => setShowMap(!showMap);

  // Precio formateado en USD
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(property.price);

  return (
    <div className="card">
      <div className="image-wrapper">
        <img src={property.img} alt={property.title} />
        <div className="overlay">
          <span className={`status ${property.available ? "available" : "unavailable"}`}>
            {property.available ? "Disponible" : "No disponible"}
          </span>
          <span className="price-tag">{formattedPrice}/noche</span>
        </div>
      </div>

      <div className="card-content">
        <h3>{property.title}</h3>
        <p className="muted">{property.subtitle}</p>
        <div className="actions">
          <button className="btn reserve-btn" onClick={() => onReserve(property)}>
            Reservar
          </button>
          <button className="btn map-btn" onClick={toggleMap}>
            Ver Mapa
          </button>
        </div>
      </div>

      {/* Modal del mapa */}
      {showMap && (
        <div className="map-modal-overlay" onClick={toggleMap}>
          <div className="map-modal" onClick={e => e.stopPropagation()}>
            <iframe
              src={property.mapLink}
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: "12px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de la propiedad"
            ></iframe>
            <button className="close-map" onClick={toggleMap}>×</button>
          </div>
        </div>
      )}
    </div>
  );
}
