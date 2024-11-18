<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-carousel v-model="currentSlide" hide-delimiters height="auto">
          <v-carousel-item v-for="(image, index) in images" :key="index">
            <v-img :src="getImagePath(image)" class="carousel-image"></v-img>
          </v-carousel-item>
        </v-carousel>

        <v-row justify="center" class="mt-4 image-list-container">
          <v-img v-for="(image, index) in images" :key="index" :src="getImagePath(image)" class="thumbnail"
            @click="currentSlide = index"></v-img>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card-title class="list-title">Detalles de la mascota</v-card-title>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 0,
      images: [
        "../../assets/test/1.jpg",
        "../../assets/test/2.jpg",
        "../../assets/test/3.jpg",
        "../../assets/test/4.jpg",
        "../../assets/test/5.jpg",
        "../../assets/test/1.jpg",
        "../../assets/test/2.jpg",
        "../../assets/test/3.jpg",
        "../../assets/test/4.jpg",
        "../../assets/test/5.jpg",
      ],
    };
  },
  methods: {
    getImagePath(imagePath) {
      const newImagePath = new URL(imagePath, import.meta.url).href;
      return newImagePath;
    }
  },
};
</script>

<style scoped>
.image-list-container {
  overflow-x: scroll;
}



.thumbnail {
  cursor: pointer;
  margin: 5px;
  border: 2px solid transparent;
}

.thumbnail:hover {
  border-color: #1976d2;
}
</style>
