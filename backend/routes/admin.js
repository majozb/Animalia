import express from 'express';
import bcrypt from 'bcryptjs';
import { Admin } from '../models/admin.js';

export const adminRouter = express.Router();

// (POST) /admins
adminRouter.post('/admins', async (req, res) => {
  try {
    // Hashear la contraseña antes de crear el administrador
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
    res.status(500).send();
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
    res.status(500).send();
  }
});

// (PUT) /admins/:id
adminRouter.put('/admins/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'user', 'password', 'email', 'pets'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Actualización no permitida' });
  }

  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).send();
    }

    // Hashear la contraseña si está actualizada
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 8);
    }

    updates.forEach((update) => admin[update] = req.body[update]);
    await admin.save();
    res.send(admin);
  } catch (e) {
    res.status(400).send(e);
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
    res.status(500).send();
  }
});


