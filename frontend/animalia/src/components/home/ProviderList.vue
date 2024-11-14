<template>
  <v-container class="providers-container">
    <div class="header">
      <span>Orgullosos de ser parte de </span>
      <strong>Animalia+</strong>
    </div>

    <v-row class="providers-row">
      <v-col
        v-for="provider in providers"
        :key="provider.name"
        cols="auto"
        class="provider-logo"
      >
        <v-img :src="provider.logo" :alt="provider.name" height="50" width="80" contain></v-img>
      </v-col>
    </v-row>

    <v-btn
      class="view-all-button"
      variant="outlined"
      color="primary"
      @click="viewAllProviders"
    >
      Ver todos nuestros proveedores
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'ProvidersList',
  data() {
    return {
      providers: [
        { name: 'Sheba', logo: 'https://logos-download.com/wp-content/uploads/2020/06/Sheba_Logo.png' },
        { name: 'Whiskas', logo: 'https://e7.pngegg.com/pngimages/954/366/png-clipart-whiskas-logo-pet-food-brands-logos.png' },
        { name: 'Bakers', logo: 'https://seeklogo.com/images/B/bakers-logo-0CC19E700E-seeklogo.com.png' },
        { name: 'Felix', logo: 'https://www.zoomalia.com/marque_img/1267/Felix-logo-marque-zoomalia.jpeg' },
        { name: 'Good Boy', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnAncUpFYlexd_mlO_lunYeJLQkHMBjOHF4w&s' },
        { name: 'Butchers', logo: 'https://t4.ftcdn.net/jpg/03/46/54/05/360_F_346540571_sUvsnQNYIX8y5qRMgdKJrPWfABXJVIjD.jpg' },
        { name: 'Pedigree', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN_sh4OqOJn2wpUh2QxSQRl_pfehow5FPGJw&s' }
      ]
    };
  },
  methods: {
    viewAllProviders() {
      console.log("Ver todos los proveedores");
      // Lógica para mostrar todos los proveedores, redirigir o mostrar más información
    }
  }
};
</script>

<style scoped>
.providers-container {
  text-align: center;
  padding: 16px;
  margin-top: 32px;
}

.header {
  font-size: 18px;
  margin-bottom: 16px;
}

.providers-row {
  gap: 10%; /* Espacio entre logos */
  flex-wrap: nowrap;
}


.view-all-button {
  margin-top: 16px;
}
</style>
