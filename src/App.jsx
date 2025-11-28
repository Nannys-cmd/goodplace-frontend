// Frontend/src/App.jsx
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import PropertyList from "./components/PropertyList";
import BookingForm from "./components/BookingForm";
import ContactForm from "./components/ContactForm";
import CalendarComponent from "./components/Calendar";
import "../src/styles/styles.css";

function App() {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedDates, setSelectedDates] = useState([null, null]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar propiedades desde el backend
  useEffect(() => {
    async function loadProperties() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/properties`
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "No se pudieron cargar las propiedades");
        }

        setProperties(data);
      } catch (err) {
        console.error(err);
        setError("Hubo un problema al cargar las propiedades.");
      } finally {
        setLoading(false);
      }
    }

    loadProperties();
  }, []);

  // Cuando haces clic en "Reservar" en una card
  const handleReserve = (property) => {
    setSelectedProperty(property);
    setSelectedDates([null, null]);

    const section = document.getElementById("booking");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleDateChange = (range) => {
    setSelectedDates(range);
  };

  return (
    <div className="app">
      <Header onReserve={handleReserve} />

      <main>
        {/* Listado de propiedades */}
        <section id="properties" className="properties-section">
          <h2 className="section-title">Propiedades disponibles</h2>

          {loading && <p>Cargando propiedades...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && (
            <PropertyList
              properties={properties}
              onReserve={handleReserve}
            />
          )}
        </section>

        {/* Sección de reserva */}
        <section id="booking" className="booking-section">
          <h2 className="section-title">Reservar</h2>

          {!selectedProperty ? (
            <p style={{ textAlign: "center" }}>
              Elige una propiedad y haz clic en <strong>Reservar</strong> para
              iniciar tu reserva.
            </p>
          ) : (
            <>
              <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
                Estás reservando:{" "}
                <strong>{selectedProperty.title}</strong>
              </h3>

              <CalendarComponent
                selectedDates={selectedDates}
                onDateChange={handleDateChange}
              />

              <BookingForm
                property={selectedProperty}
                selectedDates={selectedDates}
              />
            </>
          )}
        </section>

        {/* Contacto */}
        <section id="contact" className="contact-section">
          <h2 className="section-title">Contacto</h2>
          <ContactForm />
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Goodplace. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
