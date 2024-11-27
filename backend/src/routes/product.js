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
productRouter.post('/products', upload.single('image'), async (req, res) => {
  try {
    req.body.dimensions = req.body.dimensions.split(',').map(Number);
    const product = new Product(req.body);
    await product.save();

    if (!req.file) {
      console.error('No image uploaded');
      return res.status(400).send({ error: 'Image is required' });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: `products/${product._id}` }, // Directory in Cloudinary
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

    // Update the product with the image URL
    product.images = [uploadResult.secure_url];
    await product.save();

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
productRouter.put('/products/:id', async (req, res) => { 
  const updates = Object.keys(req.body); 
  const allowedUpdates = ['name', 'weight', 'stock', 'description', 'price', 'keywords', 'provider', 'dimensions', 'images']; 
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update)); 
  
  if (!isValidOperation) { return res.status(400).send({ error: 'Actualización no permitida' }); } 
  
  try { 
    const product = await Product.findById(req.params.id); 
    if (!product) { return res.status(404).send(); } 
    
    updates.forEach((update) => product[update] = req.body[update]); 
    await product.save(); 
    res.send(product); 
  } catch (e) { res.status(400).send(e); } 
});

// (DELETE) /products/:id
productRouter.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (e) {
    res.status(400).send();
  }
});
