<template>
  <v-container>
    <div class="header">
      <h4>¿Buscas una mascota para adoptar?</h4>
      <h2>Mascotas en Adopción</h2>
      <div class="buttons">
        <v-btn
          class="mt-4"
          variant="outlined"
          color="primary"
          @click="viewMore">
          Ver más
        </v-btn>
      </div>
    </div>

    <v-row>
      <v-col
        v-for="pet in pets"
        :key="pet.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-img
            :src="pet.image"
            height="200px"
            class="pet-image"
          ></v-img>
          <v-card-title>{{ pet.name }}</v-card-title>
          <v-card-subtitle>Género: {{ pet.gender }} | Edad: {{ pet.age }}</v-card-subtitle>
          <v-card-text> Llegada: {{ pet.date }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PetList',
  data() {
    return {
      pets: [
        {
          id: 1,
          name: "Snowball",
          gender: "Male",
          age: "2 meses",
          date: "Septiembre 2024",
          image: "https://i.pinimg.com/736x/2c/53/3b/2c533bbe40c8f091cdf97fb3e4122272.jpg"
        },
        {
          id: 2,
          name: "Rocket",
          gender: "Female",
          age: "2 años",
          date: "Noviembre 2022",
          image: "https://i.pinimg.com/originals/95/dd/4d/95dd4d67157d4b7e0b17ea946bb49b71.jpg"
        },
        {
          id: 3,
          name: "Rocco",
          gender: "Male",
          age: "4 años",
          date: "Junio 2020",
          image: "https://media.graphassets.com/resize=height:360,width:500/output=format:webp/mCJs4A1hQB66kGWM8dOe"
        },
      ]
    };
  },
  methods: {
    viewMore() {
      alert('Aquí se podría redirigir a una página con todas las mascotas en adopción.');
    }
  }
};
</script>

<style scoped>
.header {
  text-align: left;
  margin-bottom: 24px;
  padding-top: 20px;
  margin-top: 20px;
}

.pet-image {
  border-radius: 8px;
}

v-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
