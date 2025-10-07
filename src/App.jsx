// App.jsx
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

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.error(err));
  }, []);

  const handleReserve = (property) => {
    setSelectedProperty(property);
    window.scrollTo({ top: document.getElementById("booking").offsetTop, behavior: "smooth" });
  };

  return (
    <>
      <Header />
      <main>
        <section id="properties">
          <h2>Departamentos Disponibles</h2>
          <PropertyList properties={properties} onReserve={handleReserve} />
        </section>

        <section id="booking">
          <h2>Reserva tu estadía</h2>
          {selectedProperty ? (
            <>
              <CalendarComponent selectedDates={selectedDates} onDateChange={setSelectedDates} />
              <BookingForm property={selectedProperty} selectedDates={selectedDates} />
            </>
          ) : (
            <p style={{ textAlign: "center" }}>Selecciona una propiedad para reservar.</p>
          )}
        </section>

        <section id="contact">
          <h2>Contacto</h2>
          <ContactForm />
        </section>
      </main>
    </>
  );
}

export default App;
