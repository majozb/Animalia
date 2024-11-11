<template>
  <v-container>
    <v-row>
      <!-- Título de la lista -->
      <v-col cols="12">
        <v-card-title>{{ title }}</v-card-title>
      </v-col>
    </v-row>
    <v-row>
      <!-- Iterar sobre cada elemento en la colección y mostrar sus campos definidos en 'fields' -->
      <v-col cols="12" sm="6" md="4" lg="3" xl="3" v-for="item in itemsToShow" :key="item._id">
        <v-card class="mb-2">
          <!-- Imagen del ítem -->
          <v-img
            :src="getImagePath(item._id)"
            alt="Imagen del item"
            aspect-ratio="1"
            
            
          ></v-img>

          <v-card-title>{{ item[titleField] }}</v-card-title>

          <v-card-subtitle v-for="field in fields" :key="field.key">
            <strong>{{ field.label }}:</strong> {{ item[field.key] }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <!-- If the previewFlag is true, show a button to view all items -->
        <!-- It will redirect to the corresponding view -->
        <v-btn v-if="previewFlag" color="primary" @click="$router.push('/items')">
          Ver más
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "GenericList",
  props: {
    title: {
      type: String,
      required: true,
      default: "Lista de Items",
    },
    items: {
      type: Array,
      required: true,
    },
    titleField: {
      type: String,
      required: true,
      default: "name",
    },
    fields: {
      type: Array,
      required: true,
      default: () => [
        { key: "description", label: "Descripción" },
      ],
    },
    imageType: {
      type: String,
      required: true,
    },
    previewFlag: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      quantityOfShownItems: 20,
    };
  },
  computed: {
    // Return only the items that should be shown based on the screen size
    itemsToShow() {
      return this.items.slice(0, this.quantityOfShownItems);
    },
  },
  mounted() {
    // If the previewFlag is true, the component will show a single row of items
    if (this.previewFlag) {
      this.updateShownItemsQuantity();
      console.log("Preview flag is true");
      // Add an event listener to update the number of items shown when the window is resized
      // by calling the updateShownItemsQuantity method. Only works if previewFlag is true
      window.addEventListener("resize", this.updateShownItemsQuantity);
    }
  },
  watch: {
    // If the previewFlag changes, update the number of items shown
    previewFlag() {
      if (this.previewFlag) {
        this.updateShownItemsQuantity();
        // Add an event listener to update the number of items shown when the window is resized
        // by calling the updateShownItemsQuantity method. Only works if previewFlag is true
        window.addEventListener("resize", this.updateShownItemsQuantity);
      } else {
        window.removeEventListener("resize", this.updateShownItemsQuantity);
      }
    },
  },
  beforeDestroy() {
      // Remove the event listener when the component is destroyed
      window.removeEventListener("resize", this.updateShownItemsQuantity);
  },
  methods: {
    getImagePath(id) {
      // Build the path to the image of the item
      console.log(`../assets/${this.imageType}/${id}/main.jpg`);
      const imagePath = new URL(`../assets/${this.imageType}/${id}/main.jpg`, import.meta.url).href;
      console.log(imagePath);
      return imagePath;
    },
    updateShownItemsQuantity() {
      // Update the number of items shown based on the screen size
      const width = window.innerWidth;
      if (width < 600) {
        // v-col="xs" is 12 columns, show 1 item
        this.quantityOfShownItems = 1;
      } else if (width < 960) {
        // v-col="sm" is 6 columns, show 2 items
        this.quantityOfShownItems = 2;
      } else if (width < 1280) {
        // v-col="md" is 4 columns, show 3 items
        this.quantityOfShownItems = 3;
      } else if (width < 1920) {
        // v-col="lg" is 3 columns, show 4 items
        this.quantityOfShownItems = 4;
      } else {
        // v-col="xl" is 3 columns, show 4 items, the same as xxl
        this.quantityOfShownItems = 4;
      }
    },
    
  },
};
</script>

<style scoped>
/* Opcional: Estilos adicionales para mejorar la presentación */
</style>
