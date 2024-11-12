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

          <v-card-title class="title-item">{{ item[titleField] }}</v-card-title>

          <!-- Campos dentro de la tarjeta, ahora están en una fila con overflow -->
          <v-card-subtitle>
            <div class="fields-container">
              <v-row no-gutters>
                <v-col v-for="(field, index) in fields" :key="field.key" class="field-item" cols="auto">
                  <strong>{{ field.label }}:</strong> {{ item[field.key] }}
                  <!-- <span v-if="index < fields.length - 1" class="separator">■</span> -->
                </v-col>
              </v-row>
            </div>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <p>Página {{ currentPage }} de {{ totalPages }}</p>
    </v-row>
    <v-row>
      <v-col cols="12">
        <!-- If the previewFlag is true, show a button to view all items -->
        <!-- It will redirect to the corresponding view -->
        <v-btn v-if="previewFlag" color="primary" @click="$router.push('/items')">
          Ver más
        </v-btn>
        <v-btn v-if="!previewFlag" color="primary" @click="previousPage" :disabled="currentPage === 1">
          Anterior
        </v-btn>
        <v-btn v-if="!previewFlag" color="primary" @click="nextPage" :disabled="currentPage === totalPages">
          Siguiente
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
      quantityOfShownItems: 1,
      currentPage: 1,
    };
  },
  computed: {
    // Return only the items that should be shown based on the screen size
    itemsToShow() {
      if (this.previewFlag) {
        // If it is a preview, just shows the items based on the responsive logic
        return this.items.slice(0, this.quantityOfShownItems);
      } else {
        // Else, show the items based on the current page
        // (the range of items depends on the quiantity of items to show and the current page)
        const start = (this.currentPage - 1) * 4 * this.quantityOfShownItems;
        const end = start + 4 * this.quantityOfShownItems;
        return this.items.slice(start, end);

      }
    },
    totalPages() {
      return Math.ceil(this.items.length / (4 * this.quantityOfShownItems));
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
    this.updateShownItemsQuantity();
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
    nextPage() {
      // Move to the next page of items
      this.currentPage += 1;
    },
    previousPage() {
      // Move to the previous page of items
      this.currentPage -= 1;
    },
  },
};
</script>

<style scoped>


/* Estilo para los elementos de los campos */
.field-item {
  margin-right: 15px;
  flex-shrink: 0;
  font-size: 1.2rem; /* Tamaño de la fuente ajustable */
}

/* Estilo para el separador */
.separator {
  margin-left: 10px;
  color: #777;
  font-size: 1.4rem; /* Separador un poco más grande */
}

.v-card {
  border-radius: 3%;
  padding: 0.5em;
}

.v-img {
  border-radius: 3%;
}

.v-card-title {
  font-size: 3rem;
}

.title-item {
  white-space: normal; /* Permite el ajuste de línea */
  overflow: visible;   /* Evita el truncamiento */
  text-overflow: unset; /* Elimina los puntos suspensivos */
}

/* Media queries para hacer los tamaños más responsivos */
@media (max-width: 600px) {
  .field-item {
    font-size: 1rem; /* Tamaño de fuente pequeño para pantallas muy pequeñas */
  }

  .separator {
    font-size: 1.2rem;
  }

  .title-item {
    font-size: 2.5rem;
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  .field-item {
    font-size: 1.5em; /* Tamaño de fuente medio para pantallas medianas */
  }

  .separator {
    font-size: 1em;
  }

  .title-item {
    font-size: 1.5em;
  }
}

@media (min-width: 960px) and (max-width: 1280px) {
  .field-item {
    font-size: 1.5em; /* Tamaño de fuente más grande para pantallas grandes */
  }

  .separator {
    font-size: 1em;
  }

  .title-item {
    font-size: 1.75em;
  }
}

@media (min-width: 1281px) {
  .field-item {
    font-size: 1.75em; /* Tamaño máximo para pantallas grandes */
  }

  .separator {
    font-size: 2em;
  }
  .title-item {
    font-size: 2.5em;
  }
}
</style>
