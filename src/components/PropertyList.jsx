import React from "react";
import PropertyCard from "./PropertyCard";
import Slider from "react-slick";
import "../styles/PropertyList.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function PropertyList({ properties, onReserve }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="properties-carousel">
      <Slider {...settings}>
        {properties.map((p) => (
          <div key={p.id}>
            <PropertyCard property={p} onReserve={onReserve} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
