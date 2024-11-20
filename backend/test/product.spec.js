import { expect } from 'chai';
import request from 'supertest';
import { Product } from '../models/product.js';
import { app } from '../index.js';

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

const product2 = {
  name: 'Pienso para gatos',
  weight: 1.5,
  stock: 50,
  description: 'Pienso para gatos adultos',
  price: 15,
  keywords: ['gato', 'pienso', 'adulto'],
  dimensions: [5, 10, 15],
  images: ['url3', 'url4'],
};

const product3 = {
  name: 'Rascador para gatos',
  weight: 2.5,
  stock: 20,
  description: 'Rascador para gatos',
  price: 50,
  keywords: ['gato', 'accesorios', 'adulto'],
  dimensions: [20, 40, 60],
  images: ['url5', 'url6'],
};

let product;

beforeEach(async () => {
  await Product.deleteMany();
  product = await new Product(product1).save();
});

describe('Product routes', () => {
  context('POST /products', () => {
    it('should create a new product', async () => {
      const response = await request(app).post('/products').send(product1);
      expect(response.statusCode).to.equal(201);
      expect(response.body.name).to.equal(product1.name);
    });
    it('should not create a new product without a name', async () => {
      const response = await request(app).post('/products').send({ ...product1, name: '' });
      expect(response.statusCode).to.equal(400);
    });
    it('should not create a new product without a weight', async () => {
      const response = await request(app).post('/products').send({ ...product1, weight: '' });
      expect(response.statusCode).to.equal(400);
    });
    it('should not create a new product without a stock', async () => {
      const response = await request(app).post('/products').send({ ...product1, stock: '' });
      expect(response.statusCode).to.equal(400);
    });
    it('should not create a new product without a description', async () => {
      const response = await request(app).post('/products').send({ ...product1, description: '' });
      expect(response.statusCode).to.equal(400);
    });
    it('should not create a new product without a price', async () => {
      const response = await request(app).post('/products').send({ ...product1, price: '' });
      expect(response.statusCode).to.equal(400);
    });
    it('should not create a new product without dimensions', async () => {
      const response = await request(app).post('/products').send({ ...product1, dimensions: '' });
      expect(response.statusCode).to.equal(400);
    });
    it('should not create a new product with less than 3 dimensions', async () => {
      const response = await request(app).post('/products').send({ ...product1, dimensions: [1, 2] });
      expect(response.statusCode).to.equal(400);
    });
    it('should not create a new product with more than 3 dimensions', async () => {
      const response = await request(app).post('/products').send({ ...product1, dimensions: [1, 2, 3, 4] });
      expect(response.statusCode).to.equal(400);
    });
    it('should not create a new product without images', async () => {
      const response = await request(app).post('/products').send({ ...product1, images: [] });
      expect(response.statusCode).to.equal(400);
    });
    it('should not create a new product with more than 5 images', async () => {
      const response = await request(app).post('/products').send({ ...product1, images: ['url1', 'url2', 'url3', 'url4', 'url5', 'url6'] });
      expect(response.statusCode).to.equal(400);
    });
  });
  context('GET /products', () => {
    it('should get one product', async () => {
      const response = await request(app).get('/products');
      expect(response.statusCode).to.equal(200);
      expect(response.body.length).to.equal(1);
    });
    it('should get two products', async () => {
      await new Product(product2).save();
      const response = await request(app).get('/products');
      expect(response.statusCode).to.equal(200);
      expect(response.body.length).to.equal(2);
    });
    it('should get three products', async () => {
      await new Product(product2).save();
      await new Product(product3).save();
      const response = await request(app).get('/products');
      expect(response.statusCode).to.equal(200);
      expect(response.body.length).to.equal(3);
    });
    it('return an empty array if there are no products', async () => {
      await Product.deleteMany();
      const response = await request(app).get('/products');
      expect(response.statusCode).to.equal(200);
      expect(response.body.length).to.equal(0);
    });
  });
  context('GET /products/:id', () => {
    it('should get a product by id', async () => {
      const response = await request(app).get(`/products/${product._id}`);
      expect(response.statusCode).to.equal(200);
      expect(response.body.name).to.equal(product1.name);
    });
    it('should return 404 if the product does not exist', async () => {
      const response = await request(app).get('/products/6738a7d061407fe740b46994');
      expect(response.statusCode).to.equal(404);
    });
    it('should return 400 if the id is not valid', async () => {
      const response = await request(app).get('/products/1234567890');
      expect(response.statusCode).to.equal(400);
    });
    it('returns a product with the product id', async () => {
      const response = await request(app).get(`/products/${product._id}`);
      expect(response.statusCode).to.equal(200);
    });
  });
  context('PUT /products/:id', () => {
    it('should update a product', async () => {
      const response = await request(app).put(`/products/${product._id}`).send({ name: 'Pienso para cachorros' });
      expect(response.statusCode).to.equal(200);
      expect(response.body.name).to.equal('Pienso para cachorros');
    });
    it('should not update a product with an invalid field', async () => {
      const response = await request(app).put(`/products/${product._id}`).send({ name: 'Pienso para cachorros', invalidField: 'invalid' });
      expect(response.statusCode).to.equal(400);
    });
    it('should not update a product with an invalid id', async () => {
      const response = await request(app).put('/products/1234567890').send({ name: 'Pienso para cachorros' });
      expect(response.statusCode).to.equal(400);
    });
    it('should update the stock of a product', async () => {
      const response = await request(app).put(`/products/${product._id}`).send({ stock: 50 });
      expect(response.statusCode).to.equal(200);
      expect(response.body.stock).to.equal(50);
    });
    it('should update the price of a product', async () => {
      const response = await request(app).put(`/products/${product._id}`).send({ price: 25 });
      expect(response.statusCode).to.equal(200);
      expect(response.body.price).to.equal(25);
    });
    it('should update the description of a product', async () => {
      const response = await request(app).put(`/products/${product._id}`).send({ description: 'Pienso para cachorros' });
      expect(response.statusCode).to.equal(200);
      expect(response.body.description).to.equal('Pienso para cachorros');
    });
    it('should update the keywords of a product', async () => {
      const response = await request(app).put(`/products/${product._id}`).send({ keywords: ['perro', 'pienso', 'cachorro'] });
      expect(response.statusCode).to.equal(200);
      expect(response.body.keywords).to.eql(['perro', 'pienso', 'cachorro']);
    });
    it('should update the dimensions of a product', async () => {
      const response = await request(app).put(`/products/${product._id}`).send({ dimensions: [10, 15, 20] });
      expect(response.statusCode).to.equal(200);
      expect(response.body.dimensions).to.eql([10, 15, 20]);
    });
  });
  context('DELETE /products/:id', () => {
    it('should delete a product', async () => {
      const response = await request(app).delete(`/products/${product._id}`);
      expect(response.statusCode).to.equal(200);
      expect(response.body.name).to.equal(product1.name);
    });
    it('should return 404 if the product does not exist', async () => {
      const response = await request(app).delete('/products/6738a7d061407fe740b46994');
      expect(response.statusCode).to.equal(404);
    });
    it('should return 400 if the id is not valid', async () => {
      const response = await request(app).delete('/products/1234567890');
      expect(response.statusCode).to.equal(400);
    });
    it('Deleting a product two times should return 404', async () => {
      const response = await request(app).delete(`/products/${product._id}`);
      expect(response.statusCode).to.equal(200);
      const response2 = await request(app).delete(`/products/${product._id}`);
      expect(response2.statusCode).to.equal(404);
    });
  });
});