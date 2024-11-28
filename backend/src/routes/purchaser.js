import express from 'express';
import { Purchaser } from '../models/purchaser.js';
import bcrypt from 'bcryptjs';
import { Pet } from '../models/pet.js';

export const purchaserRouter = express.Router();

// GET /purchasers
purchaserRouter.get('/purchasers', async (req, res) => {
  try {
    const purchasers = await Purchaser.find();
    res.status(200).send(purchasers);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// GET /purchasers/:id

purchaserRouter.get('/purchasers/:id', async (req, res) => {
  try {
    const purchaser = await Purchaser.findById(req.params.id);
    if (!purchaser) {
      return res.status(404).send({ error: 'Purchaser not found' });
    }
    res.status(200).send(purchaser);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// POST /purchasers
purchaserRouter.post('/purchasers', async (req, res) => {
  if (!req.body.name || !req.body.user || !req.body.password) {
    return res.status(400).send({ error: 'Name, user and password are required' });
  }
  if (req.body.password.length < 6) {
    return res.status(400).send({ error: 'Password must be at least 6 characters' });
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    const purchaser = new Purchaser({ ...req.body, password: hashedPassword });
    await purchaser.save();
    res.status(201).send(purchaser);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

purchaserRouter.put('/purchasers/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'user', 'password', 'email', 'phone', 'purchases', 'points', 'pets', 'petId']; 
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' });
  }

  try {
    const purchaser = await Purchaser.findById(req.params.id);
    if (!purchaser) {
      return res.status(404).send({ error: 'Purchaser not found' });
    }

    if (req.body.petId) {
      purchaser.pets.push(req.body.petId); 
    }

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 8);  
    }

    updates.forEach((update) => {
      if (update !== 'petId') {
        purchaser[update] = req.body[update];  
      }
    });

    await purchaser.save();  
    res.status(200).send(purchaser); 
  } catch (error) {
    res.status(400).send({ error: error.message }); 
  }
});

// PUT /purchasers/:id/removePet
purchaserRouter.put('/purchasers/:id/removePet', async (req, res) => {
  try {
    const { petId } = req.body;
    const purchaser = await Purchaser.findById(req.params.id);  // Find the purchaser by id

    if (!purchaser) {
      return res.status(404).send({ error: 'Purchaser not found' });
    }

    // Verify if the petId is in the purchaser pets list
    const petIndex = purchaser.pets.indexOf(petId);
    if (petIndex === -1) {
      return res.status(404).send({ error: 'Pet not found in purchaser pets list' });
    }

    // Remove the pet from the purchaser pets list
    purchaser.pets.splice(petIndex, 1);
    await purchaser.save();
    
    res.status(200).send({ message: 'Pet removed successfully', purchaser });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});


// DELETE /purchasers/:id
purchaserRouter.delete('/purchasers/:id', async (req, res) => {
  try {
    const purchaser = await Purchaser.findById(req.params.id);
    if (!purchaser) {
      return res.status(404).send({ error: 'Purchaser not found' });
    }
    await Pet.deleteMany({ _id: { $in: purchaser.pets } });
    await Purchaser.deleteOne(purchaser);
    res.status(200).send(purchaser);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});