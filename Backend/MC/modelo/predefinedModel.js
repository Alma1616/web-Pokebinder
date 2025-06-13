const { pool, sql } = require('../../db.js');

async function getCardsByType(type) {
  const result = await pool.request()
    .input('type', sql.NVarChar, type)
    .query(`SELECT c.card_id, c.name, c.image_url
      FROM Cards c
      JOIN Predefined_collection_cards pcc ON c.card_id = pcc.card_id
      JOIN Predefined_collections pc ON pc.predefined_collection_id = pcc.predefined_collection_id
      WHERE pc.name = @type`);

  return result.recordset;
};

async function getTypes() {
   const res =await pool.request().query(`
      SELECT 
        predefined_collection_id AS id,
        name,
        description,
        category
      FROM Predefined_collections
    `);
    return res;
}
module.exports = {
  getCardsByType,
  getTypes
};
