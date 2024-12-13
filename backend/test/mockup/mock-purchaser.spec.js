import { expect } from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import { Purchaser } from '../../src/models/purchaser.js';
import { Pet } from '../../src/models/pet.js';
import { app } from '../../src/index.js';

const Purchaser1 = {
  _id: '60b5e4a1c3f2b8a7a4c9e7c8',
  name: 'Juan',
  user: 'juanito23',
  password: '123456',
  pets: [],
  points: 0,
  wishlist: [],
};

const Purchaser2 = {
  _id: '60b5e4a1c3f2b8a7a4c9e7d9',
  name: 'Maria',
  user: 'maria00',
  password: '123456',
  email: 'maria@gmail.com',
  phone: '635998653',
  pets: [],
  points: 0,
  wishlist: [],
};

let findStub, findByIdStub, saveStub, findByIdAndDeleteStub;
let purchaser;

beforeEach(() => {
  findStub = sinon.stub(Purchaser, 'find');
  findByIdStub = sinon.stub(Purchaser, 'findById');
  saveStub = sinon.stub(Purchaser.prototype, 'save');
  findByIdAndDeleteStub = sinon.stub(Purchaser, 'findByIdAndDelete');

  purchaser = new Purchaser(Purchaser1);
  saveStub.resolves(purchaser);
  findStub.resolves([purchaser]);
  findByIdStub.resolves(purchaser);
  findByIdAndDeleteStub.resolves(purchaser);
});

afterEach(() => {
  sinon.restore();
});

