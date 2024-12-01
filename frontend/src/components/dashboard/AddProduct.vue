<template>
  <!-- Container for the "Add Product" form and product list -->
  <v-container class="add-product">
    <!-- Main heading for the form -->
    <h1>{{ originalProduct ? "Editar Producto" : "Añadir Producto" }}</h1>
    <v-row>
      <v-col cols="12" md="6">
        <!-- Form for adding a new product -->
        <v-form ref="form" v-model="valid">
          <!-- Product name input field with validation -->
          <v-text-field v-model="product.name" :rules="[v => !!v || 'Name is required']" label="Product Name"
            required></v-text-field>

          <!-- Product description input field -->
          <v-textarea v-model="product.description" label="Description" rows="3"></v-textarea>

          <!-- Product weight input field with validation -->
          <v-text-field v-model="product.weight" :rules="[v => !!v || 'Weight is required']" label="Weight"
            type="number" required></v-text-field>

          <!-- Product stock input field with validation -->
          <v-text-field v-model="product.stock" :rules="[v => !!v || 'Stock is required']" label="Stock" type="number"
            required></v-text-field>

          <!-- Product price input field with validation -->
          <v-text-field v-model="product.price" :rules="[v => !!v || 'Price is required']" label="Price" type="number"
            required></v-text-field>

          <!-- Product keywords input field -->
          <v-text-field v-model="product.keywords" label="Keywords" hint="Separate keywords with commas"></v-text-field>

          <!-- Input fields for product dimensions -->
          <v-row>
            <v-col cols="4">
              <v-text-field v-model="product.dimensions[0]" :rules="[v => !!v || 'Length is required']" label="Length"
                type="number" required></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-text-field v-model="product.dimensions[1]" :rules="[v => !!v || 'Width is required']" label="Width"
                type="number" required></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-text-field v-model="product.dimensions[2]" :rules="[v => !!v || 'Height is required']" label="Height"
                type="number" required></v-text-field>
            </v-col>
          </v-row>

          <!-- Field to upload product image -->

          <!-- Preview images to upload in list of cards with options to delete -->
          <v-card>
            <v-card-title>Imágenes del producto</v-card-title>
            <v-card-text>
              <v-row>
                <v-col v-for="(image, index) in previewImages" :key="index" cols="6" xs="3" sm="2" md="3" lg="2" xl="2">
                  <v-card>
                    <v-img :src=image aspect-ratio="1"></v-img>
                    <v-card-actions>
                      <v-btn icon color="error" @click="deleteImage(index)">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-file-input label="Upload Product Image" accept="image/*" multiple required
            @change="addImageFiles"></v-file-input>

          <!-- Buttons to submit or reset the form -->
          <v-btn color="primary" @click="submit">Añadir</v-btn>
          <v-btn color="error" @click="reset">Resetear</v-btn>
        </v-form>
      </v-col>

      <!-- Section for displaying the list of products -->
      <v-col cols="12" md="6">
        <h2>Lista de Productos</h2>
        <v-data-table :headers="tableHeaders" :items="products" item-value="_id" class="elevation-1">
          <!-- Toolbar section with title -->
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Productos</v-toolbar-title>
            </v-toolbar>
          </template>

          <!-- Action buttons (edit and delete) for each product -->
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template #item.actions="{ item }">
            <v-btn icon color="primary" @click="editProduct(item)">
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
            <v-btn icon color="error" @click="deleteProduct(item._id)">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useUserStore } from "@/stores/userStore";

