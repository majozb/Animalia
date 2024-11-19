<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-row>
          <v-col cols="6">
            <h1 class="headline">Filtros</h1>
          </v-col>
          <v-col cols="6">
            <v-btn v-if="showVisibilityButton" @click="showFilters = !showFilters">
              Mostrar/Ocultar<v-icon>{{ showFilters ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-expand-transition>
        <v-card-text v-if="showFilters">
          <!-- This part of the component will be dynamic based on the filterBy prop -->
          <v-row v-if="filterBy === 'products'">
            <v-col cols="12">
              <v-card-text class="filter-title">Rango de precios</v-card-text>
              <v-range-slider v-model="priceRange" :max=PRICE_SELECTOR_MAX_VALUE :min=PRICE_SELECTOR_MIN_VALUE :step="5"
                thumb-label="always" strict></v-range-slider>
            </v-col>
            <v-col cols="12">
              <v-card-text class="filter-title">Disponibilidad</v-card-text>
              <!-- The v-checkbox is reactive with the inStock data property in two ways,
             changes will be reflected in both -->
              <v-checkbox density="compact" v-model="inStock" label="En stock"></v-checkbox>
            </v-col>
          </v-row>
          <!-- This part of the component will be dynamic based on the filterBy prop -->
          <v-row v-if="filterBy === 'pets'">
            <v-col cols="12">
              <v-card-text class="filter-title">Género</v-card-text>
              <!-- The v-checkbox is reactive with the selectedGenre data property in two ways,
             changes will be reflected in both -->
              <v-checkbox density="compact" v-model="selectedGenre" label="Macho" value="male"></v-checkbox>
              <v-checkbox density="compact" v-model="selectedGenre" label="Hembra" value="female"></v-checkbox>
            </v-col>
            <v-col cols="12">
              <v-card-text class="filter-title">Especies</v-card-text>
              <!-- The v-checkbox is reactive with the selectedSpecies data property in two ways,
             changes will be reflected in both. Renders based on the species object prop -->
              <v-checkbox v-for="specie in species" density="compact" v-model="selectedSpecies" :label="specie.name"
                :value="specie.key"></v-checkbox>
            </v-col>
          </v-row>
        </v-card-text>
      </v-expand-transition>
      <!-- The clearFilters and submitFilters methods are called when the buttons are clicked -->
      <v-card-actions>
        <v-row>
          <v-btn cols="12" @click="clearFilters">Limpiar filtros</v-btn>
          <v-btn cols="12" @click="submitFilters">Aplicar filtros</v-btn>
        </v-row>
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
      selectedGenre: "all", // Default value to be able to select false (empty)
      priceRange: [0, 0], // Default by both zeros so the backend can notice and ignore it
      inStock: true,
      showFilters: false,
      showVisibilityButton: false,
      PRICE_SELECTOR_MAX_VALUE,
      PRICE_SELECTOR_MIN_VALUE
    };
  },
  mounted() {
    // get screen width
    this.changeVisibility();
    window.addEventListener('resize', this.changeVisibility);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.changeVisibility);
  },
  computed: {

  },
  watch: {
    /* To avoid the selectedGenre to be false, set it to "all" when it is false
    * Because the v-checkbox is reactive with the selectedGenre data property 
    * (a string with the value of the selected checkbox)
    */
    selectedGenre() {
      if (this.selectedGenre === false) {
        this.selectedGenre = "all";
      }
    },
  },
  methods: {
    clearFilters() {
      this.selectedSpecies = [];
      this.selectedGenre = "all";
      this.priceRange = [0, 0];
      this.inStock = true;
      this.$emit('filters', {
        selectedSpecies: this.selectedSpecies,
        selectedGenre: this.selectedGenre,
        priceRange: this.priceRange,
        inStock: this.inStock,
      });
    },
    changeVisibility() {
      this.screenWidth = window.innerWidth;
      // If it is a small screen,
      if (this.screenWidth < 960) {
        // The user can toggle the filters visibility
        this.showVisibilityButton = true;
        // If the filters are not shown, keep them hidden
        if (this.showFilters) {
          this.showFilters = true;
        } else {
          this.showFilters = false;
        }
      } else {
        // If it is a big screen, do not let the user to toggle
        // the filters visibility. Keep the button hidden.
        this.showVisibilityButton = false;
        // And show the filters mandatory
        this.showFilters = true;
      }
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
    font-weight: bold;
  }

  .headline {
    font-size: 1em;
    color: #003366;
    font-weight: bold;
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
