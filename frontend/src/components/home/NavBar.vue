<template>
  <v-container>
    <v-row align="center" justify="space-between">
    
      <!-- Search Bar -->
      <v-col cols="auto">
        <v-text-field
          flat
          dense
          prepend-inner-icon="mdi-magnify"
          label="Buscar"
          width="300"
        ></v-text-field>
      </v-col>
      
      <!-- User Profile or Login/Register Buttons -->
      <v-col cols="auto">
        <template v-if="isLoggedIn">
          <v-row align="center" class="user-info">
            <!-- User Name -->
            <span class="user-name">Bienvenido, {{ userName }}!</span>
            <!-- Control Panel Button -->
            <v-btn text to="/dashboard">Panel de Control</v-btn>
            <!-- Logout Button -->
            <v-btn text @click="logout">Cerrar Sesión</v-btn>
          </v-row>
        </template>
        <template v-else>
          <v-btn text to="/signin">Iniciar Sesión</v-btn>
          <v-btn outlined color="secondary" to="/signup">Registrarse</v-btn>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import { computed } from 'vue';

export default {
  name: 'NavBar',
  setup() {
    const userStore = useUserStore();

    const userName = computed(() => userStore.user || 'Usuario');
    const isLoggedIn = computed(() => !!userStore.user);

    const logout = () => {
      userStore.clearUser();
    };

    return {
      userName,
      isLoggedIn,
      logout,
    };
  },
};
</script>

<style scoped>
.v-img {
  max-width: 100%;
}

.circular-image {
  border-radius: 50%;
  object-fit: cover;
  width: 40px;
  height: 40px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.navBtn {
  display: inline-block;
  padding: 0 16px;
  color: #a26120;
  background-color: transparent;
  box-shadow: none ; 
  border: none; 
  border-radius: 0;
}

.navBtn:hover {
  color: #44270a;
  background-color: transparent; 
  text-underline-position: above;
  box-shadow: none;
}

.user-name {
  font-weight: bold;
  color: #003366;
  margin-left: 8px;
}
</style>


