<script setup>
import HomeImage from '@/components/home/HomeImage.vue';
import ProviderList from '@/components/home/ProviderList.vue';
import AdviceList from '@/components/home/AdviceList.vue';
import FooterPage from '@/components/home/FooterPage.vue';
import Banner from '@/components/home/BannerComponent.vue';
import NavBar from '@/components/home/NavBar.vue';
import GenericList from '@/components/GenericList.vue';

</script>

<template>
  <NavBar />
  <HomeImage />
  <GenericList title="Productos Disponibles" :items="products" titleField="name" :fields="[
    { key: 'weight', label: 'Peso (kg)' },
    { key: 'price', label: 'Precio (€)' }
  ]" itemType="products" :previewFlag="true" />
  <Banner type="adoption" title="Adopción" subtitle="Nosotros necesitamos ayuda. Y ellos también."
    description="Adopta un perro y llévalo a tu casa. Te lo agradecerá incondicionalmente." />

  <GenericList title="Mascotas en Adopción" :items="pets" titleField="name" :fields="[
    { key: 'type', label: 'Especie' },
    { key: 'breed', label: 'Raza' },
    { key: 'birthDate', label: 'Edad' }
  ]" itemType="pets" :previewFlag="true" />
  <ProviderList />
  <Banner type="services" title="Servicios Que Ofrecemos"
    subtitle="Explora nuestros servicios para mascotas y encuentra lo que necesitas."
    description="Conoce los diversos servicios que ofrecemos para el cuidado y bienestar de tus mascotas." />
  <AdviceList />
  <FooterPage />
</template>

<script>
export default {
  name: "DevView",
  components: {
    GenericList,
  },
  data() {
    return {
      pets: [],
      products: [],
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();

        this.products = data;
      } catch (error) {
        console.error('Error fetching products:', error);
        return [];
      }
    },
    async fetchAdoptionPets() {
      try {
        const response = await fetch('http://localhost:3000/adoptionpets');
        const data = await response.json();

        this.pets = data;
      } catch (error) {
        console.error('Error fetching adoption pets:', error);
        return [];
      }
    },
  },
  mounted() {
    this.fetchProducts();
    this.fetchAdoptionPets();
  },
};
</script>
