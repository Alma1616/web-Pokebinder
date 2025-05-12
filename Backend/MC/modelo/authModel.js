const db = require('../db');

async function findUserByEmail(email) {
  const [rows] = await db.execute(
    'SELECT * FROM usuarios WHERE email = ?',
    [email]
  );
  return rows[0];
}

async function createUser(email, password, city, pokemonFav) {
  const [result] = await db.execute(
    'INSERT INTO usuarios (email, password, ciudad, pokemonFav) VALUES (?, ?, ?, ?)',
    [email, password, city, pokemonFav]
  );
  return result.insertId;
}

module.exports = {
  findUserByEmail,
  createUser
};
