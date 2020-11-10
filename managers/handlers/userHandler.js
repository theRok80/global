const database = require('../../tools/database');

const tables = {
  member    : 'member',
  loginToken: 'member_login_token'
};

exports.get = (req) => {
  connection.connect();
  connection.query('SELECT * FROM `member` WHERE idx = 1', (err, rows, fields) => {
    if (err) throw err;
    console.log(rows);
  });
  connection.end();
};

exports.getByToken = async (token) => {
  let pool = database.slave.promise();

  let [rows, fields] = await pool.query(`SELECT * FROM ${tables.loginToken} WHERE token = ? ORDER BY createdAt DESC LIMIT 1`, [token]);
  if (rows.length) {
    let userIdx = rows[0].user_idx;
    [rows, fields] = await pool.query(`SELECT * FROM ${tables.member} WHERE idx = ?`, [userIdx]);
    if (rows.length) {
      return rows[0];
    }
  }
  return null;
};

