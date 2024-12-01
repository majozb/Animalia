import express from 'express';
import { Product } from '../models/product.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

export const productRouter = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB como máximo
  dest: 'uploads/'
});

// (POST) /products
productRouter.post('/products', upload.array('images'), async (req, res) => {
  try {
    // Procesar las dimensiones
    req.body.dimensions = req.body.dimensions.split(',').map(Number);

    // Crear y guardar el producto inicial para obtener el _id
    const product = new Product(req.body);
    await product.save();

    // Verificar que se hayan subido imágenes
    console.log('req.files', req.files);
    if (!req.files || req.files.length === 0) {
      console.error('No images uploaded');
      return res.status(400).send({ error: 'At least one image is required' });
    }

    // Subir cada imagen a Cloudinary y obtener las URLs
    const imageUploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: `products/${product._id}` },
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

    // Actualizar el producto con las URLs de las imágenes
    product.images = imageUrls;
    await product.save();

    // Enviar la respuesta exitosa
    res.status(201).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

// (GET) /products
productRouter.get('/products', async (req, res) => {
  try {
    let products = await Product.find();

    // Max price filter
    const maxPrice = Math.max(...products.map(product => product.price));

    const priceRange = req.query.priceRange ? req.query.priceRange.split(',').map(Number) : [0, maxPrice];
    const inStock = (req.query.inStock === undefined) ? true : req.query.inStock === 'true';

    if (priceRange != [0, 0]) {
      products = products.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1]);
    }

    if (inStock) {
      products = products.filter((product) => product.stock > 0);
    }

    res.status(200).send(products);
  } catch (e) {
    res.status(500).send();
  }
});

// (GET) /products/:id
productRouter.get('/products/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.findById(_id);
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (e) {
    res.status(400).send();
  }
});

// (PUT) /products/:id
// (PUT) /products/:id
productRouter.put('/products/:id', upload.array('images', 10), async (req, res) => {
  // Parse dimensions and keywords if they are JSON strings
  if (req.body.dimensions) {
    req.body.dimensions = JSON.parse(req.body.dimensions);
  }
  if (req.body.keywords) {
    req.body.keywords = JSON.parse(req.body.keywords);
  }

  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'weight', 'stock', 'description', 'price', 'keywords', 'provider', 'dimensions'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Actualización no permitida' });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) { return res.status(404).send(); }

    const folderPath = `products/${product._id}`;

    // Check if new images are provided
    if (req.files && req.files.length > 0) {
      // Delete existing images
      const existingResources = await cloudinary.api.resources({
        type: 'upload',
        prefix: folderPath,
        max_results: 500,
      });

      const publicIds = existingResources.resources.map(resource => resource.public_id);

      if (publicIds.length > 0) {
        await cloudinary.api.delete_resources(publicIds);
      }

      // Optionally delete the empty folder
      await cloudinary.api.delete_folder(folderPath);

      // Upload new images
      const imageUploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: folderPath },
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
      product.images = imageUrls;
    }

    // Update allowed fields
    updates.forEach((update) => {
      if (update !== 'images') {
        product[update] = req.body[update];
      }
    });

    await product.save();
    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});


// (DELETE) /products/:id
productRouter.delete('/products/:id', async (req, res) => {
  try {
    // Buscar y eliminar el producto de la base de datos
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send();
    }

    // Ruta de la carpeta en Cloudinary donde se almacenan las imágenes del producto
    const folderPath = `products/${product._id}`;

    // Obtener todos los recursos (imágenes) en la carpeta del producto
    const existingResources = await cloudinary.api.resources({
      type: 'upload',
      prefix: folderPath,
      max_results: 500,
    });

    // Obtener los public_ids de las imágenes para poder eliminarlas
    const publicIds = existingResources.resources.map((resource) => resource.public_id);

    if (publicIds.length > 0) {
      // Eliminar todas las imágenes en la carpeta
      await cloudinary.api.delete_resources(publicIds);
    }

    // Eliminar la carpeta del producto en Cloudinary
    await cloudinary.api.delete_folder(folderPath);

    res.send(product);
  } catch (e) {
    console.error('Error al eliminar el producto:', e);
    res.status(400).send();
  }
});

