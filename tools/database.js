const mysql = require('mysql2');

require('dotenv').config();

const masterConfig = {
  connectionLimit: 10,
  host           : process.env.MYSQL_HOST,
  user           : process.env.MYSQL_USER,
  password       : process.env.MYSQL_PASSWORD,
  database       : process.env.MYSQL_DATABASE
};

const slave1Config = {
  connectionLimit: 10,
  host           : process.env.MYSQL_SALVE_1_HOST,
  user           : process.env.MYSQL_SALVE_1_USER,
  password       : process.env.MYSQL_SALVE_1_PASSWORD,
  database       : process.env.MYSQL_SALVE_1_DATABASE
};

const slave2Config = {
  connectionLimit: 10,
  host           : process.env.MYSQL_SALVE_2_HOST,
  user           : process.env.MYSQL_SALVE_2_USER,
  password       : process.env.MYSQL_SALVE_2_PASSWORD,
  database       : process.env.MYSQL_SALVE_2_DATABASE
};

exports.master = mysql.createPool(masterConfig);
exports.slave = mysql.createPool(slave1Config);
