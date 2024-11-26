<template>
  <!-- Container for the "Add Product" form and product list -->
  <v-container class="add-product">
    <!-- Main heading for the form -->
    <h1>Add Product</h1>
    <v-row>
      <v-col cols="12" md="6">
        <!-- Form for adding a new product -->
        <v-form ref="form" v-model="valid">
          
          <!-- Product name input field with validation -->
          <v-text-field
            v-model="product.name"
            :rules="[v => !!v || 'Name is required']"
            label="Product Name"
            required
          ></v-text-field>

          <!-- Product description input field -->
          <v-textarea
            v-model="product.description"
            label="Description"
            rows="3"
          ></v-textarea>

          <!-- Product weight input field with validation -->
          <v-text-field
            v-model="product.weight"
            :rules="[v => !!v || 'Weight is required']"
            label="Weight"
            type="number"
            required
          ></v-text-field>

          <!-- Product stock input field with validation -->
          <v-text-field
            v-model="product.stock"
            :rules="[v => !!v || 'Stock is required']"
            label="Stock"
            type="number"
            required
          ></v-text-field>

          <!-- Product price input field with validation -->
          <v-text-field
            v-model="product.price"
            :rules="[v => !!v || 'Price is required']"
            label="Price"
            type="number"
            required
          ></v-text-field>

          <!-- Input fields for product dimensions -->
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="product.dimensions[0]"
                :rules="[v => !!v || 'Length is required']"
                label="Length"
                type="number"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-text-field
                v-model="product.dimensions[1]"
                :rules="[v => !!v || 'Width is required']"
                label="Width"
                type="number"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-text-field
                v-model="product.dimensions[2]"
                :rules="[v => !!v || 'Height is required']"
                label="Height"
                type="number"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Buttons to submit or reset the form -->
          <v-btn color="primary" @click="submit">Add Product</v-btn>
          <v-btn color="error" @click="reset">Reset</v-btn>
        </v-form>
      </v-col>

      <!-- Section for displaying the list of products -->
      <v-col cols="12" md="6">
        <h2>Provider's Products</h2>
        <v-data-table
          :headers="tableHeaders"
          :items="products"
          item-value="_id"
          class="elevation-1"
        >
          <!-- Toolbar section with title -->
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Products</v-toolbar-title>
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
      },
      products: [], // Array to hold the list of products
      tableHeaders: [  // Table headers for displaying products
        { title: "Name", key: "name" },
        { title: "Description", key: "description" },
        { title: "Weight", key: "weight" },
        { title: "Stock", key: "stock" },
        { title: "Price", key: "price" },
        { title: "Dimensions", key: "dimensions" },
        { title: "Actions", key: "actions", sortable: false },
      ],
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

        // Fetch products based on provider ID
        const response = await fetch(`/api/products?provider=${userId}`);
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

        // Send the new product data to the backend API
        const response = await fetch(`/api/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...this.product }),  // Send product details as JSON
        });

        if (!response.ok) throw new Error("Error adding product");

        const newProduct = await response.json(); // Get the added product
        this.products.push(newProduct);  // Add the new product to the list
        this.reset();  // Reset the form
      } catch (error) {
        console.error("Error adding product:", error);
      }
    },

    // Method to edit an existing product
    async editProduct(product) {
      this.product = { ...product };  // Pre-fill the form with product data
    },

    // Method to delete a product
    async deleteProduct(productId) {
      try {
        // Send a DELETE request to remove the product
        const response = await fetch(`/api/products/${productId}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error deleting product");

        // Remove the product from the list
        this.products = this.products.filter((product) => product._id !== productId);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
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
    },
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
  background-color: #F7DBA7; /* Light yellow background */
}

/* Styling for the toolbar */
.v-toolbar {
  background-color: #003459;  /* Dark blue background */
  color: #F7DBA7;  /* Light yellow text */
}
</style>
