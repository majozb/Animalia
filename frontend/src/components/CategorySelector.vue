<template>
  <v-card class="mx-auto" width="300">
    <v-list v-model:opened="open">
      <v-list-group v-for="(category, index) in categories" :key="index" :value="category.name">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" :title="category.name"></v-list-item>
        </template>

        <v-list-group v-for="(subcategory, subIndex) in category.subcategories" :key="subIndex" :value="subcategory.name">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="subcategory.name"></v-list-item>
          </template>

          <v-list-item v-for="(subSubcategory, subSubIndex) in subcategory.subcategories" :key="subSubIndex" :title="subSubcategory.name"></v-list-item>
        </v-list-group>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      open: [],
      categories: [
        {
          name: "Alimentación",
          keywords: ["alimentación"],
          subcategories: [
            {
              name: "Perros",
              keywords: ["perro", "alimentación"],
              subcategories: [
                {
                  name: "Comida",
                  keywords: ["perro", "comida", "alimentación"],
                  subcategories: []
                },
                {
                  name: "Snacks",
                  keywords: ["perro", "snack", "alimentación"],
                  subcategories: []
                },
              ]
            },
            {
              name: "Gatos",
              keywords: ["gato", "alimentación"],
              subcategories: [
                {
                  name: "Comida",
                  keywords: ["gato", "comida", "alimentación"],
                  subcategories: []
                },
                {
                  name: "Snacks",
                  keywords: ["gato", "snack", "alimentación"],
                  subcategories: []
                },
              ]
            },
            {
              name: "Aves",
              keywords: ["ave", "alimentación"],
              subcategories: [
                {
                  name: "Comida",
                  keywords: ["ave", "comida", "alimentación"],
                  subcategories: []
                },
                {
                  name: "Snacks",
                  keywords: ["ave", "snack", "alimentación"],
                  subcategories: []
                },
              ]
            },
            {
              name: "Reptiles",
              keywords: ["reptil", "alimentación"],
              subcategories: [
                {
                  name: "Comida",
                  keywords: ["reptil", "comida", "alimentación"],
                  subcategories: []
                },
                {
                  name: "Snacks",
                  keywords: ["reptil", "snack", "alimentación"],
                  subcategories: []
                },
              ]
            },
            {
              name: "Peces",
              keywords: ["pez", "alimentación"],
              subcategories: [
                {
                  name: "Comida",
                  keywords: ["pez", "comida", "alimentación"],
                  subcategories: []
                },
                {
                  name: "Snacks",
                  keywords: ["pez", "snack", "alimentación"],
                  subcategories: []
                },
              ]
            },
            {
              name: "Conejos",
              keywords: ["conejo", "alimentación"],
              subcategories: [
                {
                  name: "Comida",
                  keywords: ["conejo", "comida", "alimentación"],
                  subcategories: []
                },
                {
                  name: "Snacks",
                  keywords: ["conejo", "snack", "alimentación"],
                  subcategories: []
                },
              ]
            },
          ],
        },
        {
          name: "Accesorios",
          keywords: ["accessorios"],
          subcategories: [
            {
              name: "Perros",
              keywords: ["perro", "accessorios"],
              subcategories: [
                {
                  name: "Collares",
                  keywords: ["perro", "collar", "accessorios"],
                  subcategories: []
                },
                {
                  name: "Correas",
                  keywords: ["perro", "correa", "accessorios"],
                  subcategories: []
                },
                {
                  name: "Ropa",
                  keywords: ["perro", "ropa", "accessorios"],
                  subcategories: []
                },
              ]
            },
            {
              name: "Gatos",
              keywords: ["gato", "accessorios"],
              subcategories: [
                {
                  name: "Collares",
                  keywords: ["gato", "collar", "accessorios"],
                  subcategories: []
                },
                {
                  name: "Correas",
                  keywords: ["gato", "correa", "accessorios"],
                  subcategories: []
                },
                {
                  name: "Ropa",
                  keywords: ["gato", "ropa", "accessorios"],
                  subcategories: []
                },
              ]
            },
            {
              name: "Aves",
              keywords: ["ave", "accessorios"],
              subcategories: []
            },
            {
              name: "Reptiles",
              keywords: ["reptil", "accessorios"],
              subcategories: [
                {
                  name: "Collares",
                  keywords: ["reptil", "collar", "accessorios"],
                  subcategories: []
                },
                {
                  name: "Correas",
                  keywords: ["reptil", "correa", "accessorios"],
                  subcategories: []
                },
              ]
            },
            {
              name: "Peces",
              keywords: ["pez", "accessorios"],
              subcategories: []
            },
            {
              name: "Conejos",
              keywords: ["conejo", "accessorios"],
              subcategories: []
            },
          ],
        },
        {
          name: "Salud e higiene",
          keywords: ["salud"],
          subcategories: [
            {
              name: "Perros",
              keywords: ["perro", "salud"],
              subcategories: [
                {
                  name: "Antiparasitarios",
                  keywords: ["perro", "antiparasitario", "salud"],
                  subcategories: []
                },
                {
                  name: "Suplementos",
                  keywords: ["perro", "suplemento", "salud"],
                  subcategories: []
                },
                {
                  name: "Aseo",
                  keywords: ["perro", "aseo", "salud"],
                  subcategories: []
                },
              ]
            },
            {
              name: "Gatos",
              keywords: ["gato", "salud"],
              subcategories: [
                {
                  name: "Antiparasitarios",
                  keywords: ["gato", "antiparasitario", "salud"],
                  subcategories: []
                },
                {
                  name: "Suplementos",
                  keywords: ["gato", "suplemento", "salud"],
                  subcategories: []
                },
                {
                  name: "Aseo",
                  keywords: ["gato", "aseo", "salud"],
                  subcategories: []
                }
              ]
            },
            {
              name: "Aves",
              keywords: ["ave", "salud"],
              subcategories: [
                {
                  name: "Suplementos",
                  keywords: ["ave", "suplemento", "salud"],
                  subcategories: []
                },
              ]
            },
            {
              name: "Reptiles",
              keywords: ["reptil", "salud"],
              subcategories: [
                {
                  name: "Suplementos",
                  keywords: ["reptil", "suplemento", "salud"],
                  subcategories: []
                },
              ]
            },
            {
              name: "Peces",
              keywords: ["pez", "salud"],
              subcategories: []
            },
            {
              name: "Conejos",
              keywords: ["conejo", "salud"],
              subcategories: [
                {
                  name: "Suplementos",
                  keywords: ["conejo", "suplemento", "salud"],
                  subcategories: []
                },
                {
                  name: "Aseo",
                  keywords: ["conejo", "aseo", "salud"],
                  subcategories: []
                }
              ]
            },
          ]
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>
