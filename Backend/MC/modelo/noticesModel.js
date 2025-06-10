const db = require('../../db.js'); // Asegúrate de tener la función `execute`

// Funcion que se usará para coger las noticias y pasarlas a la vista de Notices
async function getAllNotices() {
  const query = `
    SELECT notice_id, title, content, created_at
    FROM Notices
    ORDER BY created_at DESC
  `;

  const [rows] = await db.execute(query);
  return rows;
}


module.exports = {
  getAllNotices
};