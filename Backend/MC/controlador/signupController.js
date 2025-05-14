const bcrypt = require('bcrypt');
const authModel = require('../modelo/authModel.js');

async function signup(req, res) {
  const { email, password, ciudad, pokemonFav } = req.body;

  if (!email || !password || !ciudad || !pokemonFav) {
    return res.status(400).json({ error: 'Not all responses from the form.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await authModel.createUser(email, hashedPassword, ciudad, pokemonFav);
    res.status(201).json({ message: 'Signup completed!', userId });
  } catch (error) {
    console.error('Signup error', error);
    res.status(500).json({ error: 'Server error.' });
  }
}

module.exports = { signup };




