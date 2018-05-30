const mysql = require('mysql2/promise');
const config = require('../config.js');

exports.getInstance = async () => {
  if (!global.mysqlInstance) {
    const connection = await mysql.createConnection({
      host: config.mysql.host,
      user: config.mysql.user,
      database: config.mysql.db,
      password: config.mysql.pw
    });
    global.mysqlInstance = connection;
  }
  return global.mysqlInstance;
};