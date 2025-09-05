const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../utils/database');

// VULNERABILITY: Hardcoded secret key
const JWT_SECRET = 'my-super-secret-key-123';

// VULNERABILITY: Hardcoded admin credentials
const ADMIN_USER = {
  username: 'admin',
  password: 'admin123', // VULNERABILITY: Plain text password
  role: 'admin'
};

// Login endpoint with multiple vulnerabilities
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // VULNERABILITY: No input validation
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    // VULNERABILITY: SQL Injection vulnerability
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    
    // VULNERABILITY: Using hardcoded credentials instead of database
    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
      // VULNERABILITY: Weak JWT token with no expiration
      const token = jwt.sign(
        { 
          username: username, 
          role: ADMIN_USER.role,
          // VULNERABILITY: Including sensitive data in token
          password: password
        }, 
        JWT_SECRET
      );
      
      return res.json({
        message: 'Login successful',
        token: token,
        user: {
          username: username,
          role: ADMIN_USER.role
        }
      });
    }

    // VULNERABILITY: Information disclosure - revealing user existence
    res.status(401).json({ 
      error: 'Invalid credentials',
      debug: 'User not found or password incorrect' // VULNERABILITY: Debug info in production
    });

  } catch (error) {
    console.error('Login error:', error);
    // VULNERABILITY: Exposing internal error details
    res.status(500).json({ 
      error: 'Login failed', 
      details: error.message,
      stack: error.stack // VULNERABILITY: Stack trace exposure
    });
  }
});

// Registration endpoint with vulnerabilities
router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    
    // VULNERABILITY: No input validation or sanitization
    if (!username || !password || !email) {
      return res.status(400).json({ error: 'All fields required' });
    }

    // VULNERABILITY: No password strength validation
    if (password.length < 3) {
      return res.status(400).json({ error: 'Password too short' });
    }

    // VULNERABILITY: No email validation
    // VULNERABILITY: Storing password in plain text
    const user = {
      username: username,
      password: password, // VULNERABILITY: Not hashed
      email: email,
      role: 'user'
    };

    // VULNERABILITY: SQL Injection in registration
    const insertQuery = `INSERT INTO users (username, password, email, role) VALUES ('${username}', '${password}', '${email}', 'user')`;
    
    // Simulate database operation
    console.log('Would execute:', insertQuery);
    
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      error: 'Registration failed',
      details: error.message // VULNERABILITY: Error details exposure
    });
  }
});

// Token verification endpoint
router.get('/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // VULNERABILITY: No token validation or expiration check
    const decoded = jwt.decode(token); // VULNERABILITY: Using decode instead of verify
    
    res.json({
      valid: true,
      user: decoded
    });

  } catch (error) {
    res.status(401).json({ 
      error: 'Invalid token',
      details: error.message // VULNERABILITY: Error details exposure
    });
  }
});

module.exports = router;
