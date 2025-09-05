// Test setup file
const { execSync } = require('child_process');

// Setup test environment
process.env.NODE_ENV = 'test';
process.env.PORT = '3001';

// Global test timeout
jest.setTimeout(10000);

// Cleanup after tests
afterAll(() => {
  // Clean up any test databases or files
  try {
    execSync('rm -f test-database.sqlite', { stdio: 'ignore' });
  } catch (error) {
    // Ignore cleanup errors
  }
});
