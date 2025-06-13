const db = require('../../db.js');

// Obtener colecciones propias del usuario
async function getUserCollections(req, res) {
  const userId = parseInt(req.params.id);

  if (!req.session.usuario || req.session.usuario.id !== userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    const [collections] = await db.query(
      'SELECT collection_id AS id, name FROM Collections WHERE user_id = ?',
      [userId]
    );
    res.json({ collections });
  } catch (err) {
    console.error('Error fetching collections:', err);
    res.status(500).json({ error: 'Failed to fetch collections' });
  }
}

// Añadir carta a una colección del usuario
async function addCardToCollection(req, res) {
  const collectionId = parseInt(req.params.collectionId);
  const { card_id } = req.body;

  if (!card_id) {
    return res.status(400).json({ error: 'Missing card_id' });
  }

  try {
    // Verificar si ya existe
    const [existing] = await db.query(
      'SELECT * FROM Collection_cards WHERE collection_id = ? AND card_id = ?',
      [collectionId, card_id]
    );

    if (existing.length > 0) {
      return res.status(409).json({ message: 'Card already in collection' });
    }

    await db.query(
      'INSERT INTO Collection_cards (collection_id, card_id, quantity) VALUES (?, ?, 1)',
      [collectionId, card_id]
    );

    res.status(200).json({ message: 'Card added to collection' });
  } catch (err) {
    console.error('Error adding card:', err);
    res.status(500).json({ error: 'Failed to add card to collection' });
  }
}

// Eliminar carta de una colección
async function removeCardFromCollection(req, res) {
  const collectionId = parseInt(req.params.collectionId);
  const cardId = req.params.cardId;

  try {
    const [result] = await db.query(
      'DELETE FROM Collection_cards WHERE collection_id = ? AND card_id = ?',
      [collectionId, cardId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Card not found in collection' });
    }

    res.status(200).json({ message: 'Card removed from collection' });
  } catch (err) {
    console.error('Error removing card:', err);
    res.status(500).json({ error: 'Failed to remove card from collection' });
  }
}

module.exports = {
  getUserCollections,
  addCardToCollection,
  removeCardFromCollection
};
