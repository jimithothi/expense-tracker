import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

/**
 * Creates a MySQL connection pool using environment variables.
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'expenses',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool; 