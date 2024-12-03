<template>
  <v-container class="signIn-container" fluid>
    <v-row justify="center">
      <v-col cols="6" md="6" class="text-center">
        <v-breadcrumbs :items="items"></v-breadcrumbs>
        <v-card class="pa-8" outlined>
          <!-- Títulos principales -->
          <v-row justify="center">
            <v-col cols="auto">
              <h1 class="headline">¡Bienvenido de nuevo!</h1>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="auto">
              <h2 class="subtitle">Accede a tu cuenta</h2>
            </v-col>
          </v-row>

          <!-- Formulario -->
          <v-form @submit.prevent="signIn">
            <v-text-field v-model="username" label="Nombre de usuario" outlined dense
              class="input-field mb-4"></v-text-field>
            <v-text-field v-model="password" label="Contraseña" type="password" outlined dense
              class="input-field mb-4"></v-text-field>
            <v-btn color="#003366" block class="mt-3" @click="signIn" large>
              Entrar
            </v-btn>
          </v-form>

          <!-- Opciones de enlace -->
          <v-row justify="space-between" class="mt-2">
            <v-col class="text-left">
              ¿Aún tienes cuenta?
              <v-btn variant="text" small class="link" @click="goToSignUp">Regístrate</v-btn>
            </v-col>
            <v-col class="text-right">
              ¿Olvidaste tu contraseña?
              <v-btn variant="text" small class="link" @click="restorePassword">Nueva contraseña</v-btn>
            </v-col>
          </v-row>

          <!-- Divider y botón adicional -->
          <v-row justify="center" class="text-center">
            <v-col cols="auto">
              ¿Eres un proveedor o un refugio?
              <v-btn variant="text" small class="link" @click="discoverMore">Descubre más</v-btn>
            </v-col>
          </v-row>
        </v-card>

      </v-col>

      <!-- Imagen decorativa de perro y gato -->
      <v-col cols="auto" class="text-right">
        <v-img :src="getImagePath('../assets/dog-and-cat.png')" alt="Imagen del item" width="600px"></v-img>
      </v-col>
    </v-row>
    
  </v-container>
  <v-row justify="center" class="mb-0">
    <v-col cols="auto">
      <p>&copy; 2024 Animalia. Todos los derechos reservados.</p>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useUserStore } from '../stores/userStore';

export default {
  data: () => ({
    username: '',
    password: '',
    items: [
      {
        title: 'Inicio',
        disabled: false,
        href: '/',
      },
      {
        title: 'Inicio Sesión',
        disabled: true,
        href: '',
      },
    ],
  }),

  methods: {
    getImagePath(item) {
      // Build the path to the image of the item
      // const imagePath = new URL(`../assets/${this.imageType}/${id}/main.jpg`, import.meta.url).href;
      const imagePath = new URL(item, import.meta.url).href;
      return imagePath;
    },
    async signIn() {
      try {
        const response = await axios.post('http://localhost:3000/signIn', {
          username: this.username,
          password: this.password
        });

        const token = response.data;
        const decodedToken = jwtDecode(token);

        const userType = decodedToken.userType;
        const userId = decodedToken.userId;

        const userStore = useUserStore();

        // Almacenar el usuario, tipo de usuario e ID en el store
        userStore.setUser({
          user: this.username,
          userType: userType,
          userId: userId
        });

        console.log("User Data Stored:", { user: this.username, userType, userId });

        this.$router.push('/'); // Redirigir a la página principal
      } catch (error) {
        console.error("Error during signIn", error);
        alert("Credenciales inválidas");
      }
    },
    goToSignUp() {
      this.$router.push('/signup');
    },
    restorePassword() {
      // Link to a page to restore the password
    },
    discoverMore() {
      this.$router.push('/discover');
    }
  }
}
</script>

<style scoped>
.mb-0 {
  background-color: #FAF1E6;
}

.signIn-container {
  background-color: #FAF1E6;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.headline {
  color: #003366;
  font-size: 32px;
  font-weight: bold;
}

.subtitle {
  color: #003366;
  font-size: 18px;
  font-weight: bold;
}

.input-field {
  background-color: #F0F0F0;
}

.pa-8 {
  padding: 32px !important;
}

.v-card {
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.v-btn {
  font-weight: bold;
}

.button {
  /* Simulate a text and not a button */
  background-color: transparent !important;
}

.link {
  color: #003366 !important;
}

.v-divider {
  background-color: #ddd;
}

.less-padding {
  padding: 0 !important;
}
</style>
