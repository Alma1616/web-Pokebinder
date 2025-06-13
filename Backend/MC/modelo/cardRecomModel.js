const db = require('../../db.js');

async function getAllCards() {
  const [rows] = await db.execute(
    'SELECT card_id, name, image_url AS imageUrl, type, hp FROM Cards'
  );
  return rows;
}

module.exports = {
  getAllCards
};
