<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <span class="headline">Filtros</span>
      </v-card-title>
      <v-card-text>
        <!-- This part of the component will be dynamic based on the filterBy prop -->
        <v-row v-if="filterBy === 'products'">
          <v-col cols="12">
            <v-card-text class="filter-title">Rango de precios</v-card-text >
            <v-range-slider 
              v-model="priceRange" 
              :max=PRICE_SELECTOR_MAX_VALUE
              :min=PRICE_SELECTOR_MIN_VALUE
              :step="5"
              thumb-label="always" 

              strict
            ></v-range-slider>
          </v-col>
          <v-col cols="12">
            <v-card-text class="filter-title">Disponibilidad</v-card-text >
            <!-- The v-checkbox is reactive with the inStock data property in two ways,
             changes will be reflected in both -->
            <v-checkbox 
              density="compact" 
              v-model="inStock" 
              label="En stock"
            ></v-checkbox>
          </v-col>
        </v-row>
        <!-- This part of the component will be dynamic based on the filterBy prop -->
        <v-row v-if="filterBy === 'animals'">
          <v-col cols="12">
            <v-card-text class="filter-title">Género</v-card-text >
            <!-- The v-checkbox is reactive with the selectedGenre data property in two ways,
             changes will be reflected in both -->
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
            <v-card-text class="filter-title">Especies</v-card-text >
            <!-- The v-checkbox is reactive with the selectedSpecies data property in two ways,
             changes will be reflected in both. Renders based on the species object prop -->
            <v-checkbox 
              v-for="specie in species" 
              density="compact" 
              v-model="selectedSpecies" 
              :label="specie.name" 
              :value="specie.key"
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-card-text>
      <!-- The clearFilters and submitFilters methods are called when the buttons are clicked -->
      <v-card-actions>
        <v-btn @click="clearFilters">Limpiar filtros</v-btn>
        <v-btn @click="submitFilters">Aplicar filtros</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
const PRICE_SELECTOR_MIN_VALUE = 0;
const PRICE_SELECTOR_MAX_VALUE = 300;

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
      selectedGenre: false, // Default value to be able to select false (empty)
      priceRange: [0, 0], // Default by both zeros so the backend can notice and ignore it
      inStock: true,
      PRICE_SELECTOR_MAX_VALUE,
      PRICE_SELECTOR_MIN_VALUE
    };
  },
  computed: {

  },
  methods: {
    clearFilters() {
      this.selectedSpecies = [];
      this.selectedGenre = "all";
      this.priceRange = [0, 0];
      this.inStock = true;
    },
    // This method emits the filters to the parent component so it can ask the backend for the data.
    // IMPORTANT: The default values are the following:
    // selectedSpecies: [] -> If empty, the backend should ignore this filter
    // selectedGenre: false -> If false, the backend should ignore this filter as it is empty with no restriction (false)
    // priceRange: [0, 0] -> If both values are 0, the backend should ignore this filter
    // inStock: true -> If true, the backend should only return products in stock, else, return all products
    submitFilters() {
      console.log("Sent filters", {
        selectedSpecies: this.selectedSpecies,
        selectedGenre: this.selectedGenre,
        priceRange: this.priceRange,
        inStock: this.inStock,
      });
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
:deep(.v-input__control .v-label) {
  font-size: 0.75em;
}



@media (max-width: 600px) {
  :deep(.v-input__control .v-label) {
    font-size: 1em;
  }

  .filter-title {
    font-size: 1.5em;
  }

  .headline {
    font-size: 1em;
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  :deep(.v-input__control .v-label) {
    font-size: 0.8em;
  }

  .filter-title {
    font-size: 1.2em;
    font-weight: bold;
  }

  .headline {
    font-size: 1.2em;
    color: #003366;
    font-weight: bold;
  }
}

@media (min-width: 960px) and (max-width: 1280px) {
  :deep(.v-input__control .v-label) {
    font-size: 0.9em;
  }

  .filter-title {
    font-size: 1.5em;
    font-weight: bold;
  }

  .headline {
    font-size: 1.5em;
    color: #003366;
    font-weight: bold;
  }
}

@media (min-width: 1281px) {
  :deep(.v-input__control .v-label) {
    font-size: 1em;
  }

  .filter-title {
    font-size: 1.6em;
    font-weight: bold;
  }

  .headline {
    font-size: 1.75em;
    color: #003366;
    font-weight: bold;
  }
}
</style>
