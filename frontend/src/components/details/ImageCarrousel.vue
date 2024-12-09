<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!-- Carousel with the main image -->
        <v-carousel v-model="currentSlide" hide-delimiters height="auto">
          <v-carousel-item
            v-for="(image, index) in images"
            :key="index"
          >
            <v-img :src="getImagePath(image)" class="carousel-image"></v-img>
          </v-carousel-item>
        </v-carousel>
        <!-- Container for the thumbnails. Made with pure CSS -->
        <div class="image-list-container">
          <v-img
            v-for="(image, index) in images"
            :key="index"
            :src="getImagePath(image)"
            class="thumbnail"
            :class="{ semitransparent: index !== currentSlide }" 
            @click="currentSlide = index"
          ></v-img>
        </div>
      </v-col>
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
  display: flex;
  overflow-x: scroll;
  /* Opcional: define una altura fija a las miniaturas si lo deseas */
  /* align-items: center; */
}

.thumbnail {
  flex: 0 0 25%;  /* Every thumbnail will take 25% of the container */
  box-sizing: border-box;
  padding: 5px;
  cursor: pointer;
  border: 2px solid transparent;
  object-fit: contain; /* Adjust the image size to the container */
}

.thumbnail.semitransparent {
  opacity: 0.5; /* Make the image semitransparent if it's not the current slide */
}

.thumbnail:hover {
  border-color: #1976d2;
}
</style>
