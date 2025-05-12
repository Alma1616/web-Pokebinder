const { poolConnect, pool } = require('./db');

async function testConnection() {
  try {
    await poolConnect;
    const result = await pool.request().query('SELECT 1 AS ok');
    console.log('✅ Conexión exitosa:', result.recordset);
  } catch (err) {
    console.error('❌ Error al conectar con la base de datos:', err.message);
  }
}

testConnection();
