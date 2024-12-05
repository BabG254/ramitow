const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username if different
  password: 'p4ssw0rd@123', // Replace with your MySQL password
  database: 'ramitow',
  waitForConnections: true,
  connectionLimit: 10, // Adjust this based on expected traffic
  queueLimit: 0,
});

// Test database connection
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully!');
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
})();

module.exports = pool;