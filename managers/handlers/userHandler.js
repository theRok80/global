const mysql = require('mysql');

require('dotenv').config();

const connection = mysql.createConnection(({
  host    : process.env.MYSQL_HOST,
  user    : process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}));


exports.get = (req) => {
  connection.connect();
  connection.query('SELECT * FROM `member` WHERE idx = 1', (err, rows, fields) => {
    if (err) throw err;
    console.log(rows);
  });
  connection.end();
};

