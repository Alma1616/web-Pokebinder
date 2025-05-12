const sql = require('mssql');

const config = {
  user: 'Alma1635979',
  password: 'PokeBinderTFG2025',
  server: 'pokebinder.database.windows.net', // ejemplo: mi-servidor.database.windows.net
  database: 'PokeBinderDB',
  options: {
    encrypt: true, // REquisito de Azure
    trustServerCertificate: false
  }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

module.exports = {
  sql,
  pool,
  poolConnect
};
