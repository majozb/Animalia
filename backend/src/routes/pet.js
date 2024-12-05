import express from 'express';
import { Pet } from '../models/pet.js';
import { Admin } from '../models/admin.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

export const petRouter = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB como máximo
  dest: 'uploads/'
});

// GET /pets
petRouter.get('/pets', async (req, res) => {
  try {
    let pets = await Pet.find();
    res.status(200).send(pets);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// GET /adoptionpets
petRouter.get('/adoptionpets', async (req, res) => {
  try {
    const admins = await Admin.find().populate('pets');
    if (!admins.length) {
      return res.status(404).send({ error: 'No admins found' });
    }

    // Combine all pets from all admins
    let pets = admins.flatMap((admin) => admin.pets);

    const selectedSpecies = req.query.selectedSpecies ? req.query.selectedSpecies.split(',') : [];
    const selectedGenre = req.query.selectedGenre || "all";

    if (selectedSpecies.length > 0) {
      pets = pets.filter((pet) => selectedSpecies.includes(pet.type));
    }

    if (selectedGenre !== "all") {
      const filter = (selectedGenre === "female");
      pets = pets.filter((pet) => filter === pet.genre);
    }
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

petRouter.post('/pets', upload.array('images'), async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();

    // Verify if images were uploaded
    if (!req.files || req.files.length === 0) {
      console.error('No images uploaded');
      return res.status(400).send({ error: 'At least one image is required' });
    }

    // Upload images to Cloudinary
    const imageUploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: `pets/${pet._id}`,
            transformation: [{ aspect_ratio: "1:1", crop: 'fill' }]
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              reject(error);
            } else {
              resolve(result.secure_url); // Return the URL of the uploaded image
            }
          }
        );
        stream.end(file.buffer);
      });
    });
    
    // Wait for all images to be uploaded
    const imageUrls = await Promise.all(imageUploadPromises);

    // Set the pet's images fields to the Cloudinary URLs
    pet.images = imageUrls;
    await pet.save();
    res.status(201).send(pet);
  } catch (error) {
    console.error('Error adding pet:', error);
    res.status(400).send({ error: 'Error adding pet' });
  }
});


// PUT /pets/:id
const allowedUpdates = ['name', 'description', 'type', 'breed', 'vaccines', 'birthDate', 'medication', 'genre'];

// IMPORTANT: In the case of a PUT request, all the images are replaced with the new ones.
petRouter.put('/pets/:id', upload.array('images', 10), async (req, res) => {
  // Parse vaccines JSON string
  if (req.body.vaccines) {
    req.body.vaccines = JSON.parse(req.body.vaccines);
  }
  // Allow only certain fields to be updated (name, description, etc.)
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Actualización no permitida' });
  }
  try {
    // Find the pet by ID
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).send({ error: 'Pet not found' });
    }
    // Path to the folder in Cloudinary where the pet's images are stored
    const folderPath = `pets/${pet._id}`;
    // Verify if new images were uploaded
    if (req.files && req.files.length > 0) {
      // Get all resources (images) in the pet's folder
      const existingResources = await cloudinary.api.resources({
        type: 'upload',
        prefix: folderPath,
        max_results: 500, // Maximum number of resources to return
      });
      // Get the public_ids of the images to delete, so they do not stay in Cloudinary without being
      // associated with the folder
      const publicIds = existingResources.resources.map((resource) => resource.public_id);
      // Delete all these images
      if (publicIds.length > 0) {
        await cloudinary.api.delete_resources(publicIds);
      }
      // Delete the empty folder
      await cloudinary.api.delete_folder(folderPath);
      // Upload the new images
      const imageUploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { 
              folder: folderPath,
              transformation: [{ aspect_ratio: "1:1", crop: 'fill' }]
            },
            (error, result) => {
              if (error) {
                console.error('Cloudinary upload error:', error);
                reject(error);
              } else {
                resolve(result.secure_url);
              }
            }
          );
          stream.end(file.buffer);
        });
      });
      const imageUrls = await Promise.all(imageUploadPromises);
      pet.images = imageUrls;
    }

    // Update the pet's fields
    updates.forEach((update) => {
      pet[update] = req.body[update];
    });
    await pet.save();
    res.send(pet);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});


// (DELETE) /pets/:id
petRouter.delete('/pets/:id', async (req, res) => {
  try {
    // Search for the pet by ID and delete it
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) {
      return res.status(404).send({ error: 'Pet not found' });
    }
    // Get the path to the pet's folder in Cloudinary
    const folderPath = `pets/${pet._id}`;
    // Get all the resources (images) in the folder
    const existingResources = await cloudinary.api.resources({
      type: 'upload',
      prefix: folderPath,
      max_results: 500,
    });
    // Get the public_ids of the images to delete
    const publicIds = existingResources.resources.map((resource) => resource.public_id);
    if (publicIds.length > 0) {
      // Delete all the images
      await cloudinary.api.delete_resources(publicIds);
    }
    // Delete the empty folder
    await cloudinary.api.delete_folder(folderPath);
    res.send(pet);
  } catch (error) {
    console.error('Error deleting pet:', error);
    res.status(400).send({ error: error.message });
  }
});
