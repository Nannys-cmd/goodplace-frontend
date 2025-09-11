// src/config.js

// 🔹 URL del backend
// Cuando trabajes en local, usá "http://localhost:5000/api/properties"
// Cuando lo subas a producción, usá la URL de Render

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://goodplace-backend.onrender.com/api/properties" // ✅ Render
    : "http://localhost:5000/api/properties"; // ✅ Local

export default API_URL;
