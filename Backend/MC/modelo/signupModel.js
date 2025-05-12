const result = await pool.request()
  .input('username', sql.VarChar, 'misty')
  .input('email', sql.VarChar, 'misty@cerulean.com')
  .input('password', sql.VarChar, 'hashed_pw')
  .query('INSERT INTO Users (username, email, password_hash) OUTPUT INSERTED.user_id VALUES (@username, @email, @password)');

const newUserId = result.recordset[0].user_id;
    