<script setup>
import FooterPage from '@/components/home/FooterPage.vue';
import NavBar from '@/components/home/NavBar.vue';
import GenericList from '@/components/GenericList.vue';
import FilterBox from '@/components/FilterBox.vue';
import CategorySelector from '@/components/CategorySelector.vue';
import { categories  as categoryList } from '@/assets/categoryList';



</script>

<template>
  <div class="main-container">
    <NavBar />
    <v-breadcrumbs :items="items"></v-breadcrumbs>
    <v-row>
      <v-col cols="12" sm="12" md="3" lg="3" xl="3">
        <v-row>
          <v-col cols="12">
            <CategorySelector :categories="categories" @updateCategory="updateKeywords"/>
          </v-col>
          <v-col cols="12">
            <FilterBox filterBy="products" @filters="fetchFilteredProducts"/>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="12" md="9" lg="9" xl="9">
        <generic-list title="Productos Disponibles" :items="products" titleField="name" :fields="[
          { key: 'weight', label: 'Peso (kg)' },
          { key: 'price', label: 'Precio (€)' },
          { key: 'stock', label: 'Stock' }
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
    FilterBox
  },
  data() {
    return {
      pets: [],
      products: [],
      keywords: [],
      items: [
        {
          title: "Inicio",
          disabled: false,
          href: "/",
        },
        {
          title: "Productos",
          disabled: false,
          href: "/products",
        },
      ],
      categories: categoryList,
    };
  },
  mounted() {
    this.fetchFilteredProducts();
  },
  methods: {
    async fetchFilteredProducts(filterCriteria) {
      try {
        const queryParams = new URLSearchParams({
          ...filterCriteria,
          keywords: this.keywords.join(',')
        });
        const url = `http://127.0.0.1:3000/products?${queryParams}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    },
    updateKeywords(category) {
      this.keywords = category.keywords;
      this.fetchFilteredProducts();
    },
  },
};
</script>


<style scoped>
.main-container {
  background-color: #fcfcfc;
}
</style>