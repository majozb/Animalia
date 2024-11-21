import { expect } from 'chai';
import request from 'supertest';
import { Admin } from '../models/admin.js';
import { app } from '../index.js';

const admin1 = {
  name: 'Juan Carlos',
  user: 'juanca',
  password: '123456',
  email: 'juanca@gmail.com',
};

const adminWithPets = {
  name: 'Pedro',
  user: 'pedro',
  password: '123456',
  email: 'pedrito@gmail.com',
  pets: [],
};

let admin;

beforeEach(async () => {
  await Admin.deleteMany();
  admin = await new Admin(admin1).save();
});

describe('Admin routes', () => {
  context('GET /admins', () => {
    it('return one admin', async () => {
      let res = await request(app).get('/admins');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(1);
    });
    it('returns an empty array if there are no admins', async () => {
      await Admin.deleteMany();
      let res = await request(app).get('/admins');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(0);
    });
    it('return two admins', async () => {
      await new Admin(adminWithPets).save();
      let res = await request(app).get('/admins');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(2);
    });
  });
  context('GET /admins/:id', () => {
    it('returns an admin by id', async () => {
      const response = await request(app).get(`/admins/${admin._id}`);
      expect(response.statusCode).to.equal(200);
      expect(response.body.name).to.equal(admin.name);
    });
    it('returns 404 if the admin is not found', async () => {
      const response = await request(app).get('/admins/6738a7d061407fe740b46994');
      expect(response.statusCode).to.equal(404);
    });
    it('returns 400 if the id is invalid', async () => {
      const response = await request(app).get('/admins/123');
      expect(response.statusCode).to.equal(400);
    });
  });
  context('POST /admins', () => {
    it('creates a new admin', async () => {
      const response = await request(app).post('/admins').send(adminWithPets);
      expect(response.statusCode).to.equal(201);
    });
    it('returns 400 if the request is invalid', async () => {
      const response = await request(app).post('/admins').send({});
      expect(response.statusCode).to.equal(400);
    });
    it('returns 400 if the email is invalid', async () => {
      const response = await request(app).post('/admins').send({ email: 'juanca' });
      expect(response.statusCode).to.equal(400);
    });
  });
  context('PUT /admins/:id', () => {
    it('updates an admin', async () => {
      const response = await request(app).put(`/admins/${admin._id}`).send({ name: 'Juan Carlos' });
      expect(response.statusCode).to.equal(200);
    });
    it('returns 404 if the admin is not found', async () => {
      const response = await request(app).put('/admins/6738a7d061407fe740b46994').send({ name: 'Juan Carlos' });
      expect(response.statusCode).to.equal(404);
    });
    it('returns 400 if the id is invalid', async () => {
      const response = await request(app).put('/admins/123').send({ name: 'Juan Carlos' });
      expect(response.statusCode).to.equal(400);
    });
  });
  context('DELETE /admins/:id', () => {
    it('deletes an admin', async () => {
      const response = await request(app).delete(`/admins/${admin._id}`);
      expect(response.statusCode).to.equal(200);
    });
    it('returns 404 if the admin is not found', async () => {
      const response = await request(app).delete('/admins/6738a7d061407fe740b46994');
      expect(response.statusCode).to.equal(404);
    });
    it('returns 400 if the id is invalid', async () => {
      const response = await request(app).delete('/admins/123');
      expect(response.statusCode).to.equal(400);
    });
  });
});