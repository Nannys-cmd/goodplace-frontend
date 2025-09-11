import React, { useState } from "react";
import "../styles/BookingForm.css";

export default function BookingForm({ property, selectedDates }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dni: null,
    acceptPolicy: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, dni: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.acceptPolicy) {
      alert("Debes aceptar la política de protección de datos.");
      return;
    }

    console.log({
      ...formData,
      selectedDates,
      property: property.title,
    });

    alert("Reserva enviada correctamente ✅");

    // Scroll suave al inicio de la página
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDates = () => {
    if (!selectedDates) return "";
    if (Array.isArray(selectedDates)) {
      const [start, end] = selectedDates;
      return start && end
        ? `Del ${start.toLocaleDateString()} al ${end.toLocaleDateString()}`
        : "Seleccioná tus fechas";
    }
    return `Fecha: ${selectedDates.toLocaleDateString()}`;
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h2 className="section-title">Reserva tu estadía en {property.title}</h2>
      <p className="section-subtitle">{formatDates()}</p>

      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Tu nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Tu email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="dni">
          Subí el <strong>frente del DNI</strong>
        </label>
        <input
          type="file"
          name="dni"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </div>

      <div className="form-group policy">
        <input
          type="checkbox"
          name="acceptPolicy"
          checked={formData.acceptPolicy}
          onChange={handleChange}
          required
        />
        <label>
          He leído y acepto la <strong>Política de Protección de Datos</strong>.
        </label>
      </div>

      <button type="submit" className="btn-submit">
        Pagar 10% y Reservar
      </button>

      {/* Botón adicional para volver al inicio */}
      <button
        type="button"
        className="btn-back"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Volver al inicio
      </button>
    </form>
  );
}
