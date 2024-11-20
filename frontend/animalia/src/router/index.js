import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/dev',
      name: 'Dev',
      component: () => import('../views/DevView.vue'),
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: () => import('../views/SignInView.vue'),
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: () => import('../views/SignUpView.vue'),
    },
    {
      path: '/products',
      name: 'Products',
      component: () => import('../views/ProductsView.vue'),
    },
    {
      path: '/pets',
      name: 'Pets',
      component: () => import('../views/PetsView.vue'),
    }
  ],
})

export default router
