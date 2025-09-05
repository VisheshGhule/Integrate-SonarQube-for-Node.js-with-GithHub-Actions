# Security Policy

## Security Vulnerabilities in This Demo

This application intentionally contains security vulnerabilities for educational purposes. **DO NOT USE IN PRODUCTION**.

### Identified Vulnerabilities

#### 1. SQL Injection
- **Location**: `src/routes/auth.js`, `src/routes/users.js`, `src/utils/database.js`
- **Description**: Direct string concatenation in SQL queries
- **Risk**: High - Can lead to data breach and unauthorized access
- **Example**: `SELECT * FROM users WHERE username = '${username}'`

#### 2. Hardcoded Secrets
- **Location**: `src/routes/auth.js`
- **Description**: JWT secret and admin credentials hardcoded in source code
- **Risk**: High - Compromises authentication system
- **Example**: `const JWT_SECRET = 'my-super-secret-key-123';`

#### 3. Weak Authentication
- **Location**: `src/routes/auth.js`
- **Description**: No password hashing, weak password validation
- **Risk**: High - Easy password compromise
- **Example**: Storing passwords in plain text

#### 4. CORS Misconfiguration
- **Location**: `src/app.js`
- **Description**: Overly permissive CORS settings
- **Risk**: Medium - Cross-origin attacks
- **Example**: `origin: '*'`

#### 5. Missing Input Validation
- **Location**: All route files
- **Description**: No input sanitization or validation
- **Risk**: Medium - Various injection attacks
- **Example**: Direct use of user input in queries

#### 6. Information Disclosure
- **Location**: Error handling throughout application
- **Description**: Exposing internal error details and stack traces
- **Risk**: Medium - Information leakage
- **Example**: `res.status(500).json({ error: err.message, stack: err.stack })`

#### 7. Missing Security Headers
- **Location**: `src/app.js`, `src/middleware/security.js`
- **Description**: Incomplete security header configuration
- **Risk**: Medium - Various web vulnerabilities
- **Example**: Missing X-Frame-Options, X-XSS-Protection

#### 8. Insecure Dependencies
- **Location**: `package.json`
- **Description**: Outdated packages with known vulnerabilities
- **Risk**: Medium - Supply chain attacks
- **Example**: Using older versions of express, cors

## Security Best Practices (Not Implemented)

### 1. Input Validation and Sanitization
```javascript
// Good practice (not implemented)
const { body, validationResult } = require('express-validator');

app.post('/api/auth/login', [
  body('username').isLength({ min: 3 }).trim().escape(),
  body('password').isLength({ min: 8 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Process request
});
```

### 2. Parameterized Queries
```javascript
// Good practice (not implemented)
const getUserByUsername = async (username) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  return executeQuery(query, [username]);
};
```

### 3. Password Hashing
```javascript
// Good practice (not implemented)
const bcrypt = require('bcrypt');
const saltRounds = 12;

const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
```

### 4. Environment Variables
```javascript
// Good practice (not implemented)
const JWT_SECRET = process.env.JWT_SECRET;
const DB_PASSWORD = process.env.DB_PASSWORD;
```

### 5. Security Headers
```javascript
// Good practice (not implemented)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  },
  crossOriginEmbedderPolicy: false
}));
```

## SonarQube Integration

This project integrates with SonarQube to automatically detect and report these vulnerabilities:

1. **Code Quality Gates**: Enforce minimum code quality standards
2. **Security Hotspots**: Identify potential security issues
3. **Vulnerability Detection**: Find known security vulnerabilities
4. **Code Smells**: Detect maintainability issues
5. **Coverage Reports**: Ensure adequate test coverage

## Remediation Steps

1. **Immediate Actions**:
   - Move all secrets to environment variables
   - Implement parameterized database queries
   - Add password hashing with bcrypt
   - Configure proper CORS policies

2. **Short-term Actions**:
   - Add comprehensive input validation
   - Implement proper error handling
   - Add security headers
   - Update all dependencies

3. **Long-term Actions**:
   - Implement rate limiting
   - Add authentication middleware
   - Set up monitoring and logging
   - Regular security audits

## Reporting Security Issues

If you find additional security vulnerabilities in this demo:

1. Do not create public issues
2. Contact the maintainer directly
3. Provide detailed reproduction steps
4. Include potential impact assessment

## Disclaimer

This application is for educational purposes only and demonstrates common security vulnerabilities. It should never be deployed to production environments.
