// src/components/ContactForm.jsx
import React, { useState } from "react";
import "../styles/styles.css"; // Asegúrate de que esté importado Variables.css dentro de styles.css

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Gracias, ${formData.name}! Mensaje enviado correctamente.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Nombre</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        autoComplete="name"
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        autoComplete="email"
      />

      <label htmlFor="message">Mensaje</label>
      <textarea
        id="message"
        name="message"
        rows="4"
        value={formData.message}
        onChange={handleChange}
        required
        autoComplete="off"
      ></textarea>

      <button type="submit">Enviar</button>
    </form>
  );
}
