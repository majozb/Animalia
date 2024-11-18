<template>
  <v-app>
    <div class="dashboard-container">
      <!-- Barra de aplicaciones con el ícono de menú para pantallas pequeñas -->
      <v-app-bar>
        <v-app-bar-nav-icon @click="toggleMenu" color="black"/>
        <v-toolbar-title>Dashboard</v-toolbar-title>
        
        <!-- Campo de búsqueda -->
        <v-spacer></v-spacer>
        <v-text-field
          v-model="searchQuery"
          append-icon="mdi-magnify"
          label="Buscar..."
          single-line
          hide-details
          @input="onSearch"
          color="white"
          dark
        />
      </v-app-bar>

      <!-- Menú lateral con VNavigationDrawer -->
      <v-navigation-drawer
        v-model="isMenuOpen"
        app
        className="menu"
        dark
        temporary
      >
        <v-list>
            <!-- Analitics-->
            <v-list-item>
                <v-list-item-title @click="switchComponent('Analitics')">Analitics</v-list-item-title>
            </v-list-item>
            <!-- Sección de gestión de compradores -->
            <v-list-item>
              <v-list-item-title @click="switchComponent('AddBuyer')">Añadir Comprador</v-list-item-title>
            </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Contenido principal -->
      <v-main>
        <div class="main-content">
          <component :is="currentComponent" />
        </div>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import AddBuyer from '@/components/AddBuyer.vue';
import Analitics from '@/components/AnaliticsData.vue';
export default {
  data() {
    return {
      currentComponent: 'AddBuyer', // Componente inicial
      isMenuOpen: false,            // Controla si el menú está abierto o no
      searchQuery: "",              // Query del buscador
    };
  },
  methods: {
    switchComponent(component) {
      this.currentComponent = null;
      this.$nextTick(() => {
        this.currentComponent = component;
        // Oculta el menú después de seleccionar una opción en pantallas pequeñas
        this.isMenuOpen = false;
      });
      
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen; // Alterna el estado de `isMenuOpen`
    },
    onSearch() {
      // Lógica de búsqueda: se activará cada vez que el usuario escribe en el campo de búsqueda.
      console.log("Buscar:", this.searchQuery);
    },
  },
  components: {
    AddBuyer,
    Analitics,
  },
};
</script>

<style>
v-list-item {
  cursor: pointer;
}
/* Contenedor principal */
.dashboard-container {
  display: flex;
  height: 100vh;
}

/* Contenido principal */
.main-content {
  padding: 20px;
  flex-grow: 1;
}

</style>