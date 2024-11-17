import express from 'express';
import {Product} from '../models/product.js';

export const productRouter = express.Router();

// (POST) /products
productRouter.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

// (GET) /products
productRouter.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (e) {
    res.status(500).send();
  }
});

// (GET) /products/:id
productRouter.get('/products/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.findById(_id);
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (e) {
    res.status(400).send();
  }
});

// (PUT) /products/:id
productRouter.put('/products/:id', async (req, res) => { 
  const updates = Object.keys(req.body); 
  const allowedUpdates = ['name', 'weight', 'stock', 'description', 'price', 'keywords', 'provider', 'dimensions', 'images']; 
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update)); 
  
  if (!isValidOperation) { return res.status(400).send({ error: 'Actualización no permitida' }); } 
  
  try { 
    const product = await Product.findById(req.params.id); 
    if (!product) { return res.status(404).send(); } 
    
    updates.forEach((update) => product[update] = req.body[update]); 
    await product.save(); 
    res.send(product); 
  } catch (e) { res.status(400).send(e); } 
});

// (DELETE) /products/:id
productRouter.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (e) {
    res.status(400).send();
  }
});
