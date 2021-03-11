import { createRouter, createWebHashHistory } from 'vue-router'
import Login from './views/Login.vue';
import LandingPage from './views/LandingPage.vue'
import ViewPostedJobs from './views/ViewPostedJobs.vue'

const Home = { template: '<div>Home</div>' }

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LandingPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: ViewPostedJobs
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;