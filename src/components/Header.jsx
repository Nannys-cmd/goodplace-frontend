import React, { useEffect, useState } from "react";
import "../styles/styles.css";

export default function Header() {
  const images = [
    "/sampleBA1.jpg",
    "/sampleBA2.jpg",
    "/sampleBA3.jpg",
    "/sampleBA4.jpg",
    "/sampleBA5.jpg",
    "/sampleBA6.jpg"
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <header className="header">
      <div className="banner-slider">
        {images.map((img, index) => (
          <div
            key={index}
            className={`slide ${index === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}

        <div className="overlay">
          <div className="brand no-logo">
            <h1>GoodPlace</h1>
          </div>

          <div className="search-demo">
            <input type="text" placeholder="Ciudad o barrio" />
            <input type="date" />
            <input type="number" placeholder="Huéspedes" min="1" />
            <button className="btn">Buscar</button>
          </div>
        </div>
      </div>
    </header>
  );
}
