const express = require('express');
const router = express.Router();
const loginController = require('../MC/controlador/loginController.js');
const signupController = require('../MC/controlador/signupController.js');

router.get('/test', (req, res) => {
  res.json({ mensaje: '¡Hola desde el backend!' });
});

router.post('/login',loginController.login );
router.post('/signup', signupController.signup);

router.get('/perfil', (req, res) => {
  if (!req.session.comprovacion) {
    return res.status(401).json({ error: 'Not Authhorized' });
  }
  res.json({ usuario: req.session.usuario }); 
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Error closing session' });
    }
    res.clearCookie('connect.sid'); 
    res.json({ mensaje: 'Logout correct!!' });
  });
});


module.exports = router; 
