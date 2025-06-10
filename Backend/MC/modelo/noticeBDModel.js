//Funcion para insertar una noticia en la BD --> Durante ejecución de la web no hace nada
//Ejecutar este archivo con node noticesModel.js 
async function createNotice(title, content) {
  if (!title || !content) {
    throw new Error('Missing title or content');
  }
  const query = `
    INSERT INTO Notices (title, content, created_at)
    VALUES (?, ?, GETDATE())
  `;

  await db.execute(query, [title, content]);
}

createNotice("Pokemon Legends: The great history of Arceus","https://pokemaster.es/pokemon-legends-arceus-y-los-7-guinos-que-solo-los-entrenadores-veteranos-entenderan-no-126359/");
createNotice("Pyukumuku an unexpected warrior", "https://as.com/meristation/noticias/pyukumuku-es-un-hueso-duro-de-roer-en-pokemon-tcg-pocket-y-su-habilidad-te-sacara-de-mas-de-un-aprieto-n/");
createNotice("New Collection arriving soon: Destined Rivals!!","https://tcg.pokemon.com/en-us/expansions/destined-rivals/");