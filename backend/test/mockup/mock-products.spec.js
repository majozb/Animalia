import { expect } from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import { Product } from '../../src/models/product.js';
import { app } from '../../src/index.js';
import path from 'path';
import fs from 'fs';

// Productos de ejemplo
const product1 = {
  name: 'Pienso para perros',
  weight: 2.5,
  stock: 100,
  description: 'Pienso para perros adultos',
  price: 20,
  keywords: ['perro', 'pienso', 'adulto'],
  dimensions: [10, 20, 30],
  images: ['image1', 'image2'],
};

let product, findStub, findByIdStub, findByIdAndDeleteStub, updateOneStub;

beforeEach(() => {
  // Stubs de métodos de Mongoose
  findStub = sinon.stub(Product, 'find');
  findByIdStub = sinon.stub(Product, 'findById');
  findByIdAndDeleteStub = sinon.stub(Product, 'findByIdAndDelete');
  
  updateOneStub = sinon.stub(Product, 'updateOne');

  // Crear instancia simulada del producto
  product = new Product(product1);
});

afterEach(() => {
  sinon.restore(); // Restaurar los métodos stub
});

describe('Product routes mockup', () => {
  
  context('POST /products', () => {
    it('creates a new product', async function () {
      this.timeout(5000); // Agregar más tiempo si es necesario
      const __dirname = path.resolve();
      const imagePath1 = path.join(__dirname, 'test/data', 'image1.jpg');
      const imagePath2 = path.join(__dirname, 'test/data', 'image2.jpg');

      const saveStubProduct = sinon.stub(Product.prototype, 'save').resolves(product1);

      const res = await request(app)
        .post('/products')
        .field('name', product1.name)
        .field('description', product1.description)
        .field('weight', product1.weight)
        .field('stock', product1.stock)
        .field('price', product1.price)
        .field('dimensions', product1.dimensions.join(','))
        .attach('images', fs.createReadStream(imagePath1))
        .attach('images', fs.createReadStream(imagePath2));
      
      expect(res.statusCode).to.equal(201);
      // Restaurar después del test
    saveStubProduct.restore();
    });

    it('returns 400 if required fields are missing', async () => {
      const saveStubProduct = sinon.stub(Product.prototype, 'save').rejects();
      const res = await request(app).post('/products').send({});
      expect(res.statusCode).to.equal(400);
      saveStubProduct.restore();
    });
  
  });

  context('GET /products', () => {
    it('returns all products', async () => {
      findStub.resolves([product1]);
      const res = await request(app).get('/products');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(1);
    });

    it('returns empty array if no products', async () => {
      findStub.resolves([]);
      const res = await request(app).get('/products');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(0);
    });
  });

  context('GET /products/:id', () => {
    it('returns a product by id', async () => {
      findByIdStub.resolves(product1);
      const res = await request(app).get(`/products/valid-id`);
      expect(res.statusCode).to.equal(200);
      expect(res.body.name).to.equal(product1.name);
    });

    it('returns 404 if product is not found', async () => {
      findByIdStub.resolves(null);
      const res = await request(app).get('/products/nonexistent-id');
      expect(res.statusCode).to.equal(404);
    });

    it('returns 404 for an invalid id', async () => {
      findByIdStub.resolves(null);
      const res = await request(app).get('/products/invalid-id');
      expect(res.statusCode).to.equal(404);
    });
  });

  context('PUT /products/:id', () => {
    it('updates a product by id', async () => {
      findByIdStub.resolves(product);
      updateOneStub.resolves({ modifiedCount: 1 });

      const res = await request(app).put(`/products/${product._id}`).send({ name: 'Nuevo Producto' });
      expect(res.statusCode).to.equal(200);
    });

    it('returns 404 if the product is not found', async () => {
      updateOneStub.resolves({ modifiedCount: 0 });
      const res = await request(app).put('/products/nonexistent-id').send({ name: 'Nuevo Producto' });
      expect(res.statusCode).to.equal(404);
    });
  });

  context('DELETE /products/:id', () => {
    it('deletes a product by id', async () => {
      findByIdAndDeleteStub.resolves(product1);
      const res = await request(app).delete(`/products/valid-id`);
      expect(res.statusCode).to.equal(200);
    });

    it('returns 404 if the product is not found', async () => {
      findByIdStub.resolves(null);
      const res = await request(app).delete('/products/nonexistent-id');
      expect(res.statusCode).to.equal(404);
    });

    it('returns 404 for an invalid id', async () => {
      findByIdStub.resolves(null);
      const res = await request(app).delete('/products/invalid-id');
      expect(res.statusCode).to.equal(404);
    });
  });
});
