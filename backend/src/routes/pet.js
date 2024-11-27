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

petRouter.get('/adoptionpets', async (req, res) => {
  try {
    const admins = await Admin.find().populate('pets');
    if (!admins.length) {
      return res.status(404).send({ error: 'No admins found' });
    }

    // Combina las mascotas de todos los administradores
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

petRouter.post('/pets', upload.single('image'), async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();

    if (!req.file) {
      console.error('No image uploaded');
      return res.status(400).send({ error: 'Image is required' });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: `pets/${pet._id}` }, // Directory in Cloudinary
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(req.file.buffer); // Send the image buffer to the stream
    });

    // console.log('Cloudinary image URL:', uploadResult.secure_url);

    // Update the pet with the image URL
    pet.images = [uploadResult.secure_url];
    await pet.save();

    res.status(201).json(pet);
  } catch (error) {
    console.error('Error adding pet:', error);
    res.status(400).send({ error: 'Error adding pet' });
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


async function uploadImageToCloudinary(images, petId) {
  try {
    const formData = new FormData();
    formData.append('file', images);
    formData.append('upload_preset', 'Animalia'); // Tu preset de Cloudinary
    formData.append('crop', 'thumb'); // Recortar la imagen al tamaño solicitado
    formData.append('width', 500);     // Ancho máximo
    formData.append('height', 500);    // Alto máximo
    formData.append('gravity', 'center'); // Asegura que el recorte sea centrado

    const publicId = `pets/${petId}`;  // Carpeta /pets/id_pet.jpg
    formData.append('public_id', publicId);

    // Enviar la imagen a Cloudinary
    const response = await fetch('https://api.cloudinary.com/v1_1/dny9olxtv/image/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    return data.secure_url;

  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
}