import { expect } from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import { Provider } from '../../src/models/provider.js';
import { Product } from '../../src/models/product.js';
import { app } from '../../src/index.js';

const Provider1 = {
  name: 'Pienso Miguel S.A.',
  user: 'piensoMiguel',
  password: 'piensoMiguel123',
  email: 'piensoMiguel@gmail.com',
  phone: '666555444',
  products: [],
};

const Provider2 = {
  name: 'Accesorios Caninos S.L.',
  user: 'accesoriosCaninos',
  password: 'accesoriosCaninos123',
  email: 'accesoriosCaninos@gmail.com',
  phone: '666555333',
  products: [],
};

const product1 = {
  name: 'Pienso para perros',
  weight: 2.5,
  stock: 100,
  description: 'Pienso para perros adultos',
  price: 20,
  keywords: ['perro', 'pienso', 'adulto'],
  dimensions: [10, 20, 30],
  images: ['url1', 'url2'],
};

let findStub, findByIdStub, saveStub, findByIdAndDeleteStub;
let provider;

beforeEach(() => {
  // Stub de métodos estáticos de Mongoose
  findStub = sinon.stub(Provider, 'find');
  findByIdStub = sinon.stub(Provider, 'findById');
  saveStub = sinon.stub(Provider.prototype, 'save');
  findByIdAndDeleteStub = sinon.stub(Provider, 'findByIdAndDelete');


  // Simulación de un provider
  provider = new Provider(Provider1);
  saveStub.resolves(provider);
  findStub.resolves([provider]);
  findByIdStub.resolves(provider);
  findByIdAndDeleteStub.resolves(provider);
});

afterEach(() => {
  sinon.restore(); // Restaurar todos los stubs
});

describe('Provider routes mockup', () => {
  context('GET /providers', () => {
    it('returns one provider', async () => {
      const res = await request(app).get('/providers');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(1);
    });

    it('returns an empty array if there are no providers', async () => {
      findStub.resolves([]);
      const res = await request(app).get('/providers');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(0);
    });

    it('returns two providers', async () => {
      findStub.resolves([provider, { ...Provider2, _id: 'new-id' }]);
      const res = await request(app).get('/providers');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(2);
    });
  });

  context('GET /providers/:id', () => {
    it('returns a provider by id', async () => {
      const res = await request(app).get(`/providers/${provider._id}`);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property('name', Provider1.name);
    });

    it('returns 404 if the provider is not found', async () => {
      findByIdStub.resolves(null);
      const res = await request(app).get('/providers/60b5e4a1c3f2b8a7a4c9e7c8');
      expect(res.statusCode).to.equal(404);
    });

    it('returns 404 if the id is invalid', async () => {
      findByIdStub.resolves(null);
      const res = await request(app).get('/providers/123');
      expect(res.statusCode).to.equal(404);
    });
  });

  context('POST /providers', () => {
    it('creates a new provider', async () => {
      const res = await request(app).post('/providers').send(Provider2);
      expect(res.statusCode).to.equal(201);
      expect(res.body).to.have.property('name', Provider2.name);
    });

    it('returns 201 if the provider already exists', async () => {
      findStub.resolves();
      const res = await request(app).post('/providers').send(Provider1);
      expect(res.statusCode).to.equal(201);
    });

    it('returns 400 if the provider data is invalid', async () => {
      const res = await request(app).post('/providers').send({ name: 'Invalid Provider' });
      expect(res.statusCode).to.equal(400);
    });
  });

  context('PUT /providers/:id', () => {
    it('updates a provider', async () => {
      const res = await request(app)
        .put(`/providers/${provider._id}`)
        .send({ name: 'Updated Name' });
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property('name', 'Updated Name');
    });

    it('returns 404 if the provider is not found', async () => {
      findByIdStub.resolves(null);
      const res = await request(app)
        .put('/providers/60b5e4a1c3f2b8a7a4c9e7c8')
        .send({ name: 'Updated Name' });
      expect(res.statusCode).to.equal(404);
    });

    it('returns 404 if the id is invalid', async () => {
      findByIdStub.resolves(null);
      const res = await request(app).put('/providers/123').send({ name: 'Updated Name' });
      expect(res.statusCode).to.equal(404);
    });
  });

  context('DELETE /providers/:id', () => {
    it('deletes a provider', async () => {
      const res = await request(app).delete(`/providers/${provider._id}`);
      expect(res.statusCode).to.equal(200);
    });

    it('returns 404 if the provider is not found', async () => {
      findByIdStub.resolves(null);
      const res = await request(app).delete('/providers/60b5e4a1c3f2b8a7a4c9e7c8');
      expect(res.statusCode).to.equal(404);
    });

    it('returns 404 if the id is invalid', async () => {
      findByIdStub.resolves(null);
      const res = await request(app).delete('/providers/123');
      expect(res.statusCode).to.equal(404);
    });
  });
});
