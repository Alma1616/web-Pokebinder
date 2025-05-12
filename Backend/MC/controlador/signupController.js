const bcrypt = require('bcrypt');
const hash = await bcrypt.hash('pikachu', 10);

await db.execute(
  'INSERT INTO usuarios (email, password) VALUES (?, ?)',
  ['ash@kanto.com', hash]
);
