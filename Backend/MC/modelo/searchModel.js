    const db = require('../../db.js');

    async function searchCardsByName(query) {
    if (!query) {
        throw new Error('Missing search query');
    }

    try {
        const [cards] = await db.execute(
        `SELECT card_id AS card_id, name, image_url AS imageUrl
        FROM Cards
        WHERE LOWER(name) LIKE ?`,
        [`%${query.toLowerCase()}%`]
        );
        return cards;
    } catch (err) {
        console.error('Error searching cards in DB:', err);
        throw new Error('Database error');
    }
    }

    module.exports = {
    searchCardsByName
    };