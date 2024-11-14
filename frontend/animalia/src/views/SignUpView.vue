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
          <v-form>
            <v-text-field
              label="Nombre de usuario"
              outlined
              dense
              required
              class="input-field mb-4"
            ></v-text-field>
            <v-text-field
              label="email"
              :rules="emailRules"
              outlined
              dense
              class="input-field mb-4"
            ></v-text-field>
            <v-text-field
              label="Contraseña"
              type="password"
              outlined
              dense
              class="input-field mb-4"
            ></v-text-field>
            <v-text-field
              label="Teléfono"
              type="phone"
              outlined
              dense
              class="input-field mb-4"
            ></v-text-field>
            <v-btn color="#003366" block class="mt-3" large>
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
  </v-container>
  <v-row justify="center" class="mb-0">
    <v-col cols="auto">
      <p>&copy; 2024 Animalia. Todos los derechos reservados.</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
      items: [
        {
          title: 'Inicio',
          disabled: false,
          href: '/',
        },
        {
          title: 'Regístrate',
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
.login-container {
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

.mb-0 {
  background-color: #FAF1E6;
}
</style>
