<!-- src/views/DevView.vue -->
<template>
    <v-container>
      <h1>Vista de Desarrollo</h1>
  
      <!-- Prueba con lista de mascotas -->
      <generic-list
        title="Mascotas en Adopción"
        :items="pets"
        titleField="name"
        :fields="[
          { key: 'type', label: 'Tipo' },
          { key: 'age', label: 'Edad' },
        ]"
        imageType="pets"
        :previewFlag="true"
      />
  
      <!-- Prueba con lista de productos -->
      <generic-list
        title="Productos Disponibles"
        :items="products"
        titleField="name"
        :fields="[
          { key: 'product', label: 'Producto' },
          { key: 'size', label: 'Tamaño' },
          { key: 'price', label: 'Precio' }
        ]"
        imageType="products"
      />
    </v-container>
  </template>
  
  <script>
  import GenericList from "../components/GenericList.vue";
  
  export default {
    name: "DevView",
    components: {
      GenericList,
    },
    data() {
      return {
        pets: [{
          "_id": "635aa4e1f1b2a3d4e5f6c8d1",
          "name": "Maya",
          "owner": "635af7d4f1b2a3d4e5f6b9c1",
          "type": "Perro",
          "breed": "Bichon",
          "vaccines": ["Rabia", "Parvovirus", "Moquillo"],
          "age": 3
        },
        {
          "_id": "635aa4e1f1b2a3d4e5f6c8d2",
          "name": "Luna",
          "owner": "635af7d4f1b2a3d4e5f6b9c2",
          "type": "Gato",
          "breed": "Siames",
          "vaccines": ["Rabia", "Leucemia Felina"],
          "age": 2
        },
        {
          "_id": "635aa4e1f1b2a3d4e5f6c8d3",
          "name": "Kiwi",
          "owner": "635af7d4f1b2a3d4e5f6b9c3",
          "type": "Ave",
          "breed": "Periquito",
          "vaccines": [],
          "age": 1
        },
        {
          "_id": "635aa4e1f1b2a3d4e5f6c8d4",
          "name": "Bella",
          "owner": "635af7d4f1b2a3d4e5f6b9c4",
          "type": "Conejo",
          "breed": "Enano",
          "vaccines": ["Mixomatosis", "Enfermedad Hemorrágica Viral"],
          "age": 1
        },
        {
          "_id": "635aa4e1f1b2a3d4e5f6c8d5",
          "name": "Goldie", 
          "owner": "635af7d4f1b2a3d4e5f6b9c5",
          "type": "Pez",
          "breed": "Goldfish",
          "vaccines": [],
          "age": 1
        },
        {
          "_id": "635aa4e1f1b2a3d4e5f6c8d1",
          "name": "Maya",
          "owner": "635af7d4f1b2a3d4e5f6b9c1",
          "type": "Perro",
          "breed": "Bichon",
          "vaccines": ["Rabia", "Parvovirus", "Moquillo"],
          "age": 3
        },
        {
          "_id": "635aa4e1f1b2a3d4e5f6c8d1",
          "name": "Maya",
          "owner": "635af7d4f1b2a3d4e5f6b9c1",
          "type": "Perro",
          "breed": "Bichon",
          "vaccines": ["Rabia", "Parvovirus", "Moquillo"],
          "age": 3
        },
        {
          "_id": "635aa4e1f1b2a3d4e5f6c8d1",
          "name": "Maya",
          "owner": "635af7d4f1b2a3d4e5f6b9c1",
          "type": "Perro",
          "breed": "Bichon",
          "vaccines": ["Rabia", "Parvovirus", "Moquillo"],
          "age": 3
        },
        {
          "_id": "635aa4e1f1b2a3d4e5f6c8d1",
          "name": "Maya",
          "owner": "635af7d4f1b2a3d4e5f6b9c1",
          "type": "Perro",
          "breed": "Bichon",
          "vaccines": ["Rabia", "Parvovirus", "Moquillo"],
          "age": 3
        },
        {
          "_id": "635aa4e1f1b2a3d4e5f6c8d1",
          "name": "Maya",
          "owner": "635af7d4f1b2a3d4e5f6b9c1",
          "type": "Perro",
          "breed": "Bichon",
          "vaccines": ["Rabia", "Parvovirus", "Moquillo"],
          "age": 3
        },
        {
          "_id": "635aa4e1f1b2a3d4e5f6c8d1",
          "name": "Maya",
          "owner": "635af7d4f1b2a3d4e5f6b9c1",
          "type": "Perro",
          "breed": "Bichon",
          "vaccines": ["Rabia", "Parvovirus", "Moquillo"],
          "age": 3
        }],
        products: [{
          "_id": "634aa3d4f1b2a3d4e5f6a7b1",
          "name": "Comida Premium para Perros",
          "weight": 2.5,
          "stock": 80,
          "description": "Alimento balanceado para perros adultos de todas las razas. Rico en proteínas y vitaminas.",
          "price": 35.99,
          "keywords": ["perro", "comida", "alimento balanceado", "nutrición"],
          "provider": "634af3d4f1b2a3d4e5f6b7a1"
        },
        {
          "_id": "634aa3d4f1b2a3d4e5f6a7b2",
          "name": "Juguete Mordedor para Perros",
          "weight": 0.2,
          "stock": 150,
          "description": "Juguete resistente para mantener a los perros entretenidos. Ideal para razas grandes.",
          "price": 12.50,
          "keywords": ["perro", "juguete", "mordedor", "entrenamiento"],
          "provider": "634af3d4f1b2a3d4e5f6b7a2"
        },
        {
          "_id": "634aa3d4f1b2a3d4e5f6a7b3",
          "name": "Arena Aglomerante para Gatos",
          "weight": 5.0,
          "stock": 200,
          "description": "Arena absorbente y aglomerante para mantener la bandeja de tu gato limpia y sin olores.",
          "price": 10.99,
          "keywords": ["gato", "arena", "higiene", "aglomerante"],
          "provider": "634af3d4f1b2a3d4e5f6b7a3"
        },
        {
          "_id": "634aa3d4f1b2a3d4e5f6a7b4",
          "name": "Jaula para Pájaros Pequeños",
          "weight": 1.5,
          "stock": 30,
          "description": "Jaula espaciosa con varios niveles para pájaros pequeños. Incluye accesorios.",
          "price": 75.00,
          "keywords": ["pájaros", "jaula", "accesorios"],
          "provider": "634af3d4f1b2a3d4e5f6b7a4"
        },
        {
          "_id": "634aa3d4f1b2a3d4e5f6a7b5",
          "name": "Filtro de Agua para Peceras",
          "weight": 0.8,
          "stock": 65,
          "description": "Filtro de alta eficiencia para peceras de hasta 50 litros. Mejora la calidad del agua.",
          "price": 29.99,
          "keywords": ["peces", "pecera", "filtro de agua", "acuario"],
          "provider": "634af3d4f1b2a3d4e5f6b7a5"
        }],
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