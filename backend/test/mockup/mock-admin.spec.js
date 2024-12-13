import { expect } from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import bcrypt from 'bcryptjs';
import { Admin } from '../../src/models/admin.js';
import { app } from '../../src/index.js';
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
let findStub;
let findIdStub;
let saveStub;
let findByIdAndDeleteStub;
let bcryptStub;

beforeEach(() => {
  findStub = sinon.stub(Admin, 'find');
  findIdStub = sinon.stub(Admin, 'findById');
  saveStub = sinon.stub(Admin.prototype, 'save');
  findByIdAndDeleteStub = sinon.stub(Admin, 'findByIdAndDelete');

  admin = new Admin(admin1);
  findStub.resolves([admin]);
  findIdStub.resolves(admin);
  saveStub.resolves(admin);
  findByIdAndDeleteStub.resolves(admin);
  bcryptStub = sinon.stub(bcrypt, 'hash').resolves('hashedPassword123'); // Simulates the password hash
});

afterEach(() => {
  sinon.restore();
});

describe('Admin routes mockup', () => {
  context('GET /admins', () => {
    it('returns one admin', async () => {
      let res = await request(app).get('/admins');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(1);
    });

    it('returns an empty array if there are no admins', async () => {
      findStub.resolves([]);
      let res = await request(app).get('/admins');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(0);
    });

    it('returns two admins', async () => {
      const adminWithSecond = { ...adminWithPets, _id: 'new-id' };
      findStub.resolves([admin, adminWithSecond]);
      let res = await request(app).get('/admins');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(2);
    });

    // Simulates an error when trying to get all admins
    it('returns 400 if there is an error', async () => {
      findStub.rejects();
      let res = await request(app).get('/admins');
      expect(res.statusCode).to.equal(400);
    });
  });

  context('GET /admins/:id', () => {
    it('returns an admin by id', async () => {
      findIdStub.resolves(admin);
      const response = await request(app).get(`/admins/${admin._id}`);
      expect(response.statusCode).to.equal(200);
      expect(response.body.name).to.equal(admin.name);
    });

    it('returns 404 if the admin is not found', async () => {
      findIdStub.resolves();
      const response = await request(app).get('/admins/6738a7d061407fe740b46994');
      expect(response.statusCode).to.equal(404);
    });

    it('returns 404 if the id is invalid', async () => {
      findIdStub.resolves();
      const response = await request(app).get('/admins/123');
      expect(response.statusCode).to.equal(404);
    });

    // Simulates an error when trying to get an admin by id
    it('returns 400 if there is an error', async () => {
      findIdStub.rejects();
      const response = await request(app).get(`/admins/${admin._id}`);
      expect(response.statusCode).to.equal(400);
    });
  });

  context('POST /admins', () => {
    it('creates a new admin', async () => {
      saveStub.resolves(admin); // Simulates that the admin is saved
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
    it('returns 400 if the password is invalid', async () => {
      const response = await request(app).post('/admins').send({ password: '123' });
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property('error');
    });
    it('returns 400 if the password is invalid', async () => {

      const response = await request(app).post('/admins').send({ ...adminWithPets, password: '123' });
      expect(response.body.error).to.equal('Password must be at least 6 characters');
    });
    it('returns 400 if the user is invalid', async () => {
      const response = await request(app).post('/admins').send({ user: 'juanca' });
      expect(response.statusCode).to.equal(400);
    });
    it('returns 400 if the admin is not saved', async () => {
      saveStub.rejects();
      const response = await request(app).post('/admins').send(adminWithPets);
      expect(response.statusCode).to.equal(400);
    });
  });

  context('PUT /admins/:id', () => {
    it('updates an admin', async () => {
      saveStub.resolves(admin);  // Simulates that the admin is saved after the update
      const response = await request(app).put(`/admins/${admin._id}`).send({ name: 'Juan Carlos' });
      expect(response.statusCode).to.equal(200);
    });

    it('returns 404 if the admin is not found', async () => {
      findIdStub.resolves();
      const response = await request(app).put('/admins/6738a7d061407fe740b46994').send({ name: 'Juan Carlos' });
      expect(response.statusCode).to.equal(404);
    });

    it('returns 404 if the id is invalid', async () => {
      findIdStub.resolves();
      const response = await request(app).put('/admins/123').send({ name: 'Juan Carlos' });
      expect(response.statusCode).to.equal(404);
    });
    
    it('returns 400 if the update is invalid', async () => {
      saveStub.resolves(admin);
      const response = await request(app).put(`/admins/${admin._id}`).send({ medication: 'new-medication' });
      expect(response.statusCode).to.equal(400);
    });

    it('should update admin and add petId if provided', async () => {
      const petId = '6738a7d061407fe740b46994';
      saveStub.resolves(admin);
      const response = await request(app).put(`/admins/${admin._id}`).send({ petId });
      expect(response.statusCode).to.equal(200);
      expect(admin.pets).to.include(petId);
      expect(admin.pets).to.have.lengthOf(1);
    });
    it('should hash the password if provided', async () => {
      const newPassword = 'newPassword123';
      const response = await request(app).put(`/admins/${admin._id}`).send({ password: newPassword });
      expect(bcryptStub.calledWith(newPassword, 8)).to.be.true;
      expect(response.statusCode).to.equal(200);
      expect(response.body.password).to.equal('hashedPassword123');
    });

    it('should not hash the password if not provided', async () => {
      const response = await request(app)
        .put(`/admins/${admin._id}`)
        .send({ name: 'Juan Carlos' });

      expect(response.statusCode).to.equal(200);
      expect(response.body.password).to.equal(admin.password);
    });
    it('returns 400 if the admin is not saved', async () => {
      saveStub.rejects();
      const response = await request(app).put(`/admins/${admin._id}`).send({ name: 'Juan Carlos' });
      expect(response.statusCode).to.equal(400);
    });
  });

  context('PUT /admins/:id/removePet', () => {
    it('removes a pet from an admin', async () => {
      admin.pets.push('6738a7d061407fe740b46994');
      saveStub.resolves(admin);
      const response = await request(app).put(`/admins/${admin._id}/removePet`).send({ petId: '6738a7d061407fe740b46994' });
      expect(response.statusCode).to.equal(200);
      expect(admin.pets).to.have.lengthOf(0);
    });

    it('returns 404 if the admin is not found', async () => {
      findIdStub.resolves();
      const response = await request(app).put('/admins/6738a7d061407fe740b46994/removePet').send({ petId: '6738a7d061407fe740b46994' });
      expect(response.statusCode).to.equal(404);
    });

    it('returns 404 if the pet is not in the admin pets list', async () => {
      saveStub.resolves(admin);
      const response = await request(app).put(`/admins/${admin._id}/removePet`).send({ petId: '6738a7d061407fe740b46994' });
      expect(response.statusCode).to.equal(404);
    });

    it('returns 400 if the admin is not saved', async () => {
      admin.pets.push('6738a7d061407fe740b46994');
      findIdStub.resolves(admin);
      saveStub.rejects(new Error('Failed to save admin'));

      const response = await request(app).put(`/admins/${admin._id}/removePet`).send({ petId: '6738a7d061407fe740b46994' });

      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property('error', 'Failed to save admin');
    });
  });

  context('DELETE /admins/:id', () => {
    it('deletes an admin', async () => {
      findByIdAndDeleteStub.resolves(admin);  // Simulates that the admin is deleted
      const response = await request(app).delete(`/admins/${admin._id}`);
      expect(response.statusCode).to.equal(200);
    });

    it('returns 404 if the admin is not found', async () => {
      findByIdAndDeleteStub.resolves();
      const response = await request(app).delete('/admins/6738a7d061407fe740b46994');
      expect(response.statusCode).to.equal(404);
    });

    it('returns 404 if the id is invalid', async () => {
      findByIdAndDeleteStub.resolves();
      const response = await request(app).delete('/admins/123');
      expect(response.statusCode).to.equal(404);
    });

    it('returns 400 if the admin is not deleted', async () => {
      findByIdAndDeleteStub.rejects();
      const response = await request(app).delete(`/admins/${admin._id}`);
      expect(response.statusCode).to.equal(400);
    });
  });
});
