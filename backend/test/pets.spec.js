import { expect } from 'chai';
import request from 'supertest';
import { Pet } from '../src/models/pet.js';
import { app } from '../src/index.js';

const Dog1 = {
  name: 'Juan Carlos',
  description: 'Perro hiperactivo',
  type: 'Dog',
  breed: 'Mestizo',
  vaccines: ['Rabia', 'Moquillo'],
  birthDate: new Date('2020-01-01'),
  images: ["image1", "image2"],
  genre: false,
};

const Cat1 = {
  name: 'Mishifu',
  description: 'GATO NARANJA',
  type: 'Cat',
  breed: 'American wirehair',
  vaccines: ['Rabia'],
  birthDate: new Date('2019-01-01'),
  images: ["image1"],
  genre: true,
};

const Rabbit1 = {
  name: 'Bugs Bunny',
  description: 'Conejo muy juguetón',
  type: 'Rabbit',
  breed: 'Mini Lop',
  vaccines: ['Rabia'],
  images: ["image1", "image2", "image3"],
  birthDate: new Date('2018-01-01'),
  genre: false,
};

let dog;

beforeEach(async () => {
  await Pet.deleteMany();
  dog = await new Pet(Dog1).save();
});

describe('Pet routes', () => {
  context('GET /pets', () => {
    it('return one pet', async () => {
      let res = await request(app).get('/pets');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(1);
    });
    it('returns an empty array if there are no pets', async () => {
      await Pet.deleteMany();
      let res = await request(app).get('/pets');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(0);
    });
    it('return two pets', async () => {
      await new Pet(Cat1).save();
      let res = await request(app).get('/pets');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(2);
    });
    it('return three pets', async () => {
      await new Pet(Rabbit1).save();
      let res = await request(app).get('/pets');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(2);
    });
  });
  context('GET /pets/:id', () => {
    it('returns a pet by id', async () => {
      const response = await request(app).get(`/pets/${dog._id}`);
      expect(response.statusCode).to.equal(200);
      expect(response.body.name).to.equal(dog.name);
    });
    it('returns 404 if the pet is not found', async () => {
      const response = await request(app).get('/pets/6738a7d061407fe740b46994');
      expect(response.statusCode).to.equal(404);
      expect(response.body.error).to.equal('Pet not found');
    });
    it('returns 400 if the id is invalid', async () => {
      const response = await request(app).get('/pets/123');
      expect(response.statusCode).to.equal(400);
    });
  });
  context('POST /pets', () => {
    it('creates a new pet', async () => {
      const response = await request(app).post('/pets').send(Dog1);
      expect(response.statusCode).to.equal(201);
    });
    it('returns 400 if the request is invalid', async () => {
      const response = await request(app).post('/pets').send({});
      expect(response.statusCode).to.equal(400);
    });
    it('returns 400 if the birthDate is invalid', async () => {
      try {
        Dog1.birthDate = '123';
        const response = await request(app).post('/pets').send(Dog1);
        expect(response.statusCode).to.equal(400);
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
    it('returns 400 if the vaccines is invalid', async () => {
      try {
        Dog1.vaccines = '123';
        const response = await request(app).post('/pets').send(Dog1);
        expect(response.statusCode).to.equal(400);
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
    it('returns 400 if the id already exists', async () => {
      try {
        Dog1._id = dog._id;
        const response = await request(app).post('/pets').send(Dog1);
        expect(response.statusCode).to.equal(400);
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
  });
  context('PUT /pets/:id', () => {
    it('updates a pet by id', async () => {
      const response = await request(app).put(`/pets/${dog._id}`).send({ name: 'Juan Carlos II' });
      expect(response.statusCode).to.equal(200);
      expect(response.body.name).to.equal('Juan Carlos II');
    });
    it('returns 404 if the pet is not found', async () => {
      const response = await request(app).put('/pets/6738a7d061407fe740b46994').send({ name: 'Juan Carlos II' });
      expect(response.statusCode).to.equal(404);
      expect(response.body.error).to.equal('Pet not found');
    });
    it('returns 400 if the id is invalid', async () => {
      const response = await request(app).put('/pets/123').send({ name: 'Juan Carlos II' });
      expect(response.statusCode).to.equal(400);
    });
    it('updates the vaccines of a pet', async () => {
      const response = await request(app).put(`/pets/${dog._id}`).send({ vaccines: ['Rabia', 'Moquillo', 'Parvovirus'] });
      expect(response.statusCode).to.equal(200);
    });
    it('returns 400 if the birthDate is invalid', async () => {
      try {
        Dog1.birthDate = '123';
        const response = await request(app).put(`/pets/${dog._id}`).send(Dog1);
        expect(response.statusCode).to.equal(400);
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
    it('updates medications of a pet', async () => {
      const response = await request(app).put(`/pets/${dog._id}`).send({ medication: ['Ivermectina'] });
      expect(response.statusCode).to.equal(200);
    });
  });
  context('DELETE /pets/:id', () => {
    it('deletes a pet by id', async () => {
      const pet = await Pet.findOne();
      const response = await request(app).delete(`/pets/${pet._id}`);
      expect(response.statusCode).to.equal(200);
      expect(response.body._id).to.equal(pet._id.toString());
    });
    it('returns 404 if the pet is not found', async () => {
      const response = await request(app).delete('/pets/6738a7d061407fe740b46994');
      expect(response.statusCode).to.equal(404);
    });
    it('returns 400 if the id is invalid', async () => {
      const response = await request(app).delete('/pets/123');
      expect(response.statusCode).to.equal(400);
    });
    it('Deleting a pet two times', async () => {
      const cat = await new Pet(Cat1).save();
      const response = await request(app).delete(`/pets/${cat._id}`);
      expect(response.statusCode).to.equal(200);
      expect(response.body._id).to.equal(cat._id.toString());
      const response2 = await request(app).delete(`/pets/${cat._id}`);
      expect(response2.statusCode).to.equal(404);
      expect(response2.body.error).to.equal('Pet not found');
    });
  });
});