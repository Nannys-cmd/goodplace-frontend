// src/config.js
// Devuelve la base URL del backend (sin la ruta /api/... final)
// Vite expone variables con el prefijo VITE_ (import.meta.env)
const API_URL = import.meta.env.VITE_API_URL;
export default API_URL;
