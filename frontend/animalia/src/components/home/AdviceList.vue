<template>
  <v-container>
    <div class="header">
      <h2>Consejos para el Cuidado de los Animales</h2>
      <p>Mantente informado y cuida mejor de tus mascotas con estos consejos útiles.</p>
    </div>

    <v-row>
      <v-col
        v-for="advice in animalAdvice"
        :key="advice.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-img :src="advice.image" contain height="200px"></v-img>
          <v-card-title>{{ advice.title }}</v-card-title>
          <v-card-subtitle>{{ advice.animal }}</v-card-subtitle>
          <v-card-text>{{ advice.content }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AnimalAdviceList',
  data() {
    return {
      animalAdvice: [
        {
          id: 1,
          title: "Alimentación Saludable",
          animal: "Perros",
          content: "Asegúrate de proporcionar una dieta equilibrada rica en nutrientes. Evita alimentos procesados y consulta al veterinario.",
          image: "https://cdn.shopify.com/s/files/1/0067/6786/9988/files/Blog_-_Fresh_Foods-1_1.jpg?v=1679697377"
        },
        {
          id: 2,
          title: "Ejercicio Regular",
          animal: "Gatos",
          content: "Aunque los gatos son más independientes, necesitan ejercicio diario para mantenerse activos y saludables.",
          image: "https://www.oldfarmvet.com/wp-content/uploads/2024/08/old-farm-vet-regular-excercise-for-pets-july-2024-blog.jpg"
        },
        {
          id: 3,
          title: "Visitas al Veterinario",
          animal: "Todos los Animales",
          content: "Lleva a tus mascotas al veterinario regularmente para chequeos y vacunas. La prevención es clave para una buena salud.",
          image: "https://www.veterinarioslagallega.es/images/Vacunacin_en_La_Gallega_Clnica_Veterinaria.jpg"
        },
      ]
    };
  }
};
</script>

<style scoped>
.header {
  text-align: center;
  margin-bottom: 24px;
}

v-card {
  margin-bottom: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
