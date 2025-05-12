const bcrypt = require('bcrypt');
const User = require('../models/userModel');

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password || !validarEmail(email)) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  try {
    const usuario = await User.findUserByEmail(email);
    if (!usuario) {
      return res.status(401).json({ error: 'Email or password incorrect!!' });
    }

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      return res.status(401).json({ error: 'Email or password incorrect!!' });
    }

    req.session.comprovacion = true;
    req.session.usuario = usuario.email;

    res.json({ mensaje: 'Login Correct!!', usuario: usuario.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
}

module.exports = {
  login
};
