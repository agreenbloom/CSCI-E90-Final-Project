import { createRouter, createWebHistory } from 'vue-router';
import Trivia from '../components/triviaHome.vue';

const routes = [
  
  {
    path: '/',
    name: 'Trivia',
    component: Trivia,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
