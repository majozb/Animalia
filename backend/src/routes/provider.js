import express from 'express';
import bcrypt from 'bcryptjs';
import {Provider} from '../models/provider.js';
import {Product} from '../models/product.js';

export const providerRouter = express.Router();

// (POST) /providers
providerRouter.post('/providers', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 8); 
    const provider = new Provider({ ...req.body, 
                                    password: hashedPassword });
    await provider.save();
    res.status(201).send(provider);
  } catch (e) {
    res.status(400).send(e);
  }
});

// (GET) / providers
providerRouter.get('/providers', async (req, res) => {
  try {
    const providers = await Provider.find({});
    res.send(providers);
  } catch (e) {
    res.status(400).send();
  }
});

// (GET) /providers/:id
providerRouter.get('/providers/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const provider = await Provider.findById(_id);
    if (!provider) {
      return res.status(404).send();
    }
    res.send(provider);
  } catch (e) {
    res.status(400).send();
  }
});

// (GET) /providers/:id/products
providerRouter.get('/providers/:id/products', async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id).populate('products');
    if (!provider) {
      return res.status(404).send();
    }
    res.status(200).send(provider.products);
  } catch (e) {
    res.status(400).send();
  }
});

// PUT /providers/:id
providerRouter.put('/providers/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'user', 'password', 'email', 'phone', 'products', 'productId'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Update not allowed' });
  }

  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) {
      return res.status(404).send();
    }

    if (req.body.productId) {
      provider.products.push(req.body.productId); 
    }

    if (req.body.password) { 
      req.body.password = await bcrypt.hash(req.body.password, 8); 
    }
    updates.forEach((update) => {
      if (update !== 'productId') {
        provider[update] = req.body[update];  
      }
    });
    await provider.save();
    res.status(200).send(provider);
  } catch (e) {
    res.status(400).send(e);
  }
});

// PUT /providers/:id/removeProduct
providerRouter.put('/providers/:id/removeProduct', async (req, res) => {
  try {
    const { productId } = req.body;
    const provider = await Provider.findById(req.params.id);  // Find the provider by id

    if (!provider) {
      return res.status(404).send({ message: 'Provider not found' });
    }

    // Verify if the productId is in the provider products list
    const productIndex = provider.products.indexOf(productId);
    if (productIndex === -1) {
      return res.status(404).send({ error: 'Product not found in provider products list' });
    }

    // Remove the product from the provider products list
    provider.products.splice(productIndex, 1);
    await provider.save();
    
    res.status(200).send({ message: 'Product removed successfully', provider });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// (DELETE) /providers/:id
providerRouter.delete('/providers/:id', async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) {
      return res.status(404).send();
    }
    await Product.deleteMany({ _id: { $in: provider.products } });
    await Provider.deleteOne(provider);
    res.status(200).send(provider);
  } catch (e) {
    res.status(400).send();
  }
});