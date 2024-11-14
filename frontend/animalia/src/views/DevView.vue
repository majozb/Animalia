<!-- src/views/DevView.vue -->
<template>
    <v-container>
      <h1>Vista de Desarrollo</h1>
      <!-- Prueba con lista de mascotas -->

      <v-row>
        <v-col cols="3">
          <FilterBox filterBy="animals" :species="species" />
          <FilterBox filterBy="products" />
        </v-col>
        <v-col cols="9">
          <generic-list
            title="Mascotas en Adopción"
            :items="pets"
            titleField="name"
            :fields="[
              { key: 'type', label: 'Especie' },
              { key: 'breed', label: 'Raza' },
              { key: 'age', label: 'Edad' }
            ]"
            imageType="pets"
            :previewFlag="true"
          />

          <generic-list
            title="Productos Disponibles"
            :items="products"
            titleField="name"
            :fields="[
              { key: 'name', label: 'Producto' },
              { key: 'weight', label: 'Tamaño' },
              { key: 'price', label: 'Precio' }
            ]"
            imageType="products"
          />
        </v-col>
          
      </v-row>
    </v-container>
  </template>
  
  <script>
  import GenericList from "../components/GenericList.vue";
  import FilterBox from "../components/FilterBox.vue";
  
  export default {
    name: "DevView",
    components: {
      GenericList,
      FilterBox,
    },
    data() {
      return {
        species: [
          { key: "dogs", name: "Perros" },
          { key: "cats", name: "Gatos" },
          { key: "birds", name: "Aves" },
          { key: "fish", name: "Peces" },
          { key: "rodents", name: "Roedores" },
          { key: "reptiles", name: "Reptiles" },
        ],
        
        pets: [
        {
          name: "Buddy",
          owner: "613b6b7f8f9b9b3f8c8a5f1a",
          ownerModel: "Purchaser",
          description: "Un perro muy amigable y enérgico",
          type: "Perro",
          breed: "Golden Retriever",
          vaccines: ["Rabia", "Parvovirus", "Distemper"],
          birthDate: new Date("2020-05-10"),
          medication: ["Vitaminas", "Suplementos para articulaciones"],
          images: ["../assets/pets/635aa4e1f1b2a3d4e5f6c8d1/main.jpg", "img2.jpg"]
        },
        {
          name: "Whiskers",
          owner: "613b6b7f8f9b9b3f8c8a5f1b",
          ownerModel: "Admin",
          description: "Gato independiente y curioso",
          type: "Gato",
          breed: "Maine Coon",
          vaccines: ["Rabia", "Leucemia Felina"],
          birthDate: new Date("2019-08-22"),
          medication: [],
          images: ["img3.jpg"]
        },
        {
          name: "Spike",
          owner: "613b6b7f8f9b9b3f8c8a5f1c",
          ownerModel: "Purchaser",
          description: "Conejo juguetón y muy activo",
          type: "Conejo",
          breed: "Holandés",
          vaccines: ["Mixomatosis", "Virus Hemorrágico"],
          birthDate: new Date("2021-01-15"),
          medication: [],
          images: ["img4.jpg", "img5.jpg", "img6.jpg"]
        },
        {
          name: "Luna",
          owner: "613b6b7f8f9b9b3f8c8a5f1d",
          ownerModel: "Admin",
          description: "Perra tranquila y leal",
          type: "Perro",
          breed: "Labrador Retriever",
          vaccines: ["Rabia", "Moquillo", "Parvovirus"],
          birthDate: new Date("2018-11-05"),
          medication: ["Suplementos para articulaciones"],
          images: ["img7.jpg", "img8.jpg"]
        },
        {
          name: "Bella",
          owner: "613b6b7f8f9b9b3f8c8a5f1e",
          ownerModel: "Purchaser",
          description: "Gato aventurero que disfruta de los exteriores",
          type: "Gato",
          breed: "Siames",
          vaccines: ["Rabia", "Calicivirus", "Panleucopenia"],
          birthDate: new Date("2022-03-11"),
          medication: ["Suplementos de Omega 3"],
          images: ["img9.jpg", "img10.jpg"]
        },
        {
          name: "Max",
          owner: "613b6b7f8f9b9b3f8c8a5f1f",
          ownerModel: "Purchaser",
          description: "Perro guardián y muy protector",
          type: "Perro",
          breed: "Rottweiler",
          vaccines: ["Rabia", "Moquillo"],
          birthDate: new Date("2019-09-20"),
          medication: ["Calcio"],
          images: ["img11.jpg", "img12.jpg"]
        },
        {
          name: "Shadow",
          owner: "613b6b7f8f9b9b3f8c8a5f1g",
          ownerModel: "Admin",
          description: "Gato tímido pero cariñoso",
          type: "Gato",
          breed: "British Shorthair",
          vaccines: ["Rabia"],
          birthDate: new Date("2020-02-14"),
          medication: [],
          images: ["img13.jpg"]
        },
        {
          name: "Polly",
          owner: "613b6b7f8f9b9b3f8c8a5f1h",
          ownerModel: "Purchaser",
          description: "Loro que disfruta de cantar y hablar",
          type: "Ave",
          breed: "Loro Amazona",
          vaccines: ["Viruela", "Psitacosis"],
          birthDate: new Date("2017-11-30"),
          medication: ["Suplementos vitamínicos"],
          images: ["img14.jpg", "img15.jpg"]
        },
        {
          name: "Nemo",
          owner: "613b6b7f8f9b9b3f8c8a5f1i",
          ownerModel: "Admin",
          description: "Pez de colores vibrantes",
          type: "Pez",
          breed: "Pez Payaso",
          vaccines: [],
          birthDate: new Date("2022-06-01"),
          medication: [],
          images: ["img16.jpg"]
        },
        {
          name: "Oreo",
          owner: "613b6b7f8f9b9b3f8c8a5f1j",
          ownerModel: "Purchaser",
          description: "Hámster muy activo y curioso",
          type: "Roedor",
          breed: "Hámster Sirio",
          vaccines: [],
          birthDate: new Date("2023-01-10"),
          medication: [],
          images: ["img17.jpg", "img18.jpg"]
        },
        {
          name: "Daisy",
          owner: "613b6b7f8f9b9b3f8c8a5f1k",
          ownerModel: "Admin",
          description: "Coneja dócil y cariñosa",
          type: "Conejo",
          breed: "Cabeza de León",
          vaccines: ["Mixomatosis"],
          birthDate: new Date("2021-12-25"),
          medication: ["Vitaminas"],
          images: ["img19.jpg", "img20.jpg"]
        },
        {
          name: "Rocky",
          owner: "613b6b7f8f9b9b3f8c8a5f1l",
          ownerModel: "Purchaser",
          description: "Perro atlético y juguetón",
          type: "Perro",
          breed: "Boxer",
          vaccines: ["Rabia", "Parvovirus"],
          birthDate: new Date("2018-04-10"),
          medication: [],
          images: ["img21.jpg", "img22.jpg", "img23.jpg"]
        },
        {
          name: "Milo",
          owner: "613b6b7f8f9b9b3f8c8a5f1m",
          ownerModel: "Admin",
          description: "Gato curioso y juguetón",
          type: "Gato",
          breed: "Bengalí",
          vaccines: ["Rabia", "Calicivirus"],
          birthDate: new Date("2020-08-18"),
          medication: [],
          images: ["img24.jpg", "img25.jpg"]
        },
        {
          name: "Charlie",
          owner: "613b6b7f8f9b9b3f8c8a5f1n",
          ownerModel: "Purchaser",
          description: "Perico amigable y colorido",
          type: "Ave",
          breed: "Periquito",
          vaccines: ["Viruela"],
          birthDate: new Date("2021-03-21"),
          medication: ["Suplementos vitamínicos"],
          images: ["img26.jpg"]
        },
        {
          name: "Simba",
          owner: "613b6b7f8f9b9b3f8c8a5f1o",
          ownerModel: "Admin",
          description: "Perro leal y protector",
          type: "Perro",
          breed: "Pastor Alemán",
          vaccines: ["Rabia", "Parvovirus", "Moquillo"],
          birthDate: new Date("2019-06-09"),
          medication: ["Suplementos para las articulaciones"],
          images: ["img27.jpg", "img28.jpg"]
        }],
        // LISTA DE PRODUCTOS ================================================
        // LISTA DE PRODUCTOS ================================================
        products: [
        {
          name: "Comida Premium para Perros Adultos",
          weight: 2.5,
          stock: 50,
          description: "Alimento balanceado para perros adultos, con ingredientes naturales y sin conservantes.",
          price: 49.99,
          keywords: ["nutricion", "perros"],
          provider: "612b6b7f8f9b9b3f8c8a5f2a",
          dimensions: [30, 20, 10],
          images: ["img1.jpg", "img2.jpg"]
        },
        {
          name: "Juguete Masticable para Perros",
          weight: 0.5,
          stock: 100,
          description: "Juguete de caucho resistente ideal para mantener los dientes de los perros limpios.",
          price: 12.99,
          keywords: ["accesorios", "perros"],
          provider: "612b6b7f8f9b9b3f8c8a5f2b",
          dimensions: [10, 5, 5],
          images: ["img3.jpg"]
        },
        {
          name: "Arena para Gatos con Control de Olores",
          weight: 5,
          stock: 200,
          description: "Arena para gatos con fórmula avanzada para controlar olores y facilitar limpieza.",
          price: 15.49,
          keywords: ["accesorios", "gatos"],
          provider: "612b6b7f8f9b9b3f8c8a5f2c",
          dimensions: [40, 30, 15],
          images: ["img4.jpg", "img5.jpg"]
        },
        {
          name: "Vitaminas para Aves de Colores",
          weight: 0.1,
          stock: 80,
          description: "Suplemento vitamínico en polvo para mejorar el plumaje y salud general de aves de colores.",
          price: 8.75,
          keywords: ["salud", "pájaros"],
          provider: "612b6b7f8f9b9b3f8c8a5f2d",
          dimensions: [5, 5, 10],
          images: ["img6.jpg"]
        },
        {
          name: "Comida Completa para Peces Tropicales",
          weight: 0.2,
          stock: 150,
          description: "Alimento en escamas enriquecido para peces tropicales, ideal para realzar sus colores.",
          price: 6.99,
          keywords: ["nutricion", "peces"],
          provider: "612b6b7f8f9b9b3f8c8a5f2e",
          dimensions: [10, 10, 5],
          images: ["img7.jpg"]
        },
        {
          name: "Terrario para Reptiles",
          weight: 3.5,
          stock: 20,
          description: "Terrario de vidrio con ventilación y control de temperatura, ideal para reptiles de tamaño pequeño a mediano.",
          price: 120.00,
          keywords: ["accesorios", "reptiles"],
          provider: "612b6b7f8f9b9b3f8c8a5f2f",
          dimensions: [50, 30, 30],
          images: ["img8.jpg", "img9.jpg"]
        },
        {
          name: "Alimento para Roedores con Frutas y Verduras",
          weight: 1,
          stock: 60,
          description: "Comida natural para roedores, enriquecida con frutas y verduras para una dieta balanceada.",
          price: 9.50,
          keywords: ["nutricion", "roedores"],
          provider: "612b6b7f8f9b9b3f8c8a5f2g",
          dimensions: [15, 10, 5],
          images: ["img10.jpg"]
        },
        {
          name: "Cama Acolchonada para Gatos",
          weight: 1.2,
          stock: 75,
          description: "Cama suave y acolchonada, perfecta para que los gatos descansen cómodamente.",
          price: 25.00,
          keywords: ["accesorios", "gatos"],
          provider: "612b6b7f8f9b9b3f8c8a5f2h",
          dimensions: [50, 40, 15],
          images: ["img11.jpg", "img12.jpg"]
        },
        {
          name: "Suplemento de Calcio para Reptiles",
          weight: 0.05,
          stock: 45,
          description: "Calcio en polvo para reforzar el desarrollo óseo en reptiles.",
          price: 14.20,
          keywords: ["salud", "reptiles"],
          provider: "612b6b7f8f9b9b3f8c8a5f2i",
          dimensions: [5, 5, 5],
          images: ["img13.jpg"]
        },
        {
          name: "Collar Ajustable para Perros",
          weight: 0.3,
          stock: 120,
          description: "Collar ajustable y resistente, disponible en varios tamaños y colores.",
          price: 9.99,
          keywords: ["accesorios", "perros"],
          provider: "612b6b7f8f9b9b3f8c8a5f2j",
          dimensions: [25, 5, 2],
          images: ["img14.jpg"]
        },
        {
          name: "Filtro de Agua para Acuarios",
          weight: 0.8,
          stock: 40,
          description: "Filtro de alta calidad para mantener el agua del acuario limpia y libre de impurezas.",
          price: 35.00,
          keywords: ["salud", "peces"],
          provider: "612b6b7f8f9b9b3f8c8a5f2k",
          dimensions: [15, 10, 10],
          images: ["img15.jpg", "img16.jpg"]
        },
        {
          name: "Comida para Gatos con Control de Bolas de Pelo",
          weight: 2,
          stock: 90,
          description: "Alimento especializado para gatos, ayuda a reducir la formación de bolas de pelo.",
          price: 22.00,
          keywords: ["nutricion", "gatos"],
          provider: "612b6b7f8f9b9b3f8c8a5f2l",
          dimensions: [25, 15, 10],
          images: ["img17.jpg", "img18.jpg"]
        },
        {
          name: "Rueda de Ejercicio para Hámsters",
          weight: 0.4,
          stock: 200,
          description: "Rueda de ejercicio segura y silenciosa para hámsters y otros roedores pequeños.",
          price: 10.00,
          keywords: ["accesorios", "roedores"],
          provider: "612b6b7f8f9b9b3f8c8a5f2m",
          dimensions: [10, 10, 4],
          images: ["img19.jpg"]
        },
        {
          name: "Vitaminas para Peces de Agua Dulce",
          weight: 0.05,
          stock: 85,
          description: "Vitaminas líquidas para fortalecer la salud de peces de agua dulce.",
          price: 7.25,
          keywords: ["salud", "peces"],
          provider: "612b6b7f8f9b9b3f8c8a5f2n",
          dimensions: [5, 5, 10],
          images: ["img20.jpg"]
        },
        {
          name: "Caseta Exterior para Perros",
          weight: 10,
          stock: 30,
          description: "Caseta resistente para exteriores, ideal para perros medianos y grandes.",
          price: 85.00,
          keywords: ["accesorios", "perros"],
          provider: "612b6b7f8f9b9b3f8c8a5f2o",
          dimensions: [100, 70, 80],
          images: ["img21.jpg", "img22.jpg"]
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