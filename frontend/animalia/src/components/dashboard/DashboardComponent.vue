<template>
  <v-app>
    <div class="dashboard-container">
      <!-- Barra de aplicaciones con el ícono de menú para pantallas pequeñas -->
      <v-app-bar class="app-bar">
        <v-app-bar-nav-icon @click="toggleMenu" color="black" />
        <v-toolbar-title class="title">Panel de Control</v-toolbar-title>

        <v-breadcrumbs class="breadcrumbs" :items="breadcrumbs" @click:breadcrumb="goToHome" />

        <!-- Campo de búsqueda -->
        <v-spacer></v-spacer>
        <v-text-field
          v-model="searchQuery"
          append-icon="mdi-magnify"
          label="Buscar..."
          single-line
          hide-details
          @input="onSearch"
          class="search-bar"
        />
        <!-- Mostrar usuario -->
        <v-spacer></v-spacer>
        <div class="user-info" v-if="user">
          <span class="user-name">Bienvenido, {{ user }}</span>
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="">
        </div>

      
      </v-app-bar>
    
      
      <!-- Menú lateral con VNavigationDrawer -->
      <v-navigation-drawer
        v-model="isMenuOpen"
        app
        class="menu"
        dark
        temporary
      >
        <v-list class="menu-list">
          <!-- Analitics-->
          <v-list-item class="menu-item">
            <v-list-item-title @click="switchComponent('Analitics')">
              Analíticas
            </v-list-item-title>
          </v-list-item>
          <!-- AddBuyer-->
          <v-list-item class="menu-item">
            <v-list-item-title @click="switchComponent('AddBuyer')">
              Añadir Comprador
            </v-list-item-title>
          </v-list-item>
          <!-- Add Pet -->
          <v-list-item  class="menu-item">
            <v-list-item-title @click="switchComponent('AddPet')">
              Añadir Mascota
            </v-list-item-title>
          </v-list-item>
          <!-- Add Provider -->
          <v-list-item class="menu-item">
            <v-list-item-title @click="switchComponent('AddProvider')">
              Añadir Proveedor
            </v-list-item-title>
          </v-list-item>
          <!-- Add Product -->
          <v-list-item class="menu-item">
            <v-list-item-title @click="switchComponent('AddProduct')">
              Añadir Producto
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="signOut" class="menu-item">
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Main Content -->
      <v-main>
        <div class="main-content">
          <component :is="currentComponent" />
        </div>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import { useUserStore } from "@/stores/userStore"; // Importa el store de Pinia
import AddBuyer from "@/components/dashboard/AddBuyer.vue";
import Analitics from "@/components/dashboard/AnaliticsData.vue";
import AddPet from "@/components/dashboard/AddPet.vue";
import AddProvider from "@/components/dashboard/AddProvider.vue";
import AddProduct from "@/components/dashboard/AddProduct.vue";

export default {
  data() {
    return {
      currentComponent: "AddBuyer", // Componente inicial
      isMenuOpen: false, // Controla si el menú está abierto o no
      searchQuery: "", // Query del buscador
      breadcrumbs: [
        { title: "Inicio", disabled: false, to: "/" },
        { title: "Panel de Control", disabled: true },
      ]
    };
  },
  computed: {
    user() {
      return this.userStore.user; // Obtén el nombre de usuario del store
    },
    userType() {
      return this.userStore.userType; // Obtén el rol del usuario del store
    },
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
    goToHome() {
      this.$router.push("/"); // Redirige a la página principal (Home)
    },
    onSearch() {
      // Lógica de búsqueda: se activará cada vez que el usuario escribe en el campo de búsqueda.
      console.log("Buscar:", this.searchQuery);
    },
    signOut() {
      // Eliminar el usuario del store y el localStorage
      this.userStore.clearUser();
      // Redirigir al home
      this.$router.push('/'); // Asegúrate de tener configurado Vue Router
    },
  },
  components: {
    AddBuyer,
    Analitics,
    AddPet,
    AddProvider,
    AddProduct,
  },
  setup() {
    const userStore = useUserStore(); 
    return { userStore };
  },
};
</script>

<style scoped>
.v-list-item {
  cursor: pointer;
}

.dashboard-container {
  display: flex;
  height: 100vh;
  background-color: #F7DBA7;
}

.app-bar {
  background-color: #003459;
}

.title {
  color: #F7DBA7;
}

.search-bar {
  background-color: #F7DBA7;
  color: #003459;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
}

.user-name {
  font-weight: bold;
  color: #F7DBA7;
}

.user-info img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.menu {
  background-color: #003459;
}

.menu-list .menu-item {
  color: #F7DBA7;
}

.menu-list .menu-item:hover {
  background-color: #F7DBA7;
  color: #003459;
}

.main-content {
  padding: 20px;
  flex-grow: 1;
  background-color: #F7DBA7;
}

.breadcrumbs {
  color: #F7DBA7;
}
</style>
