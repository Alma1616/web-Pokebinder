/*const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const apiRoutes = require('./router/api'); 
const app = express();
const PORT = 3000;

app.use(express.json());


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(session({
  secret: 'tfgSecret',
  resave: false,
  saveUninitialized: true
}));

app.use('/api', apiRoutes); //enrutador backend

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});*/
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const apiRoutes = require('./router/api');

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'http://localhost:5173',
  'https://poke-binder-web.azurewebsites.net'
];

app.use(express.json());

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'tfgSecret',
  resave: false,
  saveUninitialized: true
}));

app.use('/api', apiRoutes);

// Static frontend (optional)
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

