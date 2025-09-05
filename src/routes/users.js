const express = require('express');
const router = express.Router();
const db = require('../utils/database');

// Get all users endpoint with vulnerabilities
router.get('/', async (req, res) => {
  try {
    // VULNERABILITY: No authentication check
    // VULNERABILITY: No authorization check
    // VULNERABILITY: SQL Injection
    const query = `SELECT * FROM users WHERE role = '${req.query.role || 'user'}'`;
    
    // Simulate database query
    console.log('Executing query:', query);
    
    // VULNERABILITY: Returning sensitive data
    const users = [
      {
        id: 1,
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123', // VULNERABILITY: Exposing passwords
        role: 'admin',
        created_at: '2023-01-01'
      },
      {
        id: 2,
        username: 'user1',
        email: 'user1@example.com',
        password: 'password123', // VULNERABILITY: Exposing passwords
        role: 'user',
        created_at: '2023-01-02'
      }
    ];

    res.json({
      users: users,
      count: users.length,
      query: query // VULNERABILITY: Exposing internal query
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch users',
      details: error.message, // VULNERABILITY: Error details exposure
      stack: error.stack // VULNERABILITY: Stack trace exposure
    });
  }
});

// Get user by ID with vulnerabilities
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    
    // VULNERABILITY: No input validation
    // VULNERABILITY: SQL Injection
    const query = `SELECT * FROM users WHERE id = ${userId}`;
    
    console.log('Executing query:', query);
    
    // VULNERABILITY: No user existence check
    const user = {
      id: parseInt(userId),
      username: 'user' + userId,
      email: `user${userId}@example.com`,
      password: 'password123', // VULNERABILITY: Exposing password
      role: 'user',
      created_at: '2023-01-01'
    };

    res.json({
      user: user,
      query: query // VULNERABILITY: Exposing internal query
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch user',
      details: error.message // VULNERABILITY: Error details exposure
    });
  }
});

// Update user endpoint with vulnerabilities
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, password } = req.body;
    
    // VULNERABILITY: No authentication check
    // VULNERABILITY: No authorization check
    // VULNERABILITY: No input validation
    
    // VULNERABILITY: SQL Injection in update
    const updateQuery = `UPDATE users SET username = '${username}', email = '${email}', password = '${password}' WHERE id = ${userId}`;
    
    console.log('Executing update query:', updateQuery);
    
    // VULNERABILITY: No password hashing
    const updatedUser = {
      id: parseInt(userId),
      username: username,
      email: email,
      password: password, // VULNERABILITY: Storing plain text password
      role: 'user',
      updated_at: new Date().toISOString()
    };

    res.json({
      message: 'User updated successfully',
      user: updatedUser,
      query: updateQuery // VULNERABILITY: Exposing internal query
    });

  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ 
      error: 'Failed to update user',
      details: error.message // VULNERABILITY: Error details exposure
    });
  }
});

// Delete user endpoint with vulnerabilities
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    
    // VULNERABILITY: No authentication check
    // VULNERABILITY: No authorization check
    // VULNERABILITY: No input validation
    
    // VULNERABILITY: SQL Injection in delete
    const deleteQuery = `DELETE FROM users WHERE id = ${userId}`;
    
    console.log('Executing delete query:', deleteQuery);
    
    res.json({
      message: 'User deleted successfully',
      deletedId: userId,
      query: deleteQuery // VULNERABILITY: Exposing internal query
    });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ 
      error: 'Failed to delete user',
      details: error.message // VULNERABILITY: Error details exposure
    });
  }
});

// Search users endpoint with vulnerabilities
router.get('/search/:term', async (req, res) => {
  try {
    const searchTerm = req.params.term;
    
    // VULNERABILITY: No input validation or sanitization
    // VULNERABILITY: SQL Injection
    const query = `SELECT * FROM users WHERE username LIKE '%${searchTerm}%' OR email LIKE '%${searchTerm}%'`;
    
    console.log('Executing search query:', query);
    
    const users = [
      {
        id: 1,
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123', // VULNERABILITY: Exposing passwords
        role: 'admin'
      }
    ];

    res.json({
      users: users,
      searchTerm: searchTerm,
      query: query // VULNERABILITY: Exposing internal query
    });

  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({ 
      error: 'Search failed',
      details: error.message // VULNERABILITY: Error details exposure
    });
  }
});

module.exports = router;
