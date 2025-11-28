// Frontend/src/App.jsx
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import PropertyList from "./components/PropertyList";
import BookingForm from "./components/BookingForm";
import ContactForm from "./components/ContactForm";
import CalendarComponent from "./components/Calendar";
import PropertyBookedDates from "./components/PropertyBookedDates";
import PropertyIcalEvents from "./components/PropertyIcalEvents";
import "../src/styles/styles.css";

function App() {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedDates, setSelectedDates] = useState([null, null]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) =>
        console.error("Error cargando propiedades:", err)
      );
  }, []);

  const handleReserve = (property) => {
    setSelectedProperty(property);
    const section = document.getElementById("booking");
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="app">
      <Header
        setFilteredProperties={setProperties}
        properties={properties}
        onReserve={handleReserve}
      />

      <main>
        <section id="properties" className="properties-section">
          <h2 className="section-title">Departamentos Disponibles</h2>
          <PropertyList
            properties={properties}
            onReserve={handleReserve}
          />
        </section>

        <section id="booking" className="booking-section">
          <h2 className="section-title">Reserva tu estadía</h2>

          {!selectedProperty ? (
            <p style={{ textAlign: "center" }}>
              Selecciona una propiedad para reservar.
            </p>
          ) : (
            <>
              <h3
                style={{
                  textAlign: "center",
                  marginBottom: "1rem",
                }}
              >
                Estás reservando:{" "}
                <strong>{selectedProperty.title}</strong>
              </h3>

              <CalendarComponent
                selectedDates={selectedDates}
                onDateChange={setSelectedDates}
              />

              <BookingForm
                property={selectedProperty}
                selectedDates={selectedDates}
              />

              {/* 🔹 RESERVAS EXTERNAS DESDE iCal */}
              <PropertyIcalEvents property={selectedProperty} />
            </>
          )}
        </section>

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
