import React from "react";
import PropertyCard from "./PropertyCard";
import "../styles/PropertyList.css";

export default function PropertyList({ properties, onReserve }) {
  if (!properties || properties.length === 0) {
    return <p style={{ textAlign: "center" }}>No hay propiedades disponibles.</p>;
  }

  return (
    <div className="properties-grid">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} onReserve={onReserve} />
      ))}
    </div>
  );
}
