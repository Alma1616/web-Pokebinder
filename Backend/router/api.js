const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/test', (req, res) => {
  res.json({ mensaje: '¡Hola desde el backend!' });
});

router.post('/login',authController.login );


module.exports = router; 
