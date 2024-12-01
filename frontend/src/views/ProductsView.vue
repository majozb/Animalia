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
          keywords: ["alimentacion"],
          subcategories: [
            {
              name: "Perros",
              keywords: ["perro", "alimentacion"],
              subcategories: [
                {
                  name: "Comida",
                  keywords: ["perro", "comida", "alimentacion"],
                  subcategories: []
                },
                {
                  name: "Snacks",
                  keywords: ["perro", "snack", "alimentacion"],
                  subcategories: []
                },
              ]
            },
            {
              name: "Gatos",
              keywords: ["gato", "alimentacion"],
              subcategories: [
                {
                  name: "Comida",
                  keywords: ["gato", "comida", "alimentacion"],
                  subcategories: []
                },
                {
                  name: "Snacks",
                  keywords: ["gato", "snack", "alimentacion"],
                  subcategories: []
                },
              ]
            },
            {
              name: "Aves",
              keywords: ["ave", "alimentacion"],
              subcategories: [
                {
                  name: "Comida",
                  keywords: ["ave", "comida", "alimentacion"],
                  subcategories: []
                },
                {
                  name: "Snacks",
                  keywords: ["ave", "snack", "alimentacion"],
                  subcategories: []
                },
              ]
            },
            {
              name: "Reptiles",
              keywords: ["reptil", "alimentacion"],
              subcategories: [
                {
                  name: "Comida",
                  keywords: ["reptil", "comida", "alimentacion"],
                  subcategories: []
                },
                {
                  name: "Snacks",
                  keywords: ["reptil", "snack", "alimentacion"],
                  subcategories: []
                },
              ]
            },
            {
              name: "Peces",
              keywords: ["pez", "alimentacion"],
              subcategories: [
                {
                  name: "Comida",
                  keywords: ["pez", "comida", "alimentacion"],
                  subcategories: []
                },
                {
                  name: "Snacks",
                  keywords: ["pez", "snack", "alimentacion"],
                  subcategories: []
                },
              ]
            },
            {
              name: "Conejos",
              keywords: ["conejo", "alimentacion"],
              subcategories: [
                {
                  name: "Comida",
                  keywords: ["conejo", "comida", "alimentacion"],
                  subcategories: []
                },
                {
                  name: "Snacks",
                  keywords: ["conejo", "snack", "alimentacion"],
                  subcategories: []
                },
              ]
            },
          ],
        },
        {
          name: "Accesorios",
          keywords: ["accesorio"],
          subcategories: [
            {
              name: "Perros",
              keywords: ["perro", "accesorio"],
              subcategories: [
                {
                  name: "Comederos",
                  keywords: ["perro", "comedero", "accesorio"],
                  subcategories: []
                },
                {
                  name: "Bebederos",
                  keywords: ["perro", "bebedero", "accesorio"],
                  subcategories: []
                },
                {
                  name: "Collares",
                  keywords: ["perro", "collar", "accesorio"],
                  subcategories: []
                },
                {
                  name: "Correas",
                  keywords: ["perro", "correa", "accesorio"],
                  subcategories: []
                },
                {
                  name: "Ropa",
                  keywords: ["perro", "ropa", "accesorio"],
                  subcategories: []
                },
                {
                  name: "Juguetes",
                  keywords: ["perro", "juguete", "accesorio"],
                  subcategories: []
                },
                {
                  name: "Camas",
                  keywords: ["perro", "cama", "accesorio"],
                  subcategories: []
                },
                {
                  name: "Transporte",
                  keywords: ["perro", "transporte", "accesorio"],
                  subcategories: []
                }
              ]
            },
            {
              name: "Gatos",
              keywords: ["gato", "accesorio"],
              subcategories: [
                {
                  name: "Comederos",
                  keywords: ["gato", "comedero", "accesorio"],
                  subcategories: []
                },
                {
                  name: "Bebederos",
                  keywords: ["gato", "bebedero", "accesorio"],
                  subcategories: []
                },
                {
                  name: "Collares",
                  keywords: ["gato", "collar", "accesorio"],
                  subcategories: []
                },
                {
                  name: "Correas",
                  keywords: ["gato", "correa", "accesorio"],
                  subcategories: []
                },
                {
                  name: "Ropa",
                  keywords: ["gato", "ropa", "accesorio"],
                  subcategories: []
                },
                {
                  name: "Juguetes",
                  keywords: ["gato", "juguete", "accesorio"],
                  subcategories: []
                },
                {
                  name: "Camas",
                  keywords: ["gato", "cama", "accesorio"],
                  subcategories: []
                },
                {
                  name: "Transporte",
                  keywords: ["gato", "transporte", "accesorio"],
                  subcategories: []
                }
              ]
            },
            {
              name: "Aves",
              keywords: ["ave", "accesorio"],
              subcategories: [
              {
                name: "Comederos",
                keywords: ["ave", "comedero", "accesorio"],
                subcategories: []
              },
              {
                name: "Bebederos",
                keywords: ["ave", "bebedero", "accesorio"],
                subcategories: []
              },
              {
                name: "Jaulas",
                keywords: ["ave", "jaula", "accesorio"],
                subcategories: []
              }]
            },
            {
              name: "Reptiles",
              keywords: ["reptil", "accesorio"],
              subcategories: [
                {
                  name: "Terrarios",
                  keywords: ["reptil", "terrario", "accesorio"],
                  subcategories: []
                },
                {
                  name: "Comederos",
                  keywords: ["reptil", "comedero", "accesorio"],
                  subcategories: []
                },
                {
                  name: "Bebederos",
                  keywords: ["reptil", "bebedero", "accesorio"],
                  subcategories: []
                },
                {
                  name: "Collares",
                  keywords: ["reptil", "collar", "accesorio"],
                  subcategories: []
                },
                {
                  name: "Correas",
                  keywords: ["reptil", "correa", "accesorio"],
                  subcategories: []
                },
              ]
            },
            {
              name: "Peces",
              keywords: ["pez", "accesorio"],
              subcategories: [
                {
                  name: "Acuarios",
                  keywords: ["pez", "acuario", "accesorio"],
                  subcategories: []
                }
              ]
            },
            {
              name: "Conejos",
              keywords: ["conejo", "accesorio"],
              subcategories: [
                {
                  name: "Comederos",
                  keywords: ["conejo", "comedero", "accesorio"],
                  subcategories: []
                },
                {
                  name: "Bebederos",
                  keywords: ["conejo", "bebedero", "accesorio"],
                  subcategories: []
                },
                { 
                  name: "Jaulas",
                  keywords: ["conejo", "jaula", "accesorio"],
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
        const queryParams = new URLSearchParams({
          ...filterCriteria,
          keywords: this.keywords.join(',')
        });
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
      this.fetchFilteredProducts();
    },
  },
};
</script>


<style scoped>
.main-container {
  background-color: #fcfcfc;
}
</style>