const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost', 
  port: 3306, 
  user: 'root', 
  password: 'root', 
  database: 'company_db', 
  connectionLimit: 10,
});

// Export the pool to be used in other files
module.exports = pool;
