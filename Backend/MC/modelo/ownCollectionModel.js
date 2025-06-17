const db = require('../../db.js');

//FICHERO que gestiona las colecciones peronales --> Los distintos endpoint y sus casuisticas
// /api/me/collections
async function getMyCollections(req, res) {
  if (!req.session.usuario) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  const userId = req.session.usuario.id;

  try {
    const [rows] = await db.execute(
      'SELECT collection_id AS id, name FROM Collections WHERE user_id = ?',
      [userId]
    );
    res.json({ collections: rows });
  } catch (err) {
    console.error('Error fetching collections:', err);
    res.status(500).json({ error: 'Failed to fetch collections' });
  }
}

// POST /api/collections
async function createCollection(req, res) {
  if (!req.session.usuario) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  const userId = req.session.usuario.id;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Missing collection name' });
  }

  try {
    await db.execute(
      'INSERT INTO Collections (user_id, name, created_at) VALUES (?, ?, GETDATE())',
      [userId, name]
    );

    res.status(201).json({ message: 'Collection created successfully' });
  } catch (err) {
    console.error('Error creating collection:', err);
    res.status(500).json({ error: 'Failed to create collection' });
  }
}

// POST /api/collections/:collectionId/cards
async function addCardToCollection(req, res) {
  const collectionId = parseInt(req.params.collectionId);
  const { card_id } = req.body;

  if (!req.session.usuario) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  if (!card_id) {
    return res.status(400).json({ error: 'Missing card_id' });
  }

  try {
    const [collection] = await db.execute(
      'SELECT user_id FROM Collections WHERE collection_id = ?',
      [collectionId]
    );

    if (!collection.length || collection[0].user_id !== req.session.usuario.id) {
      return res.status(403).json({ error: 'Forbidden: Not your collection' });
    }

    // Verificar si la carta ya existe en la colección
    const [existing] = await db.execute(
      'SELECT * FROM Collection_cards WHERE collection_id = ? AND card_id = ?',
      [collectionId, card_id]
    );

    if (existing.length > 0) {
      return res.status(409).json({ error: 'Card already exists in the collection' });
    }

    // Insertar la carta si no está
    await db.execute(
      'INSERT INTO Collection_cards (collection_id, card_id) VALUES (?, ?)',
      [collectionId, card_id]
    );

    res.status(200).json({ message: 'Card added to collection' });
  } catch (err) {
    console.error('Error adding card:', err);
    res.status(500).json({ error: 'Failed to add card to collection' });
  }
}


// DELETE /api/collections/:collectionId/cards/:cardId
async function removeCardFromCollection(req, res) {
  const collectionId = parseInt(req.params.collectionId);
  const cardId = req.params.cardId;

  if (!req.session.usuario) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  try {
    const [collection] = await db.execute(
      'SELECT user_id FROM Collections WHERE collection_id = ?',
      [collectionId]
    );

    if (!collection.length || collection[0].user_id !== req.session.usuario.id) {
      return res.status(403).json({ error: 'Forbidden: Not your collection' });
    }

    const result = await db.pool.request()
      .input('collectionId', db.sql.Int, collectionId)
      .input('cardId', db.sql.NVarChar, cardId)
      .query('DELETE FROM Collection_cards WHERE collection_id = @collectionId AND card_id = @cardId');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Card not found in that collection' });
    }

    res.status(200).json({ message: 'Card removed from collection' });
  } catch (err) {
    console.error('Error removing card:', err);
    res.status(500).json({ error: 'Failed to remove card from collection' });
  }
}

// GET /api/me/collections/:collectionId/cards
async function getCardsFromMyCollection(req, res) {
  const collectionId = parseInt(req.params.collectionId);

  if (!req.session.usuario) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  try {
    const [collection] = await db.execute(
      'SELECT user_id, name FROM Collections WHERE collection_id = ?',
      [collectionId]
    );

    if (!collection.length || collection[0].user_id !== req.session.usuario.id) {
      return res.status(403).json({ error: 'Forbidden: Not your collection' });
    }

    const [cards] = await db.execute(
      `SELECT c.card_id, d.name, d.image_url AS imageUrl, d.type, d.hp
       FROM Collection_cards c
       JOIN Cards d ON c.card_id = d.card_id
       WHERE c.collection_id = ?`,
      [collectionId]
    );

    res.json({
      collectionId,
      name: collection[0].name,
      cards
    });
  } catch (err) {
    console.error('Error fetching cards from collection:', err);
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
}

module.exports = {
  getMyCollections,
  createCollection,
  addCardToCollection,
  removeCardFromCollection,
  getCardsFromMyCollection
};
