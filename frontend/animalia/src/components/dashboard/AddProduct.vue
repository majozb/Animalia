<template>
  <v-container class="add-product">
    <h1>Añadir Producto</h1>
    <v-row>
      <v-col cols="12" md="6">
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="product.name"
            :rules="[v => !!v || 'El nombre es requerido']"
            label="Nombre del Producto"
            required
          ></v-text-field>

          <v-textarea
            v-model="product.description"
            label="Descripción"
            rows="3"
          ></v-textarea>

          <v-text-field
            v-model="product.weight"
            :rules="[v => !!v || 'El peso es requerido']"
            label="Peso"
            type="number"
            required
          ></v-text-field>

          <v-text-field
            v-model="product.stock"
            :rules="[v => !!v || 'El stock es requerido']"
            label="Stock"
            type="number"
            required
          ></v-text-field>

          <v-text-field
            v-model="product.price"
            :rules="[v => !!v || 'El precio es requerido']"
            label="Precio"
            type="number"
            required
          ></v-text-field>

          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="product.dimensions[0]"
                :rules="[v => !!v || 'El largo es requerido']"
                label="Largo"
                type="number"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-text-field
                v-model="product.dimensions[1]"
                :rules="[v => !!v || 'El ancho es requerido']"
                label="Ancho"
                type="number"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-text-field
                v-model="product.dimensions[2]"
                :rules="[v => !!v || 'El alto es requerido']"
                label="Alto"
                type="number"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-btn color="primary" @click="submit">Añadir Producto</v-btn>
          <v-btn color="error" @click="reset">Resetear</v-btn>
        </v-form>
      </v-col>

      <v-col cols="12" md="6">
        <h2>Productos del Proveedor</h2>
        <v-data-table
          :headers="tableHeaders"
          :items="products"
          item-value="_id"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Productos</v-toolbar-title>
            </v-toolbar>
          </template>
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
      valid: false,
      product: {
        name: "",
        description: "",
        weight: 0,
        stock: 0,
        price: 0,
        dimensions: [0, 0, 0],  // Cambiado para almacenar un array de dimensiones
      },
      products: [],
      tableHeaders: [
        { title: "Nombre", key: "name" },
        { title: "Descripción", key: "description" },
        { title: "Peso", key: "weight" },
        { title: "Stock", key: "stock" },
        { title: "Precio", key: "price" },
        { title: "Dimensiones", key: "dimensions" },
        { title: "Acciones", key: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const userStore = useUserStore();
        const userId = userStore.userId;

        if (!userId) throw new Error("No se encuentra el ID del proveedor");

        const response = await fetch(`/api/products?provider=${userId}`);
        if (!response.ok) throw new Error("Error al obtener productos");

        const productsData = await response.json();
        this.products = productsData;
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    },
    async submit() {
      try {
        const userStore = useUserStore();
        const userId = userStore.userId;

        if (!userId) throw new Error("No se encuentra el ID del proveedor");

        const response = await fetch(`/api/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...this.product }),
        });

        if (!response.ok) throw new Error("Error al añadir producto");

        const newProduct = await response.json();
        this.products.push(newProduct);
        this.reset();
      } catch (error) {
        console.error("Error al añadir producto:", error);
      }
    },
    async editProduct(product) {
      this.product = { ...product };
    },
    async deleteProduct(productId) {
      try {
        const response = await fetch(`/api/products/${productId}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al borrar producto");

        this.products = this.products.filter((product) => product._id !== productId);
      } catch (error) {
        console.error("Error al eliminar producto:", error);
      }
    },
    reset() {
      this.$refs.form.reset();
      this.product = {
        name: "",
        description: "",
        weight: 0,
        stock: 0,
        price: 0,
        dimensions: [0, 0, 0], // Reiniciar las dimensiones a [0, 0, 0]
      };
    },
  },
};
</script>

<style scoped>
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

.v-data-table {
  overflow-x: auto;
  background-color: #F7DBA7;
}
.v-toolbar{
  background-color: #003459;
  color: #F7DBA7;
}
</style>
