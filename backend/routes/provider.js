import express from 'express';
import bcrypt from 'bcryptjs';
import {Provider} from '../models/provider.js';

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
    res.status(500).send();
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
    res.status(500).send();
  }
});

// PUT /providers/:id
providerRouter.put('/providers/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'user', 'password', 'email', 'phone', 'products'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Actualización no permitida' });
  }

  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) {
      return res.status(404).send();
    }
    if (req.body.password) { 
      req.body.password = await bcrypt.hash(req.body.password, 8); 
    }
    updates.forEach((update) => provider[update] = req.body[update]);
    await provider.save();
    res.send(provider);
  } catch (e) {
    res.status(400).send(e);
  }
});

// (DELETE) /providers/:id
providerRouter.delete('/providers/:id', async (req, res) => {
  try {
    const provider = await Provider.findByIdAndDelete(req.params.id);
    if (!provider) {
      return res.status(404).send();
    }
    res.send(provider);
  } catch (e) {
    res.status(500).send();
  }
});

