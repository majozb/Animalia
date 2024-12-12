import express from 'express';
import bcrypt from 'bcryptjs';
import { Admin } from '../models/admin.js';

export const adminRouter = express.Router();

// (POST) /admins
adminRouter.post('/admins', async (req, res) => {
  if (!req.body.name || !req.body.user || !req.body.password) {
    return res.status(400).send({ error: 'Name, user and password are required' });
  }
  if (req.body.password.length < 6) {
    return res.status(400).send({ error: 'Password must be at least 6 characters' });
  }
  try {
    // Hash the password before creating the admin
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    const admin = new Admin({
      ...req.body,
      password: hashedPassword
    });
    
    await admin.save();
    res.status(201).send(admin);
  } catch (e) {
    res.status(400).send(e);
  }
});

// (GET) /admins
adminRouter.get('/admins', async (req, res) => {
  try {
    const admins = await Admin.find({});
    res.send(admins);
  } catch (e) {
    res.status(400).send();
  }
});

// (GET) /admins/:id
adminRouter.get('/admins/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const admin = await Admin.findById(_id);
    if (!admin) {
      return res.status(404).send();
    }
    res.send(admin);
  } catch (e) {
    res.status(400).send();
  }
});

// (PUT) /admins/:id
adminRouter.put('/admins/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'user', 'password', 'email', 'pets', 'petId'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Update not allowed' });
  }
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).send();
    }

    if (req.body.petId) {
      admin.pets.push(req.body.petId); 
    }

    // Hash the password before updating the admin
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 8);
    }

    updates.forEach((update) => {
      if (update !== 'petId') {
        admin[update] = req.body[update];  
      }
    });

    await admin.save();
    res.status(200).send(admin);
  } catch (e) {
    res.status(400).send(e);
  }
});

// PUT /admin/:id/removePet
adminRouter.put('/admins/:id/removePet', async (req, res) => {
  try {
    const { petId } = req.body;
    const admin = await Admin.findById(req.params.id); // Find the admin by id

    if (!admin) {
      return res.status(404).send({ error: 'Admin not found' });
    }

    // Verify if the petId is in the admin pets list
    const petIndex = admin.pets.indexOf(petId);
    if (petIndex === -1) {
      return res.status(404).send({ error: 'Pet not found in admin pets list' });
    }

    // Delete the pet from the pets list
    admin.pets.splice(petIndex, 1);
    await admin.save();
    
    res.status(200).send({ message: 'Pet removed successfully', admin });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// (DELETE) /admins/:id
adminRouter.delete('/admins/:id', async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).send();
    }
    res.send(admin);
  } catch (e) {
    res.status(400).send();
  }
});


