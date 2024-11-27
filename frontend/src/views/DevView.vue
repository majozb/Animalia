<!-- src/views/DevView.vue -->
<template>
    <v-container>
      <h1>Vista de Desarrollo</h1>
      <!-- Prueba con lista de mascotas -->
      <CategorySelector />

      
    </v-container>
  </template>
  
  <script>
  import CategorySelector from '@/components/CategorySelector.vue';
  
  export default {
    name: "DevView",
    components: {
      CategorySelector,
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