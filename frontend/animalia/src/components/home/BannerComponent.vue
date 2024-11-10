<template>
  <v-container :class="['banner-container', type]">
    <v-row align="center" no-gutters>
      <v-col cols="12" md="6" class="text-col">
        <h2 class="title">{{ title }}</h2>
        <h3 class="subtitle">{{ subtitle }}</h3>
        <p class="description">{{ description }}</p>
        <div class="buttons">
          <v-btn v-if="type === 'adoption'" class="btn" color="primary" variant="outlined">Más mascotas</v-btn>
          <v-btn v-if="type === 'adoption'" class="btn" color="secondary" variant="text">Historias</v-btn>
          <v-btn v-if="type === 'services'" color="primary" @click="learnMore">Más Información</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    type: {
      type: String,
      required: true,
      validator: value => ['adoption', 'services'].includes(value)
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  methods: {
    joinInfo() {
      alert('Aquí se podría redirigir a una página de registro.');
    },
    learnMore() {
      alert('Aquí se podría redirigir a una página con todos los servicios ofrecidos.');
    }
  }
};
</script>

<style scoped>
.banner-container {
  background-color: #ffe3c7; /* Fondo beige claro */
  background-size: cover;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-col {
  padding: 24px;
  text-align: left;
}

.title {
  font-size: 36px;
  font-weight: bold;
  color: #1e2a38; /* Color de texto principal */
}

.subtitle {
  font-size: 24px;
  font-weight: 500;
  color: #1e2a38;
  margin-bottom: 12px;
}

.description {
  font-size: 16px;
  color: #6e7a85; 
  margin-bottom: 24px;
}

.buttons {
  display: flex;
  gap: 12px;
}

.btn {
  text-transform: none;
  font-weight: 500;
  border-radius: 8px;
}

.image-col {
  display: flex;
  align-items: center;
  justify-content: center;
}

.image {
  max-width: 100%;
  border-radius: 12px;
}

.banner-container.adoption {
  background-image: url('../../assets/adoption-banner.png');
  height: 350px;
}

.banner-container.services {
  background-image: url('../../assets/services-banner.png');
  height: 400px;
}

.banner-container.services .text-col {
  text-align: right;
  margin-left: 40%;
}
.banner-container.services .buttons {
  text-align: right;
  margin-left: 80%;
}
</style>
