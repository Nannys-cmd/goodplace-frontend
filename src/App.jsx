import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import PropertyList from "./components/PropertyList";
import CalendarComponent from "./components/Calendar";
import BookingForm from "./components/BookingForm";
import ContactForm from "./components/ContactForm";
import Events from "./components/Events";
import { FaWhatsapp } from "react-icons/fa";

export default function App() {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedDates, setSelectedDates] = useState([null, null]);
  const [highlightCalendar, setHighlightCalendar] = useState(false);

  const calendarRef = React.useRef(null);

  const events = [
    { date: "2025-08-25", title: "Fiesta local en la plaza" },
    { date: "2025-08-30", title: "Mercado artesanal" },
  ];

  // 🔹 Traer propiedades desde la API
  useEffect(() => {
    fetch("https://goodplace-backend.onrender.com")
      .then(res => res.json())
      .then(data => setProperties(data))
      .catch(err => console.error("Error al traer propiedades:", err));
  }, []);

  const handleReserve = (property) => {
    setSelectedProperty(property);
    // Scroll suave al calendario
    calendarRef.current.scrollIntoView({ behavior: "smooth" });
    // Destacar el calendario temporalmente
    setHighlightCalendar(true);
    setTimeout(() => setHighlightCalendar(false), 2500);
  };

  const handleDateChange = (dates) => {
    setSelectedDates(dates);
  };

  return (
    <div className="app">
      <Header />

      <section className="properties-section">
        <h2 className="section-title">Propiedades destacadas</h2>
        <PropertyList properties={properties} onReserve={handleReserve} />
      </section>

      <section className="calendar-events-section">
        <div
          className={`calendar-wrapper ${highlightCalendar ? "highlight" : ""}`}
          ref={calendarRef}
        >
          <h2 className="section-title">Seleccioná tus fechas</h2>
          <p className="section-subtitle">Consulta disponibilidad y eventos locales</p>
          <CalendarComponent events={events} onDateChange={handleDateChange} />
        </div>
        <div className="events-wrapper">
          <h2 className="section-title">Próximos eventos</h2>
          <Events events={events} />
        </div>
      </section>

      {selectedProperty && selectedDates[0] && (
        <section className="booking-section">
          <BookingForm property={selectedProperty} selectedDates={selectedDates} />
        </section>
      )}

      <section className="contact-section">
        <h2 className="section-title">Contacto</h2>
        <ContactForm />
      </section>

      <a
        href="https://wa.me/5491157826522"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
      >
        <FaWhatsapp />
      </a>

      <footer className="footer">
        <p>© 2025 GoodPlace. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
