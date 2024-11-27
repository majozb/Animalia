<template>
  <v-container>
    <v-card>
      <v-list v-model:opened="open">
        <!-- Categgories -->
        <v-list-group v-for="(category, index) in categories" :key="`cat-${index}`" :value="`category-${index}`">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props">
              <!-- The selected-title class is used to underline the selected category -->
                <v-list-item-title @click.stop="handleSelection(category)" :class="{ 'selected-title': selectedCategory === category }" class="text-truncate">
                {{ category.name }}
                </v-list-item-title>
            </v-list-item>

          </template>

          <!-- Subcategories -->
          <v-list-group v-for="(subcategory, subIndex) in category.subcategories" :key="`subcat-${index}-${subIndex}`"
            :value="`subcategory-${index}-${subIndex}`">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props">
                <v-list-item-title @click.stop="handleSelection(subcategory)" :class="{ 'selected-title': selectedCategory === subcategory }">
                  {{ subcategory.name }}
                </v-list-item-title>
              </v-list-item>
            </template>

            <!-- SubSubcategories -->
            <v-list-item v-for="(subSubcategory, subSubIndex) in subcategory.subcategories"
              :key="`subsubcat-${index}-${subIndex}-${subSubIndex}`">
              <v-list-item-title @click.stop="handleSelection(subSubcategory)" :class="{ 'selected-title': selectedCategory === subSubcategory }">
                {{ subSubcategory.name }}
              </v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      open: [],
      selectedCategory: null,
    };
  },
  methods: {
    handleSelection(category) {
      this.selectedCategory = category;
      this.$emit('updateCategory', category);
    },
  },
};
</script>

<style scoped>
.v-list-item-title {
  font-weight: bold;
  white-space: normal;
  overflow: visible;
  text-overflow: unset;
}

.v-list-item-title:hover {
  color: #b98142;
  cursor: pointer;
}

/*
  * Add underline to the selected category. Works by using the class 'selected-title' and the
  :class directive from vue, applying the class if the condition above is true.
  */
.selected-title {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .v-list-item-title {
    font-size: 1em;
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  .v-list-item-title {
    font-size: 1.1em;
  }
}

@media (min-width: 960px) and (max-width: 1280px) {
  .v-list-item-title {
    font-size: 1.1em;
  }
}

@media (min-width: 1281px) {
  .v-list-item-title {
    font-size: 1.2em;
  }
}
</style>
