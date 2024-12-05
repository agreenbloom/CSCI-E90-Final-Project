import { createApp } from 'vue';
import App from './App.vue';

import "@aws-amplify/ui-vue/styles.css";

// import Amplify from "aws-amplify";
// import outputs from '../amplify_outputs.json';
import "@aws-amplify/ui-vue";

// Amplify.configure(outputs);

// Vue.config.productionTip = false;

createApp(App).mount('#app');