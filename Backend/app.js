const express = require('express');
const session = require('express-session');
const path = require('path');
const mainRoutes = require('../Frontend/src/router/index.js'); // Tus rutas backend

const app = express();
const PORT = 3000;

// Archivos públicos (imágenes, etc.)
app.use(express.static(path.join(__dirname, '/public')));

// Sesiones
app.use(session({
  secret: 'tfgSecret',
  resave: false,
  saveUninitialized: true
}));

//variables de sesión
app.use((req, res, next) => {
  res.locals.sesionIniciada = req.session.comprovacion || false;
  res.locals.contadorColecciones = req.session.colections || 0;
  next();
});

//API
app.use('/api', mainRoutes);

// Rutas no especificadas
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
