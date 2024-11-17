<script setup>
import FooterPage from '@/components/home/FooterPage.vue';
import NavBar from '@/components/home/NavBar.vue';
import GenericList from '@/components/GenericList.vue';
import FilterBox from '@/components/FilterBox.vue';

</script>

<template>
  <div class="main-container">
    <NavBar />
    <v-row>
      <v-col cols="12" sm="12" md="3" lg="3" xl="3">
        <FilterBox filterBy="products" />
      </v-col>
      <v-col cols="12" sm="12" md="9" lg="9" xl="9">
        <generic-list title="Productos Disponibles" :items="products" titleField="name" :fields="[
          { key: 'weight', label: 'Peso (kg)' },
          { key: 'price', label: 'Precio (€)' }
        ]" itemType="products" />
      </v-col>
    </v-row>
  </div>
  <FooterPage />
</template>

<script>
export default {
  name: "ProductsView",
  components: {
    GenericList,
    FilterBox,
  },
  data() {
    return {
      pets: [],
      products: [],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch('http://127.0.0.1:3000/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    },
  },
};
</script>


<style scoped>
.main-container {
  background-color: #fcfcfc;
}
</style>