const request = require('supertest');
const app = require('../src/app');

describe('Application Tests', () => {
  
  describe('GET /', () => {
    it('should return application info', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);
      
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('endpoints');
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);
      
      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('version');
    });
  });

  describe('Authentication Endpoints', () => {
    describe('POST /api/auth/login', () => {
      it('should login with valid credentials', async () => {
        const response = await request(app)
          .post('/api/auth/login')
          .send({
            username: 'admin',
            password: 'admin123'
          })
          .expect(200);
        
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('user');
      });

      it('should reject invalid credentials', async () => {
        const response = await request(app)
          .post('/api/auth/login')
          .send({
            username: 'invalid',
            password: 'invalid'
          })
          .expect(401);
        
        expect(response.body).toHaveProperty('error');
      });
    });

    describe('POST /api/auth/register', () => {
      it('should register a new user', async () => {
        const response = await request(app)
          .post('/api/auth/register')
          .send({
            username: 'testuser',
            password: 'testpass',
            email: 'test@example.com'
          })
          .expect(201);
        
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('user');
      });
    });
  });

  describe('User Management Endpoints', () => {
    describe('GET /api/users', () => {
      it('should return users list', async () => {
        const response = await request(app)
          .get('/api/users')
          .expect(200);
        
        expect(response.body).toHaveProperty('users');
        expect(response.body).toHaveProperty('count');
      });
    });

    describe('GET /api/users/:id', () => {
      it('should return specific user', async () => {
        const response = await request(app)
          .get('/api/users/1')
          .expect(200);
        
        expect(response.body).toHaveProperty('user');
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle 404 errors', async () => {
      const response = await request(app)
        .get('/nonexistent')
        .expect(404);
      
      expect(response.body).toHaveProperty('error');
    });
  });
});
