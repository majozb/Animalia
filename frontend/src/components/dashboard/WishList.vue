<template>
  <v-container class="WishList">
    <v-row>
      <v-col cols="12">
        <h1>Lista de deseados</h1>
      </v-col>
    </v-row>
    <v-row v-if="products.length === 0">
      <h2>
        Oh no! No hay productos en la lista de deseados. ¡Añade algunos!
      </h2>
    </v-row>
    <v-row v-if="products.length > 0">
      <v-col cols="12" sm="12" md="9" lg="9" xl="9">
        <generic-list title="" :items="products" titleField="name" :fields="[
          { key: 'weight', label: 'Peso (kg)' },
          { key: 'price', label: 'Precio (€)' },
          { key: 'stock', label: 'Stock' }
        ]" itemType="products" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useUserStore } from "@/stores/userStore"; // Imports the user store
import GenericList from "@/components/GenericList.vue";

export default {
  data() {
    return {
      products: [],
    };
  },
  components: {
    GenericList,
  },
  watch: {
    $route() {
      this.fetchProducts();
    },
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch(`http://localhost:3000/purchasers/${useUserStore().userId}`);
        if (!response.ok) {
          console.error('There was a problem fetching the user:', response);
          return;
        }
        const userData = await response.json();
        for (let i = 0; i < userData.wishlist.length; i++) {
          const response = await fetch(`http://localhost:3000/products/${userData.wishlist[i]}`);
          if (!response.ok) {
            console.error('There was a problem fetching the product:', response);
            return;
          }
          const productData = await response.json();
          this.products.push(productData);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>