// Frontend/src/App.jsx
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import PropertyList from "./components/PropertyList";
import BookingForm from "./components/BookingForm";
import ContactForm from "./components/ContactForm";
import CalendarComponent from "./components/Calendar";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "../src/styles/styles.css";

function App() {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedDates, setSelectedDates] = useState([null, null]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.error(err));
  }, []);

  const handleReserve = (property) => {
    setSelectedProperty(property);
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      window.scrollTo({ top: bookingSection.offsetTop, behavior: "smooth" });
    }
  };

  return (
    <div className="app">
      <Header />
      <main>
        <section id="properties" className="properties-section">
          <h2 className="section-title">Departamentos Disponibles</h2>
          <PropertyList properties={properties} onReserve={handleReserve} />
        </section>

        <section id="booking" className="booking-section">
          <h2 className="section-title">Reserva tu estadía</h2>
          {selectedProperty ? (
            <>
              <CalendarComponent selectedDates={selectedDates} onDateChange={setSelectedDates} />
              <BookingForm property={selectedProperty} selectedDates={selectedDates} />
            </>
          ) : (
            <p style={{ textAlign: "center" }}>Selecciona una propiedad para reservar.</p>
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
