<script setup>
import FooterPage from '@/components/home/FooterPage.vue';
import NavBar from '@/components/home/NavBar.vue';
import GenericList from '@/components/GenericList.vue';
import FilterBox from '@/components/FilterBox.vue';

</script>

<template>
  <NavBar />
  <div class="main-container">
    <v-row>
      <v-col cols="3">
        <FilterBox filterBy="products" />
      </v-col>
      <v-col cols="9">
        <generic-list title="Productos Disponibles" :items="products" titleField="name" :fields="[
          { key: 'weight', label: 'Peso (kg)' },
          { key: 'price', label: 'Precio (€)' }
        ]" itemType="products" />
      </v-col>
    </v-row>
  </div>
  <FooterPage />
</template>

<script>
export default {
  name: "DevView",
  components: {
    GenericList,
    FilterBox,
  },
  data() {
    return {
      pets: [
        {
          _id: "635aa4e1f1b2a3d4e5f6c8d1",
          name: "Maya",
          owner: "613b6b7f8f9b9b3f8c8a5f1a",
          ownerModel: "Purchaser",
          description: "Un perro muy amigable y (muy) enérgico",
          type: "perro",
          breed: "Bichón Maltés",
          vaccines: ["Rabia", "Parvovirus", "Distemper"],
          birthDate: new Date("2020-05-10"),
          medication: ["Vitaminas", "Suplementos para articulaciones"],
          images: ["../assets/pets/635aa4e1f1b2a3d4e5f6c8d1/main.jpg", "img2.jpg"]
        },
        {
          _id: "63f6f89c8e9f4e4eab4fbb5c",
          name: "Luna",
          owner: "613b6b7f8f9b9b3f8c8a5f1b",
          ownerModel: "Purchaser",
          description: "Gata muy curiosa y juguetona",
          type: "gato",
          breed: "Siamés",
          vaccines: ["Rabia", "Leucemia felina"],
          birthDate: new Date("2021-02-14"),
          medication: ["Antibióticos", "Antiinflamatorios"],
          images: ["../assets/pets/635aa4e1f1b2a3d4e5f6c8d2/main.jpg", "img3.jpg"]
        },
        {
          _id: "63f6f89c8e9f4e4eab4fbb5d",
          name: "Max",
          owner: "613b6b7f8f9b9b3f8c8a5f1c",
          ownerModel: "Purchaser",
          description: "perro tranquilo y protector",
          type: "perro",
          breed: "Pastor Alemán",
          vaccines: ["Rabia", "Parvovirus"],
          birthDate: new Date("2019-08-30"),
          medication: ["Medicamentos para el corazón"],
          images: ["../assets/pets/635aa4e1f1b2a3d4e5f6c8d3/main.jpg", "img4.jpg"]
        }],
      // LISTA DE PRODUCTOS ================================================
      // LISTA DE PRODUCTOS ================================================
      products: [
        {
          _id: "63f6f89c8e9f4e4eab4fbb5b1",
          name: "Comida Premium para Perros Adultos",
          weight: 2.5,
          stock: 50,
          description: "Alimento balanceado para dogs adultos, con ingredientes naturales y sin conservantes.",
          price: 49.99,
          keywords: ["nutrition", "dogs"],
          provider: "612b6b7f8f9b9b3f8c8a5f2a",
          dimensions: [30, 20, 10],
          images: ["img1.jpg", "img2.jpg"]
        },
        {
          _id: "63f6f89c8e9f4e4eab4fbb5b2",
          name: "Juguete Masticable para Perros",
          weight: 0.5,
          stock: 100,
          description: "Juguete de caucho resistente ideal para mantener los dientes de los dogs limpios.",
          price: 12.99,
          keywords: ["accesories", "dogs"],
          provider: "612b6b7f8f9b9b3f8c8a5f2b",
          dimensions: [10, 5, 5],
          images: ["img3.jpg"]
        },
        {
          _id: "63f6f89c8e9f4e4eab4fbb5b3",
          name: "Arena para Gatos con Control de Olores",
          weight: 5,
          stock: 200,
          description: "Arena para cats con fórmula avanzada para controlar olores y facilitar limpieza.",
          price: 15.49,
          keywords: ["accesories", "cats"],
          provider: "612b6b7f8f9b9b3f8c8a5f2c",
          dimensions: [40, 30, 15],
          images: ["img4.jpg", "img5.jpg"]
        },
        {
          _id: "63f6f89c8e9f4e4eab4fbb5b4",
          name: "Vitaminas para Aves de Colores",
          weight: 0.1,
          stock: 80,
          description: "Suplemento vitamínico en polvo para mejorar el plumaje y health general de aves de colores.",
          price: 8.75,
          keywords: ["health", "birds"],
          provider: "612b6b7f8f9b9b3f8c8a5f2d",
          dimensions: [5, 5, 10],
          images: ["img6.jpg"]
        },
        {
          _id: "63f6f89c8e9f4e4eab4fbb5b5",
          name: "Comida Completa para Peces Tropicales",
          weight: 0.2,
          stock: 150,
          description: "Alimento en escamas enriquecido para fishes tropicales, ideal para realzar sus colores.",
          price: 6.99,
          keywords: ["nutrition", "fishes"],
          provider: "612b6b7f8f9b9b3f8c8a5f2e",
          dimensions: [10, 10, 5],
          images: ["img7.jpg"]
        },
        {
          _id: "63f6f89c8e9f4e4eab4fbb5b6",
          name: "Terrario para Reptiles",
          weight: 3.5,
          stock: 20,
          description: "Terrario de vidrio con ventilación y control de temperatura, ideal para reptiles de tamaño pequeño a mediano.",
          price: 120.00,
          keywords: ["accesories", "reptiles"],
          provider: "612b6b7f8f9b9b3f8c8a5f2f",
          dimensions: [50, 30, 30],
          images: ["img8.jpg", "img9.jpg"]
        },
        {
          _id: "63f6f89c8e9f4e4eab4fbb5b7",
          name: "Alimento para Roedores con Frutas y Verduras",
          weight: 1,
          stock: 60,
          description: "Comida natural para rodents, enriquecida con frutas y verduras para una dieta balanceada.",
          price: 9.50,
          keywords: ["nutrition", "rodents"],
          provider: "612b6b7f8f9b9b3f8c8a5f2g",
          dimensions: [15, 10, 5],
          images: ["img10.jpg"]
        },
        {
          _id: "63f6f89c8e9f4e4eab4fbb5b8",
          name: "Cama Acolchonada para Gatos",
          weight: 1.2,
          stock: 75,
          description: "Cama suave y acolchonada, perfecta para que los cats descansen cómodamente.",
          price: 25.00,
          keywords: ["accesories", "cats"],
          provider: "612b6b7f8f9b9b3f8c8a5f2h",
          dimensions: [50, 40, 15],
          images: ["img11.jpg", "img12.jpg"]
        },
        {
          _id: "63f6f89c8e9f4e4eab4fbb5b9",
          name: "Suplemento de Calcio para Reptiles",
          weight: 0.05,
          stock: 45,
          description: "Calcio en polvo para reforzar el desarrollo óseo en reptiles.",
          price: 14.20,
          keywords: ["health", "reptiles"],
          provider: "612b6b7f8f9b9b3f8c8a5f2i",
          dimensions: [5, 5, 5],
          images: ["img13.jpg"]
        },
        {
          _id: "63f6f89c8e9f4e4eab4fbb5ba",
          name: "Collar Ajustable para Perros",
          weight: 0.3,
          stock: 120,
          description: "Collar ajustable y resistente, disponible en varios tamaños y colores.",
          price: 9.99,
          keywords: ["accesories", "dogs"],
          provider: "612b6b7f8f9b9b3f8c8a5f2j",
          dimensions: [25, 5, 2],
          images: ["img14.jpg"]
        },
        {
          _id: "63f6f89c8e9f4e4eab4fbb5bb",
          name: "Filtro de Agua para Acuarios",
          weight: 0.8,
          stock: 40,
          description: "Filtro de alta calidad para mantener el agua del acuario limpia y libre de impurezas.",
          price: 35.00,
          keywords: ["health", "fishes"],
          provider: "612b6b7f8f9b9b3f8c8a5f2k",
          dimensions: [15, 10, 10],
          images: ["img15.jpg", "img16.jpg"]
        },
        {
          _id: "63f6f89c8e9f4e4eab4fbb5bc",
          name: "Comida para Gatos con Control de Bolas de Pelo",
          weight: 2,
          stock: 90,
          description: "Alimento especializado para cats, ayuda a reducir la formación de bolas de pelo.",
          price: 22.00,
          keywords: ["nutrition", "cats"],
          provider: "612b6b7f8f9b9b3f8c8a5f2l",
          dimensions: [25, 15, 10],
          images: ["img17.jpg", "img18.jpg"]
        },
        {
          _id: "63f6f89c8e9f4e4eab4fbb5bd",
          name: "Rueda de Ejercicio para Hámsters",
          weight: 0.4,
          stock: 200,
          description: "Rueda de ejercicio segura y silenciosa para hámsters y otros rodents pequeños.",
          price: 10.00,
          keywords: ["accesories", "rodents"],
          provider: "612b6b7f8f9b9b3f8c8a5f2m",
          dimensions: [10, 10, 4],
          images: ["img19.jpg"]
        }],
    };
  },
};
</script>


<style scoped>
  .main-container {
    background-color: #fcfcfc;
  }
</style>