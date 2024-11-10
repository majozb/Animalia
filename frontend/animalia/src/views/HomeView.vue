<script setup>
 import HomeImage from '@/components/home/HomeImage.vue';
 import ProductList from '@/components/home/ProductList.vue';
 import ProviderList from '@/components/home/ProviderList.vue';
 import AdoptionList from '@/components/home/AdoptionList.vue';
 import AdviceList from '@/components/home/AdviceList.vue';
 import FooterPage from '@/components/home/FooterPage.vue';
 import Banner from '@/components/home/BannerComponent.vue';
 import NavBar from '@/components/home/NavBar.vue';
</script>

<template>
  <NavBar />
  <HomeImage/>
  <!-- <ProductList /> -->
  <Banner type="adoption" 
          title="Adopción" 
          subtitle="Nosotros necesitamos ayuda. Y ellos también." 
          description="Adopta un perro y llévalo a tu casa. Te lo agradecerá incondicionalmente." 
        />
  <!-- <AdoptionList />
  <ProviderList /> -->
  <Banner type="services" 
          title="Servicios Que Ofrecemos" 
          subtitle="Explora nuestros servicios para mascotas y encuentra lo que necesitas." 
          description="Conoce los diversos servicios que ofrecemos para el cuidado y bienestar de tus mascotas." 
          />
  <AdviceList />
  <FooterPage />
</template>




