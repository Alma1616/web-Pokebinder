const db = require('../../db.js');
const bcrypt = require('bcrypt');

// Obtener email y hash de un usuario
async function getUserCredentials(userId) {
  const [rows] = await db.execute(
    'SELECT email, password_hash FROM Users WHERE user_id = ?',
    [userId]
  );
  return rows[0];
}

// Actualizar el email
async function updateEmail(userId, newEmail) {
  await db.execute(
    'UPDATE Users SET email = ? WHERE user_id = ?',
    [newEmail, userId]
  );
}

// Actualizar el password (con hash)
async function updatePassword(userId, newPassword) {
  const hashed = await bcrypt.hash(newPassword, 10);
  await db.execute(
    'UPDATE Users SET password_hash = ? WHERE user_id = ?',
    [hashed, userId]
  );
}

module.exports = {
  getUserCredentials,
  updateEmail,
  updatePassword
};
