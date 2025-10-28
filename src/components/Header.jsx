// Frontend/src/components/Header.jsx
import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import "../styles/styles.css";
import "../styles/PropertyCard.css";

export default function Header() {
  const images = [
    "/sampleBA1.jpg",
    "/sampleBA2.jpg",
    "/sampleBA3.jpg",
    "/sampleBA4.jpg",
    "/sampleBA5.jpg",
    "/sampleBA6.jpg",
  ];

  const [current, setCurrent] = useState(0);
  const [searchData, setSearchData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 🔄 Rotación automática del slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // 🔄 Captura de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  // 🔎 Buscar propiedades en backend
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "/properties");
      const data = await res.json();

      const filtered = data.filter((p) => {
        const matchLocation =
          p.subtitle.toLowerCase().includes(searchData.location.toLowerCase()) ||
          p.title.toLowerCase().includes(searchData.location.toLowerCase());
        const matchGuests = p.capacity >= parseInt(searchData.guests);

        return matchLocation && matchGuests;
      });

      setSearchResults(filtered);
      setShowModal(true); // 👈 mostrar modal
    } catch (err) {
      console.error("❌ Error buscando propiedades:", err);
    }
  };

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

          {/* 🔎 Barra de búsqueda */}
          <form className="search-demo" onSubmit={handleSearch}>
            <div className="input-group">
              <label htmlFor="location">Ciudad o barrio</label>
              <input
                type="text"
                id="location"
                name="location"
                value={searchData.location}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="checkIn">Entrada</label>
              <input
                type="date"
                id="checkIn"
                name="checkIn"
                value={searchData.checkIn}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="checkOut">Salida</label>
              <input
                type="date"
                id="checkOut"
                name="checkOut"
                value={searchData.checkOut}
                onChange={handleChange}
              />
            </div>

            <div className="input-group small">
              <label htmlFor="guests">Huéspedes</label>
              <input
                type="number"
                id="guests"
                name="guests"
                min="1"
                value={searchData.guests}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn">Buscar</button>
          </form>
        </div>
      </div>

      {/* 📌 Modal con resultados */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              ✖
            </button>
            <h2>Resultados de búsqueda</h2>
            {searchResults.length > 0 ? (
              <div className="results-grid">
                {searchResults.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </div>
            ) : (
              <p>No se encontraron resultados.</p>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
