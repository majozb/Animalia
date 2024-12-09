import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Importa Material Design Icons
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import '@mdi/font/css/materialdesignicons.css'


import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia();

const vuetify = createVuetify({
  components,
  directives,
  ssr: true,
  icons: {
    iconfont: 'mdi',
  },
})
pinia.use(piniaPluginPersistedState);
app.use(vuetify)
app.use(pinia)
app.use(createPinia())
app.use(router)

app.mount('#app')
