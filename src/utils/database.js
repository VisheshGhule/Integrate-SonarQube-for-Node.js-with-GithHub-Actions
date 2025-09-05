// Database utilities with intentional vulnerabilities for demonstration

const sqlite3 = require('sqlite3').verbose();

// VULNERABILITY: Hardcoded database path
const DB_PATH = './database.sqlite';

// VULNERABILITY: No connection pooling
// VULNERABILITY: No connection error handling
let db;

// Initialize database connection
const initDatabase = () => {
  try {
    db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('Database connection error:', err);
        // VULNERABILITY: Not handling connection errors properly
      } else {
        console.log('Connected to SQLite database');
        createTables();
      }
    });
  } catch (error) {
    console.error('Database initialization error:', error);
    // VULNERABILITY: Not handling initialization errors
  }
};

// Create tables with vulnerabilities
const createTables = () => {
  // VULNERABILITY: No transaction management
  // VULNERABILITY: No error handling for table creation
  
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.run(createUsersTable, (err) => {
    if (err) {
      console.error('Error creating users table:', err);
      // VULNERABILITY: Not handling table creation errors
    } else {
      console.log('Users table created successfully');
      insertSampleData();
    }
  });
};

// Insert sample data with vulnerabilities
const insertSampleData = () => {
  // VULNERABILITY: Hardcoded sample data
  // VULNERABILITY: Plain text passwords
  // VULNERABILITY: No data validation
  
  const sampleUsers = [
    {
      username: 'admin',
      password: 'admin123', // VULNERABILITY: Plain text password
      email: 'admin@example.com',
      role: 'admin'
    },
    {
      username: 'user1',
      password: 'password123', // VULNERABILITY: Plain text password
      email: 'user1@example.com',
      role: 'user'
    }
  ];

  sampleUsers.forEach(user => {
    // VULNERABILITY: SQL Injection vulnerability
    const insertQuery = `INSERT OR IGNORE INTO users (username, password, email, role) VALUES ('${user.username}', '${user.password}', '${user.email}', '${user.role}')`;
    
    db.run(insertQuery, (err) => {
      if (err) {
        console.error('Error inserting sample user:', err);
        // VULNERABILITY: Not handling insertion errors
      }
    });
  });
};

// Vulnerable query functions
const executeQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    // VULNERABILITY: No query validation
    // VULNERABILITY: No parameter binding
    // VULNERABILITY: No SQL injection protection
    
    console.log('Executing query:', query);
    console.log('With parameters:', params);
    
    db.all(query, params, (err, rows) => {
      if (err) {
        console.error('Query execution error:', err);
        // VULNERABILITY: Exposing database errors
        reject({
          error: 'Database query failed',
          details: err.message,
          query: query,
          stack: err.stack // VULNERABILITY: Stack trace exposure
        });
      } else {
        resolve(rows);
      }
    });
  });
};

// Vulnerable user operations
const getUserByUsername = async (username) => {
  // VULNERABILITY: SQL Injection
  const query = `SELECT * FROM users WHERE username = '${username}'`;
  return executeQuery(query);
};

const getUserById = async (id) => {
  // VULNERABILITY: SQL Injection
  const query = `SELECT * FROM users WHERE id = ${id}`;
  return executeQuery(query);
};

const createUser = async (userData) => {
  // VULNERABILITY: No input validation
  // VULNERABILITY: No password hashing
  // VULNERABILITY: SQL Injection
  const { username, password, email, role = 'user' } = userData;
  const query = `INSERT INTO users (username, password, email, role) VALUES ('${username}', '${password}', '${email}', '${role}')`;
  return executeQuery(query);
};

const updateUser = async (id, userData) => {
  // VULNERABILITY: No input validation
  // VULNERABILITY: No authorization check
  // VULNERABILITY: SQL Injection
  const { username, password, email, role } = userData;
  const query = `UPDATE users SET username = '${username}', password = '${password}', email = '${email}', role = '${role}' WHERE id = ${id}`;
  return executeQuery(query);
};

const deleteUser = async (id) => {
  // VULNERABILITY: No authorization check
  // VULNERABILITY: SQL Injection
  const query = `DELETE FROM users WHERE id = ${id}`;
  return executeQuery(query);
};

const searchUsers = async (searchTerm) => {
  // VULNERABILITY: No input sanitization
  // VULNERABILITY: SQL Injection
  const query = `SELECT * FROM users WHERE username LIKE '%${searchTerm}%' OR email LIKE '%${searchTerm}%'`;
  return executeQuery(query);
};

// VULNERABILITY: Exposing database connection
const getDatabase = () => {
  return db;
};

// VULNERABILITY: No connection cleanup
const closeDatabase = () => {
  if (db) {
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
        // VULNERABILITY: Not handling close errors
      } else {
        console.log('Database connection closed');
      }
    });
  }
};

// Initialize database on module load
initDatabase();

module.exports = {
  initDatabase,
  executeQuery,
  getUserByUsername,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUsers,
  getDatabase,
  closeDatabase
};