describe('Purchaser routes with Sinon mocks', () => {
  context('GET /purchasers', () => {
    it('returns all purchasers', async () => {
      const res = await request(app).get('/purchasers');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(1);
    });

    it('returns an empty array if there are no purchasers', async () => {
      findStub.resolves([]);
      const res = await request(app).get('/purchasers');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(0);
    });

    it('returns two purchasers', async () => {
      findStub.resolves([purchaser, { ...Purchaser2 }]);
      const res = await request(app).get('/purchasers');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(2);
    });

    it('returns 400 if there is an error', async () => {
      findStub.rejects();
      const res = await request(app).get('/purchasers');
      expect(res.statusCode).to.equal(400);
    });
  });

  context('GET /purchasers/:id', () => {
    it('returns a purchaser by id', async () => {
      const res = await request(app).get(`/purchasers/${Purchaser1._id}`);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property('name', Purchaser1.name);
    });

    it('returns 404 if the purchaser is not found', async () => {
      findByIdStub.resolves(null);
      const res = await request(app).get('/purchasers/60b5e4a1c3f2b8a7a4c9e7e0');
      expect(res.statusCode).to.equal(404);
    });

    it('returns 404 if the id is invalid', async () => {
      findByIdStub.resolves(null);
      const res = await request(app).get('/purchasers/123');
      expect(res.statusCode).to.equal(404);
    });

    it('returns 400 if there is an error', async () => {
      findByIdStub.rejects();
      const res = await request(app).get(`/purchasers/${Purchaser1._id}`);
      expect(res.statusCode).to.equal(400);
    });
  });

  context('POST /purchasers', () => {
    it('creates a new purchaser', async () => {
      saveStub.resolves(new Purchaser(Purchaser2));
      const res = await request(app).post('/purchasers').send(Purchaser2);
      expect(res.statusCode).to.equal(201);
      expect(res.body).to.have.property('name', Purchaser2.name);
    });

    it('returns 400 if data is incomplete', async () => {
      const res = await request(app).post('/purchasers').send({ name: 'Invalid' });
      expect(res.statusCode).to.equal(400);
    });

    it('returns 400 if password is less than 6 characters', async () => {
      const res = await request(app).post('/purchasers').send({ ...Purchaser2, password: '123' });
      expect(res.statusCode).to.equal(400);
    });

    it('returns 400 if there is an error', async () => {
      saveStub.rejects();
      const res = await request(app).post('/purchasers').send(Purchaser2);
      expect(res.statusCode).to.equal(400);
      expect(res.body).to.have.property('error');
    });
  });

  context('PUT /purchasers/:id', () => {
    it('updates a purchaser', async () => {
      findByIdStub.resolves(purchaser);
      saveStub.resolves({ ...purchaser, name: 'Updated Name' });

      const res = await request(app)
        .put(`/purchasers/${Purchaser1._id}`)
        .send({ name: 'Updated Name' });
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property('name', 'Updated Name');
    });

    it('returns 404 if the purchaser is not found', async () => {
      findByIdStub.resolves(null);
      const res = await request(app).put('/purchasers/60b5e4a1c3f2b8a7a4c9e7e0').send({ name: 'Updated Name' });
      expect(res.statusCode).to.equal(404);
    });

    it('returns 404 if the id is invalid', async () => {
      findByIdStub.resolves(null);
      const res = await request(app).put('/purchasers/123').send({ name: 'Updated Name' });
      expect(res.statusCode).to.equal(404);
    });

    it('returns 400 if the update is invalid', async () => {
      saveStub.resolves(purchaser);
      const response = await request(app).put(`/purchasers/${purchaser._id}`).send({ medication: 'new-medication' });
      expect(response.statusCode).to.equal(400);
    });

    it('should update purchaser and add petId if provided', async () => {
      const petId = '6738a7d061407fe740b46994';
      saveStub.resolves(purchaser);
      const response = await request(app).put(`/purchasers/${purchaser._id}`).send({ petId });
      expect(response.statusCode).to.equal(200);
      expect(purchaser.pets).to.include(petId);
      expect(purchaser.pets).to.have.lengthOf(1);
    });

    it('returns 400 if there is an error', async () => {
      findByIdStub.rejects();
      const res = await request(app).put(`/purchasers/${Purchaser1._id}`).send({ name: 'Updated Name' });
      expect(res.statusCode).to.equal(400);
    });
  });

  context('PUT /purchasers/:id/removePet', () => {
    it('removes a pet from the purchaser pets list', async () => {
      const petId = '60b5e4a1c3f2b8a7a4c9e7d9';
      purchaser.pets = [petId];
      saveStub.resolves(purchaser);

      const res = await request(app)
        .put(`/purchasers/${Purchaser1._id}/removePet`)
        .send({ petId });
      expect(res.statusCode).to.equal(200);
      expect(res.body.purchaser.pets).to.be.an('array').with.lengthOf(0);
    });

    it('returns 404 if the purchaser is not found', async () => {
      findByIdStub.resolves(null);
      const res = await request(app).put('/purchasers/60b5e4a1c3f2b8a7a4c9e7e0/removePet').send({ petId: '123' });
      expect(res.statusCode).to.equal(404);
    });

    it('returns 404 if the pet is not found in the purchaser pets list', async () => {
      const petId = '60b5e4a1c3f2b8a7a4c9e7d9';
      purchaser.pets = [];
      saveStub.resolves(purchaser);

      const res = await request(app)
        .put(`/purchasers/${Purchaser1._id}/removePet`)
        .send({ petId });
      expect(res.statusCode).to.equal(404);
    });

    it('returns 400 if there is an error', async () => {
      findByIdStub.rejects();
      const res = await request(app).put(`/purchasers/${Purchaser1._id}/removePet`).send({ petId: '123' });
      expect(res.statusCode).to.equal(400);
    });
  });

  context('DELETE /purchasers/:id', () => {
    it('deletes a purchaser', async () => {
      let deleteOneStub, deleteManyStub;
      deleteManyStub = sinon.stub(Pet, 'deleteMany').resolves();
      deleteOneStub = sinon.stub(Purchaser, 'deleteOne').resolves(purchaser);
      findByIdAndDeleteStub.resolves(purchaser);
      const res = await request(app).delete(`/purchasers/${Purchaser1._id}`);
      expect(res.statusCode).to.equal(200);
    });

    it('returns 404 if the purchaser is not found', async () => {
      findByIdStub.resolves(null);
      const res = await request(app).delete('/purchasers/60b5e4a1c3f2b8a7a4c9e7e11');
      expect(res.statusCode).to.equal(404);
    });

    it('returns 404 if the id is invalid', async () => {
      findByIdStub.resolves(null);
      const res = await request(app).delete('/purchasers/123');
      expect(res.statusCode).to.equal(404);
    });
  });
});
