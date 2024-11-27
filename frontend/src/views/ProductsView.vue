<script setup>
import FooterPage from '@/components/home/FooterPage.vue';
import NavBar from '@/components/home/NavBar.vue';
import GenericList from '@/components/GenericList.vue';
import FilterBox from '@/components/FilterBox.vue';
import CategorySelector from '@/components/CategorySelector.vue';


</script>

<template>
  <div class="main-container">
    <NavBar />
    <v-breadcrumbs :items="items"></v-breadcrumbs>
    <v-row>
      <v-col cols="12" sm="12" md="3" lg="3" xl="3">
        <v-row>
          <v-col cols="12">
            <CategorySelector :categories="categories" @updateCategory="updateKeywords"/>
          </v-col>
          <v-col cols="12">
            <FilterBox filterBy="products" @filters="fetchFilteredProducts"/>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="12" md="9" lg="9" xl="9">
        <generic-list title="Productos Disponibles" :items="products" titleField="name" :fields="[
          { key: 'weight', label: 'Peso (kg)' },
          { key: 'price', label: 'Precio (€)' },
          { key: 'stock', label: 'Stock' }
        ]" itemType="products" />
      </v-col>
    </v-row>
  </div>
  <FooterPage />
</template>

<script>
export default {
  name: "ProductsView",
  components: {
    GenericList,
    FilterBox
  },
  data() {
    return {
      pets: [],
      products: [],
      keywords: [],
      items: [
        {
          title: "Inicio",
          disabled: false,
          href: "/",
        },
        {
          title: "Productos",
          disabled: false,
          href: "/products",
        },
      ],
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
                  name: "Comederos",
                  keywords: ["perro", "comedero", "accessorios"],
                  subcategories: []
                },
                {
                  name: "Bebederos",
                  keywords: ["perro", "bebedero", "accessorios"],
                  subcategories: []
                },
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
                {
                  name: "Juguetes",
                  keywords: ["perro", "juguete", "accessorios"],
                  subcategories: []
                },
                {
                  name: "Camas",
                  keywords: ["perro", "cama", "accessorios"],
                  subcategories: []
                },
                {
                  name: "Transporte",
                  keywords: ["perro", "transporte", "accessorios"],
                  subcategories: []
                }
              ]
            },
            {
              name: "Gatos",
              keywords: ["gato", "accessorios"],
              subcategories: [
                {
                  name: "Comederos",
                  keywords: ["gato", "comedero", "accessorios"],
                  subcategories: []
                },
                {
                  name: "Bebederos",
                  keywords: ["gato", "bebedero", "accessorios"],
                  subcategories: []
                },
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
                {
                  name: "Juguetes",
                  keywords: ["gato", "juguete", "accessorios"],
                  subcategories: []
                },
                {
                  name: "Camas",
                  keywords: ["gato", "cama", "accessorios"],
                  subcategories: []
                },
                {
                  name: "Transporte",
                  keywords: ["gato", "transporte", "accessorios"],
                  subcategories: []
                },
                {
                  name: "Camas",
                  keywords: ["gato", "cama", "accessorios"],
                  subcategories: []
                }
              ]
            },
            {
              name: "Aves",
              keywords: ["ave", "accessorios"],
              subcategories: [
              {
                name: "Comederos",
                keywords: ["ave", "comedero", "accessorios"],
                subcategories: []
              },
              {
                name: "Bebederos",
                keywords: ["ave", "bebedero", "accessorios"],
                subcategories: []
              },
              {
                name: "Jaulas",
                keywords: ["ave", "jaula", "accessorios"],
                subcategories: []
              }]
            },
            {
              name: "Reptiles",
              keywords: ["reptil", "accessorios"],
              subcategories: [
                {
                  name: "Terrarios",
                  keywords: ["reptil", "terrario", "accessorios"],
                  subcategories: []
                },
                {
                  name: "Comederos",
                  keywords: ["reptil", "comedero", "accessorios"],
                  subcategories: []
                },
                {
                  name: "Bebederos",
                  keywords: ["reptil", "bebedero", "accessorios"],
                  subcategories: []
                },
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
              subcategories: [
                {
                  name: "Acuarios",
                  keywords: ["pez", "acuario", "accessorios"],
                  subcategories: []
                }
              ]
            },
            {
              name: "Conejos",
              keywords: ["conejo", "accessorios"],
              subcategories: [
                {
                  name: "Comederos",
                  keywords: ["conejo", "comedero", "accessorios"],
                  subcategories: []
                },
                {
                  name: "Bebederos",
                  keywords: ["conejo", "bebedero", "accessorios"],
                  subcategories: []
                },
                { 
                  name: "Jaulas",
                  keywords: ["conejo", "jaula", "accessorios"],
                  subcategories: []
                }
              ]
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
  mounted() {
    this.fetchFilteredProducts();
  },
  methods: {
    async fetchFilteredProducts(filterCriteria) {
      try {
        const queryParams = new URLSearchParams(filterCriteria);
        const url = `http://127.0.0.1:3000/products?${queryParams}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    },
    updateKeywords(category) {
      this.keywords = category.keywords;
      // TODO: Fetch products based on the selected category
    },
  },
};
</script>


<style scoped>
.main-container {
  background-color: #fcfcfc;
}
</style>