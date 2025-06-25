const express = require('express');
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
  console.log(`Servidor corriendo en http://localhost:${PORT} y app corriendo en http://localhost:8080`);
});
