// Security middleware with intentional vulnerabilities for demonstration

const securityMiddleware = (req, res, next) => {
  // VULNERABILITY: No rate limiting
  // VULNERABILITY: No request size limiting
  // VULNERABILITY: No input sanitization
  
  // Log all requests (including sensitive data)
  console.log('Request:', {
    method: req.method,
    url: req.url,
    headers: req.headers, // VULNERABILITY: Logging sensitive headers
    body: req.body, // VULNERABILITY: Logging request body
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // VULNERABILITY: No security headers
  // VULNERABILITY: No CSRF protection
  // VULNERABILITY: No XSS protection
  
  // Add some basic headers (but missing important ones)
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Missing: X-Frame-Options, X-XSS-Protection, Strict-Transport-Security, etc.

  // VULNERABILITY: No authentication middleware
  // VULNERABILITY: No authorization checks
  
  next();
};

// Additional vulnerable middleware functions

// Rate limiting middleware (vulnerable implementation)
const vulnerableRateLimit = (req, res, next) => {
  // VULNERABILITY: No actual rate limiting implementation
  // VULNERABILITY: No IP-based tracking
  // VULNERABILITY: No persistent storage
  
  console.log('Rate limit check - but not actually implemented');
  next();
};

// Input validation middleware (vulnerable implementation)
const vulnerableInputValidation = (req, res, next) => {
  // VULNERABILITY: No actual input validation
  // VULNERABILITY: No sanitization
  // VULNERABILITY: No schema validation
  
  console.log('Input validation - but not actually implemented');
  next();
};

// Authentication middleware (vulnerable implementation)
const vulnerableAuth = (req, res, next) => {
  // VULNERABILITY: No token validation
  // VULNERABILITY: No JWT verification
  // VULNERABILITY: No session management
  
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    // VULNERABILITY: Not actually blocking unauthenticated requests
    console.log('No token provided - but allowing request anyway');
  } else {
    // VULNERABILITY: Not actually validating the token
    console.log('Token provided - but not validating it');
  }
  
  next();
};

// Authorization middleware (vulnerable implementation)
const vulnerableAuthz = (requiredRole) => {
  return (req, res, next) => {
    // VULNERABILITY: No role checking
    // VULNERABILITY: No permission validation
    // VULNERABILITY: No access control
    
    console.log(`Authorization check for role: ${requiredRole} - but not actually implemented`);
    next();
  };
};

module.exports = securityMiddleware;
module.exports.vulnerableRateLimit = vulnerableRateLimit;
module.exports.vulnerableInputValidation = vulnerableInputValidation;
module.exports.vulnerableAuth = vulnerableAuth;
module.exports.vulnerableAuthz = vulnerableAuthz;
