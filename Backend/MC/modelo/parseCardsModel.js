const fs = require('fs');
const { pool, poolConnect, sql } = require('../../db.js');


//FUNCION que coge todas las cartas de los archivos JSON y las parseamos para poder guardarlas en la DB
async function insertCards(file) {
  await poolConnect;
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

  for (const card of data) {
    const {
      id,
      name,
      flavorText,
      images,
      types,
      hp,
      rarity,
      evolvesFrom,
      evolvesTo,
      attacks,
      weaknesses,
      resistances
    } = card;

    const imageUrl = images?.large || images?.small || null;
    const type = types?.[0] || null;
    const hpInt = parseInt(hp) || null;
    const evolvesToStr = Array.isArray(card.evolvesTo) ? card.evolvesTo.join(', ') : null;

    const attacksStr = attacks ? JSON.stringify(attacks) : null;
    const weaknessesStr = weaknesses ? JSON.stringify(weaknesses) : null;
    const resistancesStr = resistances ? JSON.stringify(resistances) : null;

    try {
      await pool.request()
        .input('card_id', sql.NVarChar, id)
        .input('name', sql.NVarChar, name)
        .input('flavor_text', sql.NVarChar, flavorText || null)
        .input('image_url', sql.NVarChar, imageUrl)
        .input('type', sql.NVarChar, type)
        .input('hp', sql.Int, hpInt)
        .input('rarity', sql.NVarChar, rarity || null)
        .input('evolves_from', sql.NVarChar, evolvesFrom || null)
        .input('evolves_to', sql.NVarChar, evolvesToStr)
        .input('attacks', sql.NVarChar, attacksStr)
        .input('weaknesses', sql.NVarChar, weaknessesStr)
        .input('resistances', sql.NVarChar, resistancesStr)
        .query(`
          INSERT INTO Cards (
            card_id, name, flavor_text, image_url, type, hp,
            rarity, evolves_from, evolves_to,
            attacks, weaknesses, resistances
          ) VALUES (
            @card_id, @name, @flavor_text, @image_url, @type, @hp,
            @rarity, @evolves_from, @evolves_to,
            @attacks, @weaknesses, @resistances
          )
        `);
    } catch (error) {
      console.error(`Error inserting card ${id}:`, error.message);
    }
  }

  console.log('Cards parsed correctly!');
}

insertCards('../../Pokemons/base1.json');
insertCards('../../Pokemons/base2.json');