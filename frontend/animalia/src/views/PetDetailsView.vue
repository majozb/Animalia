<script setup>
import ImageCarrousel from '@/components/details/ImageCarrousel.vue';
import FooterPage from '@/components/home/FooterPage.vue';
import NavBar from '@/components/home/NavBar.vue';
import GenericList from '@/components/GenericList.vue';

const MODEL_DATA = [
  {key: 'name', label: 'Nombre'},
  {key: 'type', label: 'Especie'},
  {key: 'breed', label: 'Raza'},
  {key: 'birthDate', label: 'Fecha de nacimiento'},
  {key: 'description', label: 'Descripción'},
]

</script>

<template>

  <!-- Navbar -->
  <NavBar />

  <!-- Main Content -->
  <v-container class="py-12">
    <v-row>
      <!-- Left Column -->
      <v-col cols="12" md="6">
        <ImageCarrousel :images="petData.images" />
      </v-col>

      <!-- Right Column -->
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-table>
            <tbody>
              <tr v-for="field in MODEL_DATA" :key="field.key">
                <td>{{ field.label }}</td>
                <td>{{ petData[field.key] }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
          
      </v-col>
    </v-row>

    <!-- See More Animals -->
    <v-row class="mt-12">
      <GenericList title="¿Tienes espacio para más amigos?" :items="petsDisplay" titleField="name" :fields="[
          { key: 'type', label: 'Especie' },
          { key: 'breed', label: 'Raza' },
          { key: 'birthDate', label: 'Edad' }
        ]" itemType="pets" :previewFlag=true />
    </v-row>
  </v-container>

  <!-- Footer -->
  <FooterPage />
</template>

<script>
export default {
  data() {
    return {
      petData: {},
      petsDisplay: [],
      images: [
        "../../assets/pets/673b807da3039f28f89c2f37/1.jpg",
        "../../assets/pets/673b807da3039f28f89c2f37/2.jpg",
        "../../assets/pets/673b807da3039f28f89c2f37/3.jpg",
        "../../assets/pets/673b807da3039f28f89c2f37/4.jpg",
        "../../assets/pets/673b807da3039f28f89c2f37/5.jpg",
        // Add more image paths here
      ],
    };
  },
  mounted() {
    this.fetchCurrentPet();
    this.fetchPets();
  },
  methods: {
    async fetchCurrentPet() {
      try {
        const route = `http://127.0.0.1:3000/pets/${this.$route.params.id}`;
        const response = await fetch(route);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.petData = data;
        console.log("data: ", data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    },
    async fetchPets() {
      try {
        const route = `http://127.0.0.1:3000/pets`;
        const response = await fetch(route);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.petsDisplay = data;
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    },
  },
};
</script>

<style>
/* Add custom styles if needed */
</style>