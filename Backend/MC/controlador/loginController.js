const bcrypt = require('bcryptjs');
const User = require('../modelo/authModel.js');

function validarEmail(email) { //comprueba que el mail tenga un formato válido
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password || !validarEmail(email)) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  try {
    const usuario = await User.findUserByEmail(email);

    //Verifica si el usuario existe antes de acceder a su password_hash
    if (!usuario) {
      return res.status(401).json({ error: 'Email or password incorrect!!' });
    }

    const match = await bcrypt.compare(password, usuario.password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Email or password incorrect!!' });
    }
    //Regeneramos la session porque sino en el siguiente intento de login --> Falla
    req.session.regenerate(err => {
    if (err) {
      return res.status(500).json({ error: 'Session regeneration failed' });
    }

    req.session.comprovacion = true;
    req.session.usuario = {
      email: usuario.email,
      id: usuario.user_id
    };

    res.json({ mensaje: 'Login Correct!!', usuario: req.session.usuario });
});

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
}

module.exports = {
  login
};
