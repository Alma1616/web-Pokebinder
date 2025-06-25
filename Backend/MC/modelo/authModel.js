const db = require('../../db.js');
const bcrypt = require('bcryptjs');

async function findUserByEmail(email) {
  const [rows] = await db.execute(
    'SELECT * FROM Users WHERE email = ?',
    [email]
  );
  return rows[0];
}

async function createUser(email, password, city, pokemonFav) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [rows] = await db.execute(
  'INSERT INTO Users (email, password_hash, city, pokemonFav) OUTPUT INSERTED.user_id VALUES (?, ?, ?, ?)',
  [email, password, city, pokemonFav]
);
return rows[0].user_id; //Devolvemos el id para ver si se suma cada vez que alguien se registra
}

module.exports = {
  findUserByEmail,
  createUser
};
