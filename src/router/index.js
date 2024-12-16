import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/logIn.vue';
import Trivia from '../components/triviaHome.vue';
import SignUp from '../components/signUp.vue';  // Import the SignUp component

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/trivia',
    name: 'Trivia',
    component: Trivia,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,  // Add the route for SignUp
  },
  {
    path: '/forgotPassword',
    name: 'ForgotPassword',
    component: () => import('../components/forgotPassword.vue'),
  },
  {
    path: '/startQuiz',
    name: 'StartQuiz',
    component: () => import('../components/startTriviaGame.vue'),
  },
  {
    path: '/createTriviaQuestion',
    name: 'CreateTriviaQuestion',
    component: () => import('../components/createTriviaQuestion.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
