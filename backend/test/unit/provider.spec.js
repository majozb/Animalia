import { expect } from 'chai';
import request from 'supertest';
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

let provider;

beforeEach(async () => {
  await Provider.deleteMany();
  provider = await new Provider(Provider1).save();
});

describe('Provider routes', () => {
  context('GET /providers', () => {
    it('return one provider', async () => {
      let res = await request(app).get('/providers');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(1);
    });
    it('returns an empty array if there are no providers', async () => {
      await Provider.deleteMany();
      let res = await request(app).get('/providers');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(0);
    });
    it('return two providers', async () => {
      await new Provider(Provider2).save();
      let res = await request(app).get('/providers');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(2);
    });
    it('return providers with products', async () => {
      let product = await new Product(product1).save();
      provider.products.push(product);
      let res = await request(app).get('/providers');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(1);
    });
  });
  context('GET /providers/:id', () => {
    it('return one provider', async () => {
      let res = await request(app).get(`/providers/${provider._id}`);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('name', Provider1.name);
    });
    it('return 404 if the provider does not exist', async () => {
      let res = await request(app).get(`/providers/60b5e4a1c3f2b8a7a4c9e7c8`);
      expect(res.statusCode).to.equal(404);
    });
    it('return 400 if the id is invalid', async () => {
      let res = await request(app).get(`/providers/123`);
      expect(res.statusCode).to.equal(400);
    });
    it('return the provider with products', async () => {
      let product = await new Product(product1).save();
      provider.products.push(product);
      await provider.save();
      let res = await request(app).get(`/providers/${provider._id}`);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.products).lengthOf(1);
    });
  });
  context('POST /providers', () => {
    it('create a new provider', async () => {
      let res = await request(app)
        .post('/providers')
        .send(Provider2);
      expect(res.statusCode).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('name', Provider2.name);
    });
    it('return 400 if the provider already exists', async () => {
      let res = await request(app)
        .post('/providers')
        .send(Provider1);
      expect(res.statusCode).to.equal(400);
    });
    it('return 400 if the provider is invalid', async () => {
      // Missing user, password, email, phone
      let res = await request(app)
        .post('/providers')
        .send({ name: 'Pienso Miguel S.A.' });
      expect(res.statusCode).to.equal(400);
    });
    it('return 400 if the email is invalid', async () => {
      let res = await request(app)
        .post('/providers')
        .send({ ...Provider2, email: 'invalidEmail' });
      expect(res.statusCode).to.equal(400);
    });
  });
  context('PUT /providers/:id', () => {
    it('update a provider', async () => {
      let res = await request(app)
        . put(`/providers/${provider._id}`)
        .send({ name: 'Pienso Miguel S.L.' });
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('name', 'Pienso Miguel S.L.');
    });
    it('return 404 if the provider does not exist', async () => {
      let res = await request(app)
        .put(`/providers/60b5e4a1c3f2b8a7a4c9e7c8`)
        .send({ name: 'Pienso Miguel S.L.' });
      expect(res.statusCode).to.equal(404);
    });
    it('return 400 if the id is invalid', async () => {
      let res = await request(app)
        .put(`/providers/123`)
        .send({ name: 'Pienso Miguel S.L.' });
      expect(res.statusCode).to.equal(400);
    });
    it('update a provider with products', async () => {
      let product = await new Product(product1).save();
      provider.products.push(product);
      await provider.save();
      let res = await request(app)
        .put(`/providers/${provider._id}`)
        .send({ name: 'Pienso Miguel S.L.' });
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('name', 'Pienso Miguel S.L.');
      expect(res.body.products).to.be.an('array').with.lengthOf(1);
    });
  });
  context('DELETE /providers/:id', () => {
    it('delete a provider', async () => {
      let res = await request(app).delete(`/providers/${provider._id}`);
      expect(res.statusCode).to.equal(200);
    });
    it('return 404 if the provider does not exist', async () => {
      let res = await request(app).delete(`/providers/60b5e4a1c3f2b8a7a4c9e7c8`);
      expect(res.statusCode).to.equal(404);
    });
    it('return 400 if the id is invalid', async () => {
      let res = await request(app).delete(`/providers/123`);
      expect(res.statusCode).to.equal(400);
    });
    it('delete a provider with products', async () => {
      let product = await new Product(product1).save();
      provider.products.push(product);
      await provider.save();
      let res = await request(app).delete(`/providers/${provider._id}`);
      expect(res.statusCode).to.equal(200);
      let products = await Product.findById(product._id);
      expect(products).to.be.null;
    });
  });
});
