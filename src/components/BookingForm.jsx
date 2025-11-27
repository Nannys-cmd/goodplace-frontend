// Frontend/src/components/BookingForm.jsx
import React, { useState } from "react";
import "../styles/BookingForm.css";
import { API_URL, WHATSAPP } from "../config";

export default function BookingForm({ property, selectedDates }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    dni: null,
    acceptPolicy: false,
  });
  const [loading, setLoading] = useState(false);

  if (!property) {
    return (
      <p style={{ textAlign: "center" }}>
        Selecciona una propiedad para reservar.
      </p>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;
    setFormData((prev) => ({
      ...prev,
      dni: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.acceptPolicy) {
      alert("Debes aceptar la política de protección de datos.");
      return;
    }

    if (!selectedDates || !selectedDates[0] || !selectedDates[1]) {
      alert("Debes seleccionar un rango de fechas en el calendario.");
      return;
    }

    const [startDate, endDate] = selectedDates;
    const startStr = startDate.toISOString().split("T")[0];
    const endStr = endDate.toISOString().split("T")[0];

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("phone", formData.phone);
      fd.append("message", formData.message);
      fd.append("propertyId", property.id);
      fd.append("start", startStr);
      fd.append("end", endStr);

      if (formData.dni) {
        fd.append("dniFile", formData.dni);
      }

      const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) {
        console.error(data);
        throw new Error(data.error || "Error al crear la reserva");
      }

      alert("Reserva creada con éxito 🥰");

      // Mensaje para WhatsApp
      const msgLines = [
        `Hola, quiero reservar "${property.title}"`,
        `Fechas: ${startStr} al ${endStr}`,
        `Nombre: ${formData.name}`,
        formData.email ? `Email: ${formData.email}` : "",
        formData.phone ? `Teléfono: ${formData.phone}` : "",
        formData.message ? `Mensaje: ${formData.message}` : "",
      ].filter(Boolean);

      const message = msgLines.join(" | ");

      const whatsappUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
        message
      )}`;

      window.location.href = whatsappUrl;
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al enviar la reserva ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h2>Datos para la reserva</h2>

      <p className="booking-property">
        Propiedad: <strong>{property.title}</strong>
      </p>

      <div className="form-group">
        <label htmlFor="name">Nombre completo</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="off"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="off"
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Teléfono</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          autoComplete="off"
          placeholder="Ej: 11 1234 5678"
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Mensaje adicional</label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          autoComplete="off"
          placeholder="Detalles que quieras comentar al estudio..."
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="dni">Foto del DNI (opcional)</label>
        <input
          type="file"
          id="dni"
          name="dni"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
        />
      </div>

      <div className="form-group checkbox-group">
        <input
          type="checkbox"
          id="acceptPolicy"
          name="acceptPolicy"
          checked={formData.acceptPolicy}
          onChange={handleChange}
          required
        />
        <label htmlFor="acceptPolicy">
          Acepto la política de protección de datos
        </label>
      </div>

      <button className="btn-submit" type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Reservar"}
      </button>
    </form>
  );
}
