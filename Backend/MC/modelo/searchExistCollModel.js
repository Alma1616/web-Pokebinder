const { pool, sql } = require('../../db');

async function getCollectionById(id) {
  try {
    // Obtener cartas asociadas a la colección
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`
        SELECT c.card_id, c.name, c.image_url AS imageUrl
        FROM Cards c
        JOIN Predefined_collection_cards pcc ON c.card_id = pcc.card_id
        WHERE pcc.predefined_collection_id = @id
      `);

    // Obtener nombre de la colección
    const nameRes = await pool.request()
      .input('id', sql.Int, id)
      .query(`
        SELECT name FROM Predefined_collections WHERE predefined_collection_id = @id
      `);

    return {
      name: nameRes.recordset[0]?.name || 'Unknown Collection',
      cards: result.recordset
    };
  } catch (err) {
    console.error('Error in getCollectionById:', err);
    throw err;
  }
}

module.exports = {
  getCollectionById
};
