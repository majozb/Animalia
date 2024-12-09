<template>
  <v-container>
    <div class="header">
      <h4>¿Dificultad para elegir los productos adecuados para tus mascotas?</h4>
      <h2>Nuestros Productos</h2>
      <div class="buttons">
      <v-btn
      class="mt-4"
      variant="outlined"
      color="primary"
      @click="viewMore">
      Ver más
    </v-btn>
    </div>
    </div>

    <v-row>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-img
            :src="product.image"
            height="200px"
            class="product-image"
          ></v-img>
          <v-card-title>{{ product.name }}</v-card-title>
          <v-card-subtitle>{{ product.category }} | Tamaño: {{ product.size }}</v-card-subtitle>
          <v-card-text>{{ product.price }} EUR</v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: 'ProductList',
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Reflex Plus Adult Cat Food Salmon",
          category: "Comida para gatos",
          size: "385g",
          price: 10,
          image: "https://www.reflexmama.com/upload/product_gallery/product_gallery_2021-06-21_17-21-23.png"
        },
        {
          id: 2,
          name: "Cat scratching ball toy kitten sisal rope ball",
          category: "Juguete",
          size: "Pequeño",
          price: 15,
          image: "https://i.etsystatic.com/50711688/r/il/463810/5955326289/il_570xN.5955326289_p61a.jpg"
        },
        {
          id: 3,
          name: "Cute Pet Cat Warm Nest",
          category: "Juguete",
          size: "Grande",
          price: 20,
          image: "https://m.media-amazon.com/images/I/61HsiZIjhvL._AC_UF1000,1000_QL80_.jpg"
        },
      ]
    };
  },
  methods: {
    viewMore() {
      alert('Aquí se podría redirigir a una página con todos los productos.');
    }
  }
};
</script>

<style scoped>
.header {
  text-align: left;
  margin-bottom: 24px;
  padding-top: 20px;
  margin-top: 20px;
}

.product-image {
  border-radius: 8px;
}

v-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
