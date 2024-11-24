<!-- src/views/DevView.vue -->
<template>
    <v-container>
      <h1>Vista de Desarrollo</h1>
      <!-- Prueba con lista de mascotas -->
      <ImageCarrousel />

      
    </v-container>
  </template>
  
  <script>
  import ImageCarrousel from "@/components/details/ImageCarrousel.vue";

  
  export default {
    name: "DevView",
    components: {
      ImageCarrousel,
    },
    data() {
      return {
      };
    },
  };
  </script>
  
  <style scoped>
  /* Estilos adicionales para la vista de desarrollo */
  .v-container {
    background-color: beige;
  }
  </style>