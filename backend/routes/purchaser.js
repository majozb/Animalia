import express from 'express';
import { Purchaser } from '../models/purchaser.js';

export const purchaserRouter = express.Router();

// GET /purchasers
purchaserRouter.get('/purchasers', async (req, res) => {
  try {
    const purchasers = await Purchaser.find();
    res.status(200).json(purchasers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /purchasers/:id

purchaserRouter.get('/purchasers/:id', async (req, res) => {
  try {
    const purchaser = await Purchaser.findById(req.params.id);
    if (!purchaser) {
      return res.status(404).json({ error: 'Purchaser not found' });
    }
    res.status(200).json(purchaser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /purchasers
purchaserRouter.post('/purchasers', async (req, res) => {
  try {
    const purchaser = new Purchaser(req.body);
    await purchaser.save();
    res.status(201).json(purchaser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /purchasers/:id
purchaserRouter.put('/purchasers/:id', async (req, res) => {
  try {
    const purchaser = await Purchaser.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!purchaser) {
      return res.status(404).json({ error: 'Purchaser not found' });
    }
    res.status(200).json(purchaser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /purchasers/:id
purchaserRouter.delete('/purchasers/:id', async (req, res) => {
  try {
    const purchaser = await Purchaser.findByIdAndDelete(req.params.id);
    if (!purchaser) {
      return res.status(404).json({ error: 'Purchaser not found' });
    }
    res.status(200).json(purchaser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});