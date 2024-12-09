<template>
  <div class="home-banner">
    <img src="../../assets/logo.png" className="logo" alt="Animalia Logo" width="300px" height="300px"/>
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>
    <p>{{ description }}</p>
    <div class="buttons">
      <v-row> 
        <v-col> 
          <v-btn color="primary" @click="moreInfo">Más Información</v-btn> 
        </v-col> 
        <v-col> 
          <v-btn color="secondary" @click="joinInfo">Únete</v-btn> 
        </v-col> 
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeBanner",
  data() {
    return {
      title: "Bienvenido a Nuestro Sitio",
      subtitle: "Explora nuestras características y servicios",
      description: "Descubre la comunidad donde se unen proveedores y dueños de mascotas. La plataforma líder para encontrar todos los productos y servicios para tus mascotas. ¡Todos compartimos el amor por nuestros mejores amigos!"
    };
  },
  methods: {
    moreInfo() {
      // Acciones a realizar cuando se hace clic en "Más Información"
      this.$router.push('/pets');
    },
    joinInfo() {
      // Acciones a realizar cuando se hace clic en "Únete"
      this.$router.push('/signup');
    }
  }
};
</script>

<style scoped>
.home-banner { 
  width: 100vw; 
  height: 800px; 
  display: flex; 
  flex-direction: column; 
  justify-content: center;
  text-align: left; 
  background-color: #7d5959; 
  color: black; 
  background-image: url('../../assets/home-banner.png');
  background-size: cover; 
  margin: 0;
  margin-top: -150px;
  padding: 0; 
  box-sizing: border-box; 
  border-radius: 10px; 
  padding-left: 20px;
}
.home-banner h1 { 
  width: 40%;
  font-size: 2.5rem;
} 

.home-banner p { 
  width: 40%;
  font-size: 1.2rem; 
  color: #666; 
  margin-bottom: 20px; 
}

.buttons {
  width: 40%;
  display: flex;
  justify-content: center;
  gap: 10px;
}


button {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
}

button:hover {
  background-color: #0056b3;
}

/* Media Queries para ocultar los banners en pantallas más pequeñas */ 
@media (max-width: 1000px) { 
  .home-banner { display: none; } 
}
</style>
