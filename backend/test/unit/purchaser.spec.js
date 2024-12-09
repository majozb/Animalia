import { expect } from 'chai';
import request from 'supertest';
import { Purchaser } from '../../src/models/purchaser.js';
import { Pet } from '../../src/models/pet.js';
import { app } from '../../src/index.js';

const Purchaser1 = {
  name: 'Juan',
  user: 'juanito23',
  password: '123456',
  pets: [],
  points: 0,
  purchases: [],
};

const Purchaser2 = {
  name: 'Maria',
  user: 'maria00',
  password: '123456',
  email: 'maria@gmail.com',
  phone: '635998653',
  pets: [],
  points: 0,
  purchases: [],
};

const Purchaser3 = {
  name: 'Alberto',
  user: 'alberto00',
  password: '123456',
  email: 'alberto@gmail.com',
  phone: '635998653',
  pets: [],
  points: 0,
  purchases: [],
};

const Rabbit2 = {
  name: 'Bugs Bunny2',
  description: 'Conejo muy juguetón',
  type: 'Rabbit',
  breed: 'Mini Lop',
  vaccines: ['Rabia'],
  images: ["image1", "image2", "image3"],
  birthDate: new Date('2018-01-01'),
  genre: false,
};

let purchaser;

beforeEach(async () => {
  await Purchaser.deleteMany();
  purchaser = await new Purchaser(Purchaser1).save();
});

describe('Purchaser routes', () => {
  context('GET /purchasers', () => {
    it('should return all purchasers', async () => {
      const res = await request(app).get('/purchasers');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });
    it('should return one purchaser', async () => {
      const res = await request(app).get(`/purchasers`);
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(1);
    });
    it('return two purchasers', async () => {
      await new Purchaser(Purchaser2).save();
      const res = await request(app).get('/purchasers');
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
    });
    it('return three purchasers', async () => {
      await new Purchaser(Purchaser2).save();
      await new Purchaser(Purchaser3).save();
      const res = await request(app).get('/purchasers');
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(3);
    });
    it('return one purchaser with the name Juan', async () => {
      const res = await request(app).get('/purchasers');
      let alberto = res.body.filter((purchaser) => purchaser.name === 'Juan');
      expect(res.status).to.equal(200);
      expect(alberto[0].name).to.equal('Juan');
    });
  });
  context('GET /purchasers/:id', () => {
    it('should return a 404 if the purchaser is not found', async () => {
      const res = await request(app).get('/purchasers/6738a7d061407fe740b46975');
      expect(res.status).to.equal(404);
    });
    it('should return a 400 if the id is invalid', async () => {
      const res = await request(app).get('/purchasers/123');
      expect(res.status).to.equal(400);
    });
    it('should return a purchaser by id', async () => {
      purchaser = await Purchaser.findOne();
      const res = await request(app).get(`/purchasers/${purchaser._id}`);
      expect(res.status).to.equal(200);
      expect(res.body.name).to.equal('Juan');
    });
    it('should return a purchaser by id with pets', async () => {
      purchaser = await new Purchaser(Purchaser2).save();
      const pet = await new Pet(Rabbit2).save();
      purchaser.pets.push(pet);
      const res = await request(app).get(`/purchasers/${purchaser._id}`);
      expect(res.status).to.equal(200);
      expect(res.body.pets).to.be.an('array');
    });
    it('should return a purchaser by id with wishlist', async () => {
      purchaser = await Purchaser.findOne();
      const res = await request(app).get(`/purchasers/${purchaser._id}`);
      expect(res.status).to.equal(200);
      expect(res.body.wishlist).to.be.an('array');
    });
  });
  context('POST /purchasers', () => {
    it('should create a new purchaser', async () => {
      const res = await request(app).post('/purchasers').send(Purchaser2);
      expect(res.status).to.equal(201);
      expect(res.body.name).to.equal('Maria');
    });
    it('should return a 400 if the password is not provided', async () => {
      const res = await request(app).post('/purchasers').send({ ...Purchaser2, password: '' });
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('Name, user and password are required');
    });
    it('should return a 400 if the password is not provided', async () => {
      const res = await request(app).post('/purchasers').send({ ...Purchaser1, password: '123' });
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('Password must be at least 6 characters');
    });
    it('should return a 201 if the email is not provided', async () => {
      const res = await request(app).post('/purchasers').send(Purchaser2);
      expect(res.status).to.equal(201);
    });
    it('should return a 201 if the phone is not provided', async () => {
      const res = await request(app).post('/purchasers').send(Purchaser2);
      expect(res.status).to.equal(201);
    });
    it('should return a 400 if the user is not unique', async () => {
      const res = await request(app).post('/purchasers').send(Purchaser1);
      expect(res.status).to.equal(400);
    });
  });
  context('PUT /purchasers/:id', () => {
    it('should update a purchaser', async () => {
      purchaser = await Purchaser.findOne();
      const res = await request(app).put(`/purchasers/${purchaser._id}`).send({ name: 'Pedro' });
      expect(res.status).to.equal(200);
      expect(res.body.name).to.equal('Pedro');
    });
    it('should return a 404 if the purchaser is not found', async () => {
      const res = await request(app).put('/purchasers/6738a7d061407fe740b46975').send({ name: 'Pedro' });
      expect(res.status).to.equal(404);
    });
    it('should return a 400 if the id is invalid', async () => {
      const res = await request(app).put('/purchasers/123').send({ points: 100 });
      expect(res.status).to.equal(400);
    });
    it('should return a 400 if the updates are invalid', async () => {
      const res = await request(app).put(`/purchasers/${purchaser._id}`).send({ points: 400, age: 33 });
      expect(res.status).to.equal(400);
    });
    it('should return a 200 if the password is updated', async () => {
      purchaser = await Purchaser.findOne();
      const res = await request(app).put(`/purchasers/${purchaser._id}`).send({ password: '1234567' });
      expect(res.status).to.equal(200);
    });
  });
  context('DELETE /purchasers/:id', () => {
    it('should delete a purchaser', async () => {
      purchaser = await Purchaser.findOne();
      const res = await request(app).delete(`/purchasers/${purchaser._id}`);
      expect(res.status).to.equal(200);
    });
    it('should return a 404 if the purchaser is not found', async () => {
      const res = await request(app).delete('/purchasers/6738a7d061407fe740b46975');
      expect(res.status).to.equal(404);
    });
    it('should return a 400 if the id is invalid', async () => {
      const res = await request(app).delete('/purchasers/123');
      expect(res.status).to.equal(400);
    });
    it('should return a 404 if the purchaser was already deleted', async () => {
      purchaser = await Purchaser.findOne();
      await request(app).delete(`/purchasers/${purchaser._id}`);
      const res = await request(app).delete(`/purchasers/${purchaser._id}`);
      expect(res.status).to.equal(404);
    });
    it('should return a 200 if the purchaser is deleted', async () => {
      purchaser = await new Purchaser(Purchaser2).save();
      const res = await request(app).delete(`/purchasers/${purchaser._id}`);
      expect(res.status).to.equal(200);
    });
  });
});