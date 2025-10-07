// Frontend/src/components/PropertyList.jsx
import React from "react";
import Slider from "react-slick";
import "../styles/PropertyList.css";
import "../styles/PropertyCard.css";

export default function PropertyList({ properties, onReserve }) {
  if (!properties || properties.length === 0) {
    return <p style={{ textAlign: "center" }}>No hay propiedades disponibles.</p>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, arrows: false },
      },
    ],
  };

  return (
    <div className="properties-section">
      <div className="properties-carousel">
        <Slider {...settings}>
          {properties.map((property) => (
            <div key={property.id}>
              <div className="card">
                <div className="image-wrapper">
                  <img src={property.img} alt={property.title} />
                  <div className="overlay">
                    <span className={`status ${property.available ? "available" : "unavailable"}`}>
                      {property.available ? "Disponible" : "No disponible"}
                    </span>
                    <span className="price-tag">${property.price} / noche</span>
                  </div>
                </div>
                <div className="card-content">
                  <h3>{property.title}</h3>
                  <p className="muted">{property.subtitle}</p>
                  <div className="actions">
                    <button className="btn reserve-btn" onClick={() => onReserve(property)}>
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
