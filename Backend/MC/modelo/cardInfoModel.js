const { pool, sql } = require('../../db');

async function getCardById(cardId) {
  const result = await pool.request()
    .input('id', sql.NVarChar, cardId)
    .query(`
      SELECT 
        card_id AS id,
        name,
        image_url AS imageUrl,
        type AS types,
        hp,
        rarity,
        flavor_text AS flavorText,
        attacks
      FROM Cards
      WHERE LOWER(card_id) = LOWER(@id)
    `);

  if (result.recordset.length === 0) return null;

  const card = result.recordset[0];

  // Convertimos los tipos separados por comas en un array
  card.types = card.types ? card.types.split(',') : [];

  // Parseo seguro de ataques
  try {
    card.attacks = JSON.parse(card.attacks || '[]');
  } catch {
    card.attacks = [];
  }

  return card;
}

module.exports = { getCardById };
