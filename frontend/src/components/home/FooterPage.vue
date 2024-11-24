<template>
  <v-footer>
    <v-container>
      <v-row justify="space-between" class="footer-content">
        <!-- Social Media Icons -->
        <v-col cols="12" sm="4" class="social-media text-center">
          <v-btn icon>
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-instagram</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-youtube</v-icon>
          </v-btn>
        </v-col>

        <!-- Navigation Links -->
        <v-col cols="12" sm="4" class="navigation-links text-center">
          <v-btn text>Home</v-btn>
          <v-btn text>Categoría</v-btn>
          <v-btn text>About</v-btn>
          <v-btn text>Contact</v-btn>
        </v-col>

        <!-- Email Subscription -->
        <v-col cols="12" sm="4" class="email-subscription text-center">
          <v-label>
            Suscríbete a nuestro boletín
          </v-label>
          <v-text-field
            label="Introduce tu email"
            outlined
            dense
            class="subscription-input"
          ></v-text-field>
          <v-btn color="primary">Enviar</v-btn>
        </v-col>
      </v-row>


      <!-- Copyright -->
      <v-row justify="center">
        <img src="../../assets/logo.png" className="logo" alt="Animalia Logo" width="300px" height="300px"/>
        <v-col cols="auto">
          <p class="mb-0">&copy; 2024 Animalia. Todos los derechos reservados.</p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter'
};
</script>

<style scoped>
.v-footer {
  padding: 24px 0;
  background-color: #FCEED5;
}

.footer-content {
  margin-bottom: 24px;
}

.social-media .v-btn {
  color: black;
}

.navigation-links .v-btn {
  color: black;
}

.email-subscription .subscription-input {
  margin-bottom: 16px;
}

p {
  color: black;
}

.logo {
  margin-top: -100px;
}
</style>
