<script setup>
import ImageCarrousel from '@/components/details/ImageCarrousel.vue';
import FooterPage from '@/components/home/FooterPage.vue';
import NavBar from '@/components/home/NavBar.vue';
import GenericList from '@/components/GenericList.vue';

const MODEL_DATA = [
  { key: 'name', label: 'Nombre' },
  { key: 'genre', label: 'Género' },
  { key: 'type', label: 'Especie' },
  { key: 'breed', label: 'Raza' },
  { key: 'birthDate', label: 'Fecha de nacimiento' },
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
          <ImageCarrousel :images="petData.images" />
        </v-col>
        <!-- Right Column -->
        <v-col cols="12" md="6">
          <v-card class="pa-4">
            <v-card-title class="text-h4">{{ petData.name }}</v-card-title>
            <v-card-subtitle class="text-subtle">Referencia #{{ petData._id }}</v-card-subtitle>
            <v-divider class="my-4"></v-divider>
            <!-- Pet Details -->
            <v-table>
              <tbody>
                <tr v-for="field in MODEL_DATA" :key="field.key">
                  <td class="text-body-1 font-weight-bold">{{ field.label }}</td>
                  <td class="text-body-1" v-if="field.key === 'genre'">{{ petData[field.key] ? 'Hembra' : 'Macho' }}
                  </td>
                  <td class="text-body-1" v-else-if="field.key === 'birthDate'">{{ new
                    Date(petData[field.key]).toLocaleDateString() }}</td>
                  <td class="text-body-1" v-else>{{ petData[field.key] }}</td>
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
  </div>
  <!-- Footer -->
  <FooterPage />
</template>

<script>
export default {
  data() {
    return {
      petData: {},
      petsDisplay: [],
      items: [
        { title: 'Inicio', disabled: false, href: '/' },
        { title: 'Mascotas', disabled: false, href: '/pets' },
        { title: `${this.$route.params.id}`, disabled: true, href: `/pets/${this.$route.params.id}` },
      ]
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
        const route = `http://127.0.0.1:3000/adoptionpets`;
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

<style scoped>
.main-container {
  background-color: #fcfcfc;
}

.text-h4 {
  color: #003366;
  font-weight: bold;
}
</style>