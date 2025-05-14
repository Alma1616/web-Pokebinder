require('dotenv').config({ path: __dirname + '/.env' }); //para que todos los archivos puedan interpretar el archivo .env
console.log('DB_SERVER:', process.env.DB_SERVER);
const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

async function execute(query, params = []) {
  await poolConnect;
  const request = pool.request();

  params.forEach((param, index) => {
    request.input(`param${index}`, param);
  });

  // Para quitar los ?? --> Evita la SQL Injection
  let parsedQuery = query;
  params.forEach((_, index) => {
    parsedQuery = parsedQuery.replace('?', `@param${index}`);
  });

  const result = await request.query(parsedQuery);
  return [result.recordset];
}

module.exports = {
  sql,
  pool,
  poolConnect, 
  execute
};
