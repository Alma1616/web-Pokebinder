const bcrypt = require('bcrypt');
const User = require('../modelo/authModel.js');

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

    const match = await bcrypt.compare(password, usuario.password_hash);
    if (!match || !usuario) { //hacemos úncamente una comprovación --> Así el atacante no sabe que ha fallado
      return res.status(401).json({ error: 'Email or password incorrect!!' });
    }

    req.session.comprovacion = true; //Incializamos la session del usuario registardo
    req.session.usuario = {
      email: usuario.email,
      id: usuario.user_id}; //Guardamos el mail e ID --> Identificador del user

    res.json({ mensaje: 'Login Correct!!', usuario: req.session.usuario});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
}

module.exports = {
  login
};
