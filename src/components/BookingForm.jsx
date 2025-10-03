//Frontend/src/components/BookingForm.jsx
import React, { useState } from "react";
import "../styles/BookingForm.css";

export default function BookingForm({ property, selectedDates }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dni: null,
    acceptPolicy: false,
  });
  const [loading, setLoading] = useState(false);

  if (!property) {
    return <p style={{ textAlign: "center" }}>Selecciona una propiedad para reservar.</p>;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, dni: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.acceptPolicy) {
      return alert("Debes aceptar la política de protección de datos.");
    }
    if (!selectedDates || !selectedDates[0] || !selectedDates[1]) {
      return alert("Debes seleccionar un rango de fechas.");
    }

    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("propertyId", property.id);
      fd.append("start", selectedDates[0].toISOString().split("T")[0]);
      fd.append("end", selectedDates[1].toISOString().split("T")[0]);
      if (formData.dni) fd.append("dniFile", formData.dni); // coincide con backend

      const res = await fetch(import.meta.env.VITE_API_URL + "/bookings", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al crear la reserva");
      }

      alert("Reserva creada con éxito!");
      window.location.href = data.whatsappUrl;

    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al enviar la reserva ❌");
    } finally {
      setLoading(false);
    }
  };

  const formatDates = () => {
    if (!selectedDates) return "";
    const [start, end] = selectedDates;
    return start && end ? `Del ${start.toLocaleDateString()} al ${end.toLocaleDateString()}` : "Seleccioná tus fechas";
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h2 className="section-title">Reserva tu estadía en {property.title}</h2>
      <p className="section-subtitle">{formatDates()}</p>

      <div className="form-group">
        <label htmlFor="name">Tu nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Tu nombre"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Tu email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Tu email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="dniFile">
          Subí el <strong>frente del DNI</strong>
        </label>
        <input
          type="file"
          id="dniFile"
          name="dniFile"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </div>

      <div className="form-group policy">
        <input
          type="checkbox"
          id="acceptPolicy"
          name="acceptPolicy"
          checked={formData.acceptPolicy}
          onChange={handleChange}
          required
        />
        <label htmlFor="acceptPolicy">
          He leído y acepto la{" "}
          <a href="/politica-privacidad.html" target="_blank" rel="noopener noreferrer">
            <strong>Política de Protección de Datos</strong>
          </a>
          .
        </label>
      </div>

      <button type="submit" className="btn-submit" disabled={loading}>
        {loading ? "Enviando..." : "Pagar 10% y Reservar"}
      </button>

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
