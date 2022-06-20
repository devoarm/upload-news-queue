const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'msaran',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  module.exports = conn;