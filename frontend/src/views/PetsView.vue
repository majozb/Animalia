<script setup>
import FooterPage from '@/components/home/FooterPage.vue';
import NavBar from '@/components/home/NavBar.vue';
import GenericList from '@/components/GenericList.vue';
import FilterBox from '@/components/FilterBox.vue';

const ALL_SPECIES = [
  { key: "Perro", name: "Perros" },
  { key: "Gato", name: "Gatos" },
  { key: "Ave", name: "Aves" },
  { key: "Pez", name: "Peces" },
  { key: "Conejo", name: "Conejo" },
  { key: "Reptiles", name: "Reptiles" },
];

</script>

<template>
  <div class="main-container">
    <NavBar />
    <v-row>
      <v-col cols="12" sm="12" md="3" lg="3" xl="3">
        <FilterBox filterBy="pets" :species="ALL_SPECIES" @filters="fetchFilteredPets" />
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
    this.fetchFilteredPets();
  },
  methods: {
    async fetchFilteredPets(filterCriteria) {
      try {
        const queryParams = new URLSearchParams(filterCriteria);
        const url = `http://127.0.0.1:3000/adoptionpets?${queryParams}`;
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