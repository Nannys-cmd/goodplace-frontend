import React from "react";
import Slider from "react-slick";
import PropertyCard from "./PropertyCard";
import "../styles/PropertyList.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1, arrows: false } },
    ],
  };

  return (
    <div className="properties-section">
      <Slider {...settings}>
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} onReserve={onReserve} />
        ))}
      </Slider>
    </div>
  );
}
