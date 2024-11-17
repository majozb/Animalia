<script setup>
import FooterPage from '@/components/home/FooterPage.vue';
import NavBar from '@/components/home/NavBar.vue';
import GenericList from '@/components/GenericList.vue';
import FilterBox from '@/components/FilterBox.vue';

const ALL_SPECIES = [
  { key: "dogs", name: "Perros" },
  { key: "cats", name: "Gatos" },
  { key: "birds", name: "Aves" },
  { key: "fish", name: "Peces" },
  { key: "rodents", name: "Roedores" },
  { key: "reptiles", name: "Reptiles" },
];

</script>

<template>
  <div class="main-container">
    <NavBar />
    <v-row>
      <v-col cols="12" sm="12" md="3" lg="3" xl="3">
        <FilterBox filterBy="pets" :species="ALL_SPECIES" />
      </v-col>
      <v-col cols="12" sm="12" md="9" lg="9" xl="9">
        <generic-list title="Mascotas Disponibles" :items="pets" titleField="name" :fields="[
          { key: 'type', label: 'Especie' },
          { key: 'breed', label: 'Raza' },
          { key: 'birthDate', label: 'Edad' }
        ]" itemType="pets" />
      </v-col>
    </v-row>
  </div>
  <FooterPage />
</template>

<script>
export default {
  name: "PetsView",
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
    this.fetchPets();
  },
  methods: {
    async fetchPets() {
      try {
        const response = await fetch('http://127.0.0.1:3000/pets');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.pets = data;
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