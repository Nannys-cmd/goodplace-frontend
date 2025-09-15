// src/config.js
// Devuelve la base URL del backend (sin la ruta /api/... final)
// Vite expone variables con el prefijo VITE_ (import.meta.env)
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default API_BASE;
