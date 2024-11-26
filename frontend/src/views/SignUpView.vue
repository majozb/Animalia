<template>
  <v-container class="login-container" fluid>
    <v-row justify="center" align-content>
      <v-col cols="10" md="6" class="text-center">
        <v-breadcrumbs :items="items"></v-breadcrumbs>
        <v-card class="pa-8" outlined>
          <!-- Títulos principales -->
          <v-row justify="center">
            <v-col cols="auto">
              <h1 class="headline">Es un placer conocerte</h1>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="auto">
              <h2 class="subtitle">Regístrate</h2>
            </v-col>
          </v-row>

          <!-- Formulario -->
          <v-form @submit.prevent="signUp">
            <v-text-field
              v-model="name"
              label="Nombre completo"
              outlined
              dense
              required
              class="input-field mb-4"
            ></v-text-field>
            <v-text-field
              v-model="username"
              label="Nombre de usuario"
              outlined
              dense
              required
              class="input-field mb-4"
            ></v-text-field>
            <v-text-field
              v-model="email"
              label="Email"
              :rules="emailRules"
              outlined
              dense
              required
              class="input-field mb-4"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Contraseña"
              type="password"
              outlined
              dense
              required
              class="input-field mb-4"
            ></v-text-field>
            <v-text-field
              v-model="phone"
              label="Teléfono"
              type="phone"
              outlined
              dense
              required
              class="input-field mb-4"
            ></v-text-field>
            <v-btn color="#003366" block class="mt-3" large @click="signUp">
              Regístrate
            </v-btn>
          </v-form>
        </v-card>
      </v-col>

      <!-- Imagen decorativa de gato -->
      <v-col cols="auto" class="text-right">
        <v-img
          :src="getImagePath('../assets/cat.png')"
          alt="Imagen del item"
          width="300px"
        ></v-img>
      </v-col>
    </v-row>
    <v-row justify="center" class="mb-0">
      <v-col cols="auto">
        <p>&copy; 2024 Animalia. Todos los derechos reservados.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useUserStore } from "@/stores/userStore"; // Asegúrate de la ruta correcta a tu store.
import { jwtDecode } from 'jwt-decode';

export default {
  data: () => ({
    name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    items: [
      {
        title: "Inicio",
        disabled: false,
        href: "/",
      },
      {
        title: "Regístrate",
        disabled: true,
        href: "",
      },
    ],
    emailRules: [
      (v) => !!v || "El correo electrónico es obligatorio",
      (v) => /.+@.+\..+/.test(v) || "Debe ser un correo válido",
    ],
  }),

  methods: {
    getImagePath(item) {
      const imagePath = new URL(item, import.meta.url).href;
      return imagePath;
    },

    async signUp() {
      try {
        // Realizar la petición al backend usando fetch
        const response = await fetch("http://localhost:3000/signUp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.name,
            user: this.username,
            password: this.password,
            email: this.email,
            phone: this.phone,
          }),
        });

        if (!response.ok) {
          throw new Error("Error al registrar el usuario");
        }

        const token = await response.json();

        // Decodificar el token para obtener los datos del usuario
        const decodedToken = jwtDecode(token);

        const userStore = useUserStore();
        userStore.setUser({
          user: this.username,
          userType: decodedToken.userType,
          userId: decodedToken._id,
        });

        this.$router.push("/");
      } catch (error) {
        console.error("Error al registrar el usuario:", error);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  background-color: #faf1e6;
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
  background-color: #f0f0f0;
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
  background-color: transparent !important;
}

.link {
  color: #003366 !important;
}

.mb-0 {
  background-color: #faf1e6;
}
</style>
