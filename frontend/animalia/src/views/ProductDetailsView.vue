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
                  <td class="text-body-1" v-else-if="field.key === 'price'">{{ productData[field.key] + ' €'}}</td>
                  <td class="text-body-1" v-else>{{ productData[field.key] }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
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
export default {
  data() {
    return {
      productData: {},
      productsDisplay: [],
      items: [
        { title: 'Inicio', disabled: false, href: '/' },
        { title: 'Productos', disabled: false, href: '/products' },
        { title: `${this.$route.params.id}`, disabled: true, href: `/products/${this.$route.params.id}` },
      ]
    };
  },
  mounted() {
    this.fetchCurrentProduct();
    this.fetchProducts();
  },
  methods: {
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
        this.productsDisplay = data;
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

.text-h4 {
  color: #003366;
  font-weight: bold;
}
</style>