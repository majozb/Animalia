<template>
    <v-container>
      <v-row align="center" justify="space-between">
        <!-- Navigation Links -->
        <v-col cols="auto">
          <v-btn className="navBtn" text to="/">Home</v-btn>
          <v-btn className="navBtn" text to="/categoria">Categoría</v-btn>
          <v-btn className="navBtn" text to="/about">About</v-btn>
          <v-btn className="navBtn" text to="/contact">Contact</v-btn>
        </v-col>
        
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
        
        <!-- Login/Register Buttons -->
        <v-col cols="auto">
          <v-btn text to="/login">Iniciar Sesión</v-btn>
          <v-btn outlined color="secondary" to="/register">Registrarse</v-btn>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
export default {
  name: 'NavBar'
};
</script>

<style scoped>

.v-img {
  max-width: 100%;
}

.navBtn {
  display: inline-block;
  padding: 0 16px;
  color : #a26120;
  text-underline-position: 0px;
  background-color: none;
}
.navBtn:hover {
  display: inline-block;
  padding: 0 16px;
  color : #44270a;
  text-underline-position: 0px;
  background-color: none;
}
</style>