export default {
  name: "AddProduct",
  data() {
    return {
      valid: false, // Form validity flag
      product: {    // Object holding the new product data
        name: "",
        description: "",
        weight: 0,
        stock: 0,
        price: 0,
        dimensions: [0, 0, 0], // Length, width, height
        images: [],
        keywords: []
      },
      imagesToUpload: [], // Image file to upload
      previewImages: [],  // Preview images to display
      products: [], // Array to hold the list of products
      tableHeaders: [  // Table headers for displaying products
        { title: "Name", key: "name" },
        { title: "Weight", key: "weight" },
        { title: "Stock", key: "stock" },
        { title: "Description", key: "description" },
        { title: "Price", key: "price" },
        { title: "Keywords", key: "keywords" },
        { title: "Dimensions", key: "dimensions" },
        { title: "Images", key: "images" },
        { title: "Actions", key: "actions", sortable: false },
      ],
      originalProduct: null,  // Original product data for editing
    };
  },
  mounted() {
    // Fetch products when the component is mounted
    this.fetchProducts();
  },
  methods: {
    // Method to fetch products from the backend API
    async fetchProducts() {
      try {
        const userStore = useUserStore();
        const userId = userStore.userId;

        if (!userId) throw new Error("Provider ID not found");

        const route = `http://127.0.0.1:3000/providers/${userId}/products`;
        const response = await fetch(route);
        if (!response.ok) throw new Error("Error fetching products");

        const productsData = await response.json();
        this.products = productsData; // Store fetched products
      } catch (error) {
        console.error("Error loading products:", error);
      }
    },

    // Method to submit the form and add a new product
    async submit() {
      try {
        const userStore = useUserStore();
        const userId = userStore.userId;
        if (!userId) throw new Error("Provider ID not found");
        this.product.keywords = Array.isArray(this.product.keywords)
          ? this.product.keywords // If keywords are already an array, use them as is
          : this.product.keywords.split(",").map((keyword) => keyword.trim());
        if (this.originalProduct) {
          // Update an existing product
          delete this.product._id;  // Remove the _id field
          delete this.product.__v;  // Remove the __v field
          if (this.isProductModified()) {
            const route = `http://localhost:3000/products/${this.originalProduct._id}`;
            // Create FormData object
            const formData = new FormData();
            formData.append('name', this.product.name);
            formData.append('weight', this.product.weight);
            formData.append('stock', this.product.stock);
            formData.append('description', this.product.description);
            formData.append('price', this.product.price);
            formData.append('dimensions', JSON.stringify(this.product.dimensions));
            formData.append('keywords', JSON.stringify(this.product.keywords));
            // Append images if any
            if (this.imagesToUpload && this.imagesToUpload.length > 0) {
              this.imagesToUpload.forEach((file) => {
                formData.append('images', file);
              });
            }
            const response = await fetch(route, {
              method: "PUT",
              body: formData,
            });
            if (!response.ok) throw new Error("Error updating product");
            const updatedProduct = await response.json();
            const index = this.products.findIndex(
              (product) => product._id === updatedProduct._id
            );
            if (index !== -1) {
              this.products.splice(index, 1, updatedProduct);
            }
            this.reset();
          } else {
            console.log("No changes made to the product.");
          }
        } else {
          // Create a new product
          if (!this.imagesToUpload) {
            throw new Error("At least 1 image is required");
          }
          this.product.dimensions = this.product.dimensions.map(Number);
          const formData = new FormData();
          formData.append('name', this.product.name);
          formData.append('weight', this.product.weight);
          formData.append('stock', this.product.stock);
          formData.append('description', this.product.description);
          formData.append('price', this.product.price);
          formData.append('keywords', this.product.keywords);
          formData.append('dimensions', this.product.dimensions);
          // Add images to the form data
          this.imagesToUpload.forEach((file) => {
            formData.append('images', file);
          });
          const response = await fetch('http://localhost:3000/products', {
            method: "POST",
            body: formData,
          });
          if (!response.ok) throw new Error("Error adding product");
          const newProduct = await response.json();
          await fetch(`http://localhost:3000/providers/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId: newProduct._id }),
          });
          this.products.push(newProduct);
          this.reset();
        }
      } catch (error) {
        console.error("Error adding or updating product:", error);
      }
    },

    // Method to edit an existing product
    async editProduct(product) {
      this.product = { ...product };  // Pre-fill the form with product data
      this.originalProduct = { ...product };  // Save the original product data
      if (product.images && product.images.length > 0) {
        try {
          // Download the images as files
          const imageFiles = await this.fetchImagesAsFiles(product.images);
          this.imagesToUpload = [...imageFiles];
          this.generatePreviewImages();
        } catch (error) {
          console.error("Error fetching images:", error);
        }
      }
    },

    async fetchImagesAsFiles(imageUrls) {
      const promises = imageUrls.map(async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error fetching image from ${url}`);

        const blob = await response.blob();
        const filename = url.split("/").pop(); // Extract filename from URL
        return new File([blob], filename || "image.jpg", { type: blob.type });
      });

      return Promise.all(promises);
    },
    isProductModified() {
      return JSON.stringify(this.product) !== JSON.stringify(this.originalProduct);
    },
    // Method to delete a product
    async deleteProduct(productId) {
      try {
        const userStore = useUserStore();
        const userId = userStore.userId;

        if (!userId) throw new Error("User ID not found");

        // Unlink the product from the provider
        const Response = await fetch(`http://localhost:3000/providers/${userId}/removeProduct`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId }),
        });

        if (!Response.ok) throw new Error(`Error unlinking product from provider`);

        // Send a DELETE request to remove the product
        const route = `http://127.0.0.1:3000/products/${productId}`;
        const response = await fetch(route, { method: "DELETE" });
        if (!response.ok) throw new Error("Error deleting product");

        // Remove the product from the list
        this.products = this.products.filter((product) => product._id !== productId);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
    addImageFiles(event) {
      const newFiles = Array.from(event.target.files);
      this.imagesToUpload = [...this.imagesToUpload, ...newFiles];
      this.generatePreviewImages();
    },
    deleteImage(index) {
      this.imagesToUpload.splice(index, 1);
      this.generatePreviewImages();
    },
    generatePreviewImages() {
      // Clean up existing preview images
      this.clearPreviewImages();
      // Create new preview images
      this.previewImages = this.imagesToUpload.map((file) =>
        URL.createObjectURL(file)
      );
    },
    clearPreviewImages() {
      this.previewImages.forEach((url) => URL.revokeObjectURL(url));
      this.previewImages = [];
    },

    // Method to reset the form to its initial state
    reset() {
      this.$refs.form.reset();  // Reset form fields
      this.product = {
        name: "",
        description: "",
        weight: 0,
        stock: 0,
        price: 0,
        dimensions: [0, 0, 0],  // Reset dimensions
      };
      this.clearPreviewImages();
      this.imagesToUpload = [];  // Reset image files
      this.originalProduct = null;  // Reset original product data
    },
  },
  beforeDestroy() {
    // Clean up preview images before the component is destroyed
    this.clearPreviewImages();
  },
};
</script>

<style scoped>
/* Styling for the data table */
.v-data-table th,
.v-data-table td {
  padding: 12px;
  text-align: left;
  white-space: nowrap;
}

.v-data-table td {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Styling for the data table container */
.v-data-table {
  overflow-x: auto;
  background-color: white;
}

/* Styling for the toolbar */
.v-toolbar {
  background-color: #003459;
  /* Dark blue background */
  color: white;
}
</style>
