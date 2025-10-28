// Frontend/src/components/PropertyCard.jsx
// Frontend/src/components/PropertyCard.jsx
import React, { useState } from "react";
import "../styles/PropertyCard.css";

export default function PropertyCard({ property }) {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="card">
      <div className="image-wrapper">
        <img src={property.img} alt={property.title} />
        <div className="overlay">
          <span className={`status ${property.available ? "available" : "unavailable"}`}>
            {property.available ? "Disponible" : "No disponible"}
          </span>
          <span className="price-tag">${property.price}</span>
        </div>
      </div>

      <div className="card-content">
        <h3>{property.title}</h3>
        <p className="muted">{property.subtitle}</p>

        <div className="actions">
          <button className="btn reserve-btn">Reservar</button>
          <button className="btn map-btn" onClick={() => setShowMap(true)}>Ver mapa</button>
        </div>
      </div>

      {/* Modal con mapa */}
      {showMap && (
        <div className="map-modal-overlay">
          <div className="map-modal">
            <button className="close-map" onClick={() => setShowMap(false)}>×</button>
            <iframe
              src={property.mapLink}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Mapa"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
