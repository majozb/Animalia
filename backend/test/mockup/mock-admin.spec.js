import { expect } from 'chai';
import request from 'supertest';
import sinon from 'sinon';
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
  });

  context('POST /admins', () => {
    it('creates a new admin', async () => {
      saveStub.resolves(admin);  // Simula que el admin se guarda correctamente
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
      saveStub.resolves(admin);  // Simula que el admin se guarda después de ser actualizado
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
  });

  context('DELETE /admins/:id', () => {
    it('deletes an admin', async () => {
      findByIdAndDeleteStub.resolves(admin);  // Simula que encuentra y elimina al admin
      const response = await request(app).delete(`/admins/${admin._id}`);
      expect(response.statusCode).to.equal(200);
    });

    it('returns 404 if the admin is not found', async () => {
      findByIdAndDeleteStub.resolves();  // Simula que la eliminación no se realizó
      const response = await request(app).delete('/admins/6738a7d061407fe740b46994');
      expect(response.statusCode).to.equal(404);
    });

    it('returns 404 if the id is invalid', async () => {
      findByIdAndDeleteStub.resolves(); 
      const response = await request(app).delete('/admins/123');
      expect(response.statusCode).to.equal(404);
    });
  });
});
