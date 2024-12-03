<script setup>
import ImageCarrousel from '@/components/details/ImageCarrousel.vue';
import FooterPage from '@/components/home/FooterPage.vue';
import NavBar from '@/components/home/NavBar.vue';
import GenericList from '@/components/GenericList.vue';

const MODEL_DATA = [
  { key: 'name', label: 'Nombre' },
  { key: 'weight', label: 'Peso' },
  { key: 'stock', label: 'Stock' },
  { key: 'price', label: 'Precio' },
  { key: 'dimensions', label: 'Dimensiones' },
  { key: 'description', label: 'Descripción' },
]

</script>

<template>
  <!-- Navbar -->
  <div class="main-container">
    <NavBar />
    <!-- Main Content -->
    <v-container>
      <v-breadcrumbs :items="items"></v-breadcrumbs>
      <v-row>
        <!-- Left Column -->
        <v-col cols="12" md="6">
          <ImageCarrousel :images="productData.images" />
        </v-col>
        <!-- Right Column -->
        <v-col cols="12" md="6">
          <v-card class="pa-4">
            <v-card-title class="text-h4">{{ productData.name }}</v-card-title>
            <v-card-subtitle class="text-subtle">Referencia #{{ productData._id }}</v-card-subtitle>
            <v-divider class="my-4"></v-divider>
            <!-- Pet Details -->
            <v-table>
              <tbody>
                <tr v-for="field in MODEL_DATA" :key="field.key">
                  <td class="text-body-1 font-weight-bold">{{ field.label }}</td>
                  <td class="text-body-1"
                    v-if="field.key === 'dimensions' && productData[field.key] && productData[field.key].length === 3">
                    {{ productData[field.key].join(' x ') + ' (alto x largo x ancho)' }}</td>
                  <td class="text-body-1" v-else-if="field.key === 'dimensions'">-</td>
                  <td class="text-body-1" v-else-if="field.key === 'weight'">{{ productData[field.key] ?
                    productData[field.key] + ' kg' : '-' }}</td>
                  <td class="text-body-1" v-else-if="field.key === 'price'">{{ productData[field.key] + ' €' }}</td>
                  <td class="text-body-1" v-else>{{ productData[field.key] }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
          <v-btn v-if="userType === 'purchaser'" class="blue-button" @click="addToWishlist" outlined>
            <v-icon left>mdi-heart-outline</v-icon>
            AÑADIR A LA LISTA DE DESEADOS
            <!-- <v-icon left>mdi-heart-outline</v-icon> -->
          </v-btn>
          <v-btn v-if="userType === 'purchaser'" class="red-button" @click="removeFromWishlist" outlined>
            <v-icon left>mdi-heart-broken</v-icon>
            ELIMINAR DE LA LISTA DE DESEADOS
          </v-btn>
          <!-- Snackbar para mostrar el mensaje -->
          <v-snackbar v-model="snackbar" :timeout="3000" color="info" absolute class="snackbar">
            {{ snackbarMessage }}
            <template #actions>
              <v-btn text @click="snackbar = false">Cerrar</v-btn>
            </template>
          </v-snackbar>
        </v-col>
      </v-row>
      <!-- See More Animals -->
      <v-row class="mt-12">
        <generic-list title="Más productos" :items="productsDisplay" titleField="name" :fields="[
          { key: 'weight', label: 'Peso (kg)' },
          { key: 'price', label: 'Precio (€)' }
        ]" itemType="products" :previewFlag=true />
      </v-row>
    </v-container>
  </div>
  <!-- Footer -->
  <FooterPage />
</template>

<script>
import { useUserStore } from "@/stores/userStore"; // Imports the user store

export default {
  data() {
    return {
      productData: {},
      productsDisplay: [],
      items: [
        { title: 'Inicio', disabled: false, href: '/' },
        { title: 'Productos', disabled: false, href: '/products' },
        { title: `${this.$route.params.id}`, disabled: true, href: `/products/${this.$route.params.id}` },
      ],
      snackbar: false,
      snackbarMessage: '',
      isInWishlist: false,
    };
  },
  mounted() {
    this.fetchCurrentProduct();
    this.fetchProducts();
  },
  computed: {
    userType() {
      return useUserStore().userType;
    },
  },
  methods: {
    async addToWishlist() {
      try {
        const purchaserResponse = await fetch(`http://127.0.0.1:3000/purchasers/${useUserStore().userId}`);
        if (!purchaserResponse.ok) {
          console.error('There was a problem fetching the purchaser:', purchaserResponse);
          return;
        }

        const userData = await purchaserResponse.json();

        const currentWishlist = Array.isArray(userData.wishlist)
          ? userData.wishlist
          : [];

        if (currentWishlist.includes(this.productData._id)) {
          this.snackbarMessage = "El producto ya está en la lista de deseos.";
          this.snackbar = true;
          return;
        }

        const updatedWishlist = [...currentWishlist, this.productData._id];

        const productResponse = await fetch(`http://127.0.0.1:3000/purchasers/${useUserStore().userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            wishlist: updatedWishlist,
          }),
        });
        if (!productResponse.ok) {
          console.error('There was a problem adding the product to the wishlist:', productResponse);
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
      this.isInWishlist = true;
      this.snackbarMessage = "Producto añadido a la lista de deseos.";
      this.snackbar = true;
    },
    async removeFromWishlist() {
      try {
        const purchaserResponse = await fetch(`http://127.0.0.1:3000/purchasers/${useUserStore().userId}`);
        if (!purchaserResponse.ok) {
          console.error('There was a problem fetching the purchaser:', purchaserResponse);
          return;
        }

        const userData = await purchaserResponse.json();

        const currentWishlist = Array.isArray(userData.wishlist)
          ? userData.wishlist
          : [];

        if (!currentWishlist.includes(this.productData._id)) {
          this.snackbarMessage = "El producto no está en la lista de deseos.";
          this.snackbar = true;
          return;
        }
        const updatedWishlist = currentWishlist.filter((id) => id !== this.productData._id);

        const productResponse = await fetch(`http://127.0.0.1:3000/purchasers/${useUserStore().userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            wishlist: updatedWishlist,
          }),
        });
        if (!productResponse.ok) {
          console.error('There was a problem removing the product to the wishlist:', productResponse);
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
      this.snackbarMessage = "Producto eliminado de la lista de deseos.";
      this.snackbar = true;
    },
    async fetchCurrentProduct() {
      try {
        const route = `http://127.0.0.1:3000/products/${this.$route.params.id}`;
        const response = await fetch(route);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.productData = data;
        console.log("data: ", data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    },
    async fetchProducts() {
      try {
        const route = `http://127.0.0.1:3000/products`;
        const response = await fetch(route);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.productsDisplay = data.filter((product) => product._id !== this.productData._id);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    },
  },
};
</script>

<style scoped>
.snackbar {
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 80px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 8px;
  text-align: center;
}

.blue-button {
  background-color: #003366;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
}

.blue-button:hover {
  background-color: #24527f;
}

.red-button {
  background-color: #D75A5A;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
}

.red-button:hover {
  background-color: #ff7777;
}

.main-container {
  background-color: #fcfcfc;
}

.text-h4 {
  color: #003366;
  font-weight: bold;
}
</style>