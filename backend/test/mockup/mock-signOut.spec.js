import request from 'supertest';
import { expect } from 'chai';
import { app } from '../../src/index.js';

describe('signOutRouter', () => {
  it('clears the token cookie on sign-out', async () => {
    const res = await request(app).get('/signOut');

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.deep.equal({ message: 'Sesión cerrada exitosamente' });
  });
});