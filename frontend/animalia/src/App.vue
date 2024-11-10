<script setup> 
import { RouterLink, RouterView } from 'vue-router' 
</script>

<template> 
<RouterView class="mainPage" /> 
</template> 

<style scoped> 
.mainPage { 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  height: 100vh; 
  margin: 0px; 
  padding: 0px; 
  overflow: scroll;
  } 
</style>
