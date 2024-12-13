import request from 'supertest';
import { expect } from 'chai';
import { app } from '../../src/index.js';

import sinon from 'sinon';

describe('signUpRouter', () => {
  context('POST /signUp', () => {
    it('returns 500 for missing data in request body', async () => {
      const user = {
        name: 'Test Purchaser',
        email: 'test@example.com', // Missing user, password, phone
      };
    
      const res = await request(app).post('/signUp').send(user);
    
      expect(res.statusCode).to.equal(500);
      expect(res.body).to.have.property('error'); // Expect error message
    });

    it('returns 500 for database error', async () => {
      const user = {
        name: 'Test Purchaser',
        user: 'test_purchaser',
        password: 'password123',
        email: 'test@example.com',
        phone: '+1234567890',
      };
    
      const res = await request(app).post('/signUp').send(user);
    
      expect(res.statusCode).to.equal(500);
      expect(res.body).to.have.property('error').to.equal('Error al registrar el comprador');
    
      sinon.restore();
    });

    it('returns 500 for weak password', async () => {
      const user = {
        name: 'Test Purchaser',
        user: 'test_purchaser',
        password: 'weak', // Short password
        email: 'test@example.com',
        phone: '+1234567890',
      };
    
      const res = await request(app).post('/signUp').send(user);
    
      expect(res.statusCode).to.equal(500);
      expect(res.body).to.have.property('error'); // Expect error message about weak password
    });
  });
});