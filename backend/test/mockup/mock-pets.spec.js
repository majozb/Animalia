import { expect } from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import { Pet } from '../../src/models/pet.js';
import { Admin } from '../../src/models/admin.js';
import { app } from '../../src/index.js';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import fs from 'fs';

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
let dog;

let findStub, findByIdStub, findByIdAndDeleteStub, saveStub, updateOneStub, resourcesStub, deleteResourcesStub, deleteFolderStub;

beforeEach(() => {
  findStub = sinon.stub(Pet, 'find');
  findByIdStub = sinon.stub(Pet, 'findById');
  findByIdAndDeleteStub = sinon.stub(Pet, 'findByIdAndDelete');
  saveStub = sinon.stub(Pet.prototype, 'save');
  updateOneStub = sinon.stub(Pet, 'updateOne');
  sinon.stub(cloudinary.uploader, 'upload').resolves({ secure_url: 'http://image.com' });
  
  resourcesStub = sinon.stub(cloudinary.api, 'resources').resolves({
    resources: [
      { public_id: 'pets/mocked-id/image1' },
      { public_id: 'pets/mocked-id/image2' },
    ],
  });

  deleteResourcesStub = sinon.stub(cloudinary.api, 'delete_resources').resolves();
  deleteFolderStub = sinon.stub(cloudinary.api, 'delete_folder').resolves();
  dog = new Pet(Dog1);
});

afterEach(() => {
  sinon.restore();
});

describe('Pet routes mockup', () => {

  context('GET /pets', () => {
    it('returns one pet', async () => {
      findStub.resolves([Dog1]);
      const res = await request(app).get('/pets');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(1);
    });

    it('returns an empty array if there are no pets', async () => {
      findStub.resolves([]);
      const res = await request(app).get('/pets');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(0);
    });

    it('returns two pets', async () => {
      findStub.resolves([Dog1, { ...Dog1, name: 'Mishifu' }]);
      const res = await request(app).get('/pets');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(2);
    });

    it('returns 500 if there is an error', async () => {
      findStub.rejects();
      const res = await request(app).get('/pets');
      expect(res.statusCode).to.equal(500);
    });
  });

  // context('GET /adoptionpets', () => {
  //   it('returns all pets', async () => {
  //     findIdStubAdmin = sinon.stub(Admin, 'find').resolves([{ _id: 'admin1', pets: [Dog1] }]);
  //     const res = await request(app).get('/adoptionpets');
  //     expect(res.statusCode).to.equal(200);
  //     expect(res.body).to.be.an('array').with.lengthOf(1);
  //   });

  //   it('filters pets by selectedSpecies (dog)', async () => {
  //     findIdStubAdmin = sinon.stub(Admin, 'find').resolves([{ _id: 'admin1', pets: [Dog1, { ...Dog1, type: 'dog' }] }]);
  //     const res = await request(app).get('/adoptionpets').query({ selectedSpecies: 'dog' });
  //     expect(res.statusCode).to.equal(200);
  //     expect(res.body).to.be.an('array').with.lengthOf(2); // Solo perros
  //   });

  //   it('filters pets by selectedGenre (female)', async () => {
  //     const petFemale = { ...Dog1, genre: 'female' };
  //     findIdStubAdmin = sinon.stub(Admin, 'find').resolves([{ _id: 'admin1', pets: [petFemale, Dog1] }]);
  //     const res = await request(app).get('/adoptionpets').query({ selectedGenre: 'female' });
  //     expect(res.statusCode).to.equal(200);
  //     expect(res.body).to.be.an('array').with.lengthOf(1); // Solo hembras
  //   });

  //   it('filters pets by selectedSpecies (cat)', async () => {
  //     const petCat = { ...Dog1, type: 'cat' };
  //     findIdStubAdmin = sinon.stub(Admin, 'find').resolves([{ _id: 'admin1', pets: [petCat, Dog1] }]);
  //     const res = await request(app).get('/adoptionpets').query({ selectedSpecies: 'cat' });
  //     expect(res.statusCode).to.equal(200);
  //     expect(res.body).to.be.an('array').with.lengthOf(1); // Solo gatos
  //   });

  //   it('returns 404 if no admins found', async () => {
  //     findIdStubAdmin = sinon.stub(Admin, 'find').resolves([]);
  //     const res = await request(app).get('/adoptionpets');
  //     expect(res.statusCode).to.equal(404);
  //     expect(res.body).to.have.property('error', 'No admins found');
  //   });

  //   it('returns 500 if there is a server error', async () => {
  //     findIdStubAdmin = sinon.stub(Admin, 'find').rejects(new Error('Database error'));
  //     const res = await request(app).get('/adoptionpets');
  //     expect(res.statusCode).to.equal(500);
  //     expect(res.body).to.have.property('error', 'Database error');
  //   });
  // });

  context('GET /pets/:id', () => {
    it('returns a pet by id', async () => {
      findByIdStub.resolves(Dog1);
      const res = await request(app).get(`/pets/valid-id`);
      expect(res.statusCode).to.equal(200);
      expect(res.body.name).to.equal(Dog1.name);
    });

    it('returns 404 if the pet is not found', async () => {
      findByIdStub.resolves(null);
      const res = await request(app).get(`/pets/nonexistent-id`);
      expect(res.statusCode).to.equal(404);
    });

    it('returns 400 if there is an error', async () => {
      findByIdStub.rejects();
      const res = await request(app).get('/pets/1234');
      expect(res.statusCode).to.equal(400);
    });
  });

  context('POST /pets', () => {
    it('creates a new pet', async function () {
      this.timeout(10000); 
      const __dirname = path.resolve();
      const imagePath1 = path.join(__dirname, 'test/data', 'image1.jpg');
      const imagePath2 = path.join(__dirname, 'test/data', 'image2.jpg');
      saveStub.resolves(Dog1);
      const res = await request(app)
      .post('/pets')
      .field('name', Dog1.name)
      .field('description', Dog1.description)
      .field('type', Dog1.type)
      .field('breed', Dog1.breed)
      .field('vaccines', Dog1.vaccines.join(','))
      .field('birthDate', Dog1.birthDate.toISOString())
      .field('genre', Dog1.genre)
      .attach('images', fs.createReadStream(imagePath1))
      .attach('images', fs.createReadStream(imagePath2));
      expect(res.statusCode).to.equal(201);
    });

    it('returns 400 if the request is invalid', async () => {
      saveStub.rejects();
      const res = await request(app).post('/pets').send({});
      expect(res.statusCode).to.equal(400);
    });
    // it('returns 400 if there is no image', async () => {
    //   saveStub.rejects();
    //   const res = await request(app).post('/pets').send({...Dog1, images: []});
    //   expect(res.statusCode).to.equal(400);
    //   expect(res.body.error).to.equal('At least one image is required');
    // });
  });

  context('PUT /pets/:id', () => {
    it('updates a pet by id', async () => {
      findByIdStub.resolves(dog);
      updateOneStub.resolves({ modifiedCount: 1 });
      const res = await request(app).put(`/pets/${dog._id}`).send({ name: 'Juan Carlos II' });;
      expect(res.statusCode).to.equal(200);
    });

    it('returns 404 if the pet is not found', async () => {
      updateOneStub.resolves({ modifiedCount: 0 });
      const res = await request(app).put(`/pets/nonexistent-id`).send({ name: 'Juan Carlos II' });
      expect(res.statusCode).to.equal(404);
    });
    // it('returns 400 if the update is invalid', async () => {
    //   saveStub.resolves(dog);
    //   const response = await request(app).put(`/admins/${dog._id}`).send({ cif: '123' });
    //   expect(response.statusCode).to.equal(400);
    //   expect(response.error.message).to.equal('Update not allowed');
    // });
  });

  context('DELETE /pets/:id', () => {
    it('returns 404 if the pet is not found', async () => {
      findByIdAndDeleteStub.resolves(null);
      const res = await request(app).delete(`/pets/nonexistent-id`);
      expect(res.statusCode).to.equal(404);
    });
  });

});
