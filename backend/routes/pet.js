import express from 'express';
import { Pet } from '../models/pet.js';

export const petRouter = express.Router();

// GET /pets
petRouter.get('/pets', async (req, res) => {
  try {
    let pets = await Pet.find();
    // if (req.body.selectedSpecies && req.body.selectedGenre) {
    //   console.log(req.body);
    //   if (req.body.selectedSpecies.length > 0) {
    //     pets = pets.filter((pet) => req.body.selectedSpecies.includes(pet.type));
    //   }
    //   if (req.body.selectedGenre !== false) {
    //     let filter = false;
    //     if (req.body.selectedGenre === "female") {
    //       filter = true;
    //     } else if (req.body.selectedGenre === "male") {
    //       filter = false;
    //     }
    //     pets = pets.filter((pet) => filter === pet.genre);
    //   }
    // }
    const selectedSpecies = req.query.selectedSpecies ? req.query.selectedSpecies.split(',') : [];
    const selectedGenre = req.query.selectedGenre || "all";

    if (selectedSpecies.length > 0) {
      pets = pets.filter((pet) => selectedSpecies.includes(pet.type));
    }
    console.log("selectedSpecies", selectedSpecies);

    if (selectedGenre !== "all") {
      const filter = (selectedGenre === "female");
      pets = pets.filter((pet) => filter === pet.genre);
    }
    console.log("selectedGenre", selectedGenre);
    res.status(200).send(pets);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// GET /pets/:id
petRouter.get('/pets/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).send({ error: 'Pet not found' });
    }
    res.status(200).send(pet);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// POST /pets
petRouter.post('/pets', async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();
    res.status(201).send(pet);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// PUT /pets/:id
petRouter.put('/pets/:id', async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pet) {
      return res.status(404).send({ error: 'Pet not found' });
    }
    res.status(200).send(pet);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// DELETE /pets/:id
petRouter.delete('/pets/:id', async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) {
      return res.status(404).send({ error: 'Pet not found' });
    }
    res.status(200).send(pet);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
