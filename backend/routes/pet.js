import express from 'express';
import { Pet } from '../models/pet.js';

export const petRouter = express.Router();

// GET /pets
petRouter.get('/pets', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /pets/:id
petRouter.get('/pets/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.status(200).json(pet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST /pets
petRouter.post('/pets', async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /pets/:id
petRouter.put('/pets/:id', async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.status(200).json(pet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /pets/:id
petRouter.delete('/pets/:id', async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.status(200).json(pet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
