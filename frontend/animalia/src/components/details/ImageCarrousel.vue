<template>
  <v-container>
    <v-row>
      <v-col cols="12">
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
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentSlide: 0,
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
