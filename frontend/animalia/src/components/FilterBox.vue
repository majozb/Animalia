<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <span class="headline">Filtros</span>
      </v-card-title>
      <v-card-text>
        <v-row v-if="filterBy === 'products'">
          <v-col cols="12">
            <v-subheader class="responsive-title">Rango de precios</v-subheader>
            <v-row>
              <v-col cols="6">
              <v-text-field
                v-model="priceRange[0]"
                label="Precio mínimo"
                type="number"
                :min="0"
                :max="9999"
              ></v-text-field>
              </v-col>
              <v-col cols="6">
              <v-text-field
                v-model="priceRange[1]"
                label="Precio máximo"
                type="number"
                :min="0"
                :max="9999"
              ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row v-if="filterBy === 'animals'">
          <v-col cols="12">
            <v-subheader class="responsive-title">Género</v-subheader>
            <v-checkbox 
              density="compact" 
              v-model="selectedGenre" 
              label="Macho" 
              value="male"
            ></v-checkbox>
            <v-checkbox 
              density="compact" 
              v-model="selectedGenre" 
              label="Hembra" 
              value="female"
            ></v-checkbox>
          </v-col>
          <v-col cols="12">
            <v-subheader class="responsive-title">Especies</v-subheader>
            <v-checkbox 
              v-for="specie in species" 
              :key="specie.id" 
              v-model="selectedSpecies" 
              :label="specie.name" 
              :value="specie.key" 
              class="shrink mr-0 mt-0 mb-0"
              dense 
              hide-details
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="clearFilters">Limpiar filtros</v-btn>
        <v-btn @click="submitFilters">Aplicar filtros</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    filterBy: {
      type: String,
      required: true,
    },
    species: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      selectedSpecies: [],
      selectedGenre: "all",
      priceRange: [-1, -1],
      inStock: true,
    };
  },
  computed: {

  },
  methods: {
    clearFilters() {
      this.selectedSpecies = [];
      this.selectedGenre = "all";
    },
    submitFilters() {
      this.$emit('filters', {
        searchTerm: this.searchTerm,
        selectedCategory: this.selectedCategory,
        selectedSpecies: this.selectedSpecies,
        selectedGenre: this.selectedGenre,
      });
    },
  },
};
</script>

<style scoped>
/* Tamaños para pantallas pequeñas (por defecto) */
:deep(.v-input__control .v-label) {
  font-size: 0.75em;
}

.responsive-title {
  font-size: 1em;
}

.headline {
  font-size: 1.5em;
}

/* Tamaños para pantallas medianas (>=600px) */
@media (min-width: 600px) {
  :deep(.v-input__control .v-label) {
    font-size: 1em;
  }

  .responsive-title {
    font-size: 1.5em;
  }

  .headline {
    font-size: 2em;
  }
}

/* Tamaños para pantallas grandes (>=960px) */
@media (min-width: 960px) {
  :deep(.v-input__control .v-label) {
    font-size: 1.5em;
  }

  .responsive-title {
    font-size: 2em;
  }

  .headline {
    font-size: 2.5em;
  }
}
</style>
