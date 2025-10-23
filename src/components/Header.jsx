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
  const [searchData, setSearchData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1
  });
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const allProperties = [
      { name: "Departamento Centro", description: "2 habitaciones, 1 baño" },
      { name: "Casa Playa", description: "3 habitaciones, piscina" },
      { name: "Monoambiente Moderno", description: "Cerca del centro" }
    ];
    const filtered = allProperties.filter(p =>
      p.name.toLowerCase().includes(searchData.location.toLowerCase())
    );
    setSearchResults(filtered);
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

          <form className="search-demo" onSubmit={handleSearch}>
            <div className="input-group">
              <label htmlFor="location">Ciudad o barrio</label>
              <input
                type="text"
                id="location"
                name="location"
                value={searchData.location}
                onChange={handleChange}
                required
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
                required
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
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="guests">Huéspedes</label>
              <input
                type="number"
                id="guests"
                name="guests"
                min="1"
                value={searchData.guests}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn">Buscar</button>
          </form>

          {searchResults.length > 0 && (
            <div className="search-results">
              <ul>
                {searchResults.map((prop, idx) => (
                  <li key={idx}>
                    <h3>{prop.name}</h3>
                    <p>{prop.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
