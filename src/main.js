import { createApp } from 'vue';
import App from './App.vue';
import "@aws-amplify/ui-vue/styles.css";
import "@aws-amplify/ui-vue";
// import { Amplify } from 'aws-amplify';
// import awsExports from './aws-exports';

// Amplify.configure(awsExports);
// Amplify.Logger.LOG_LEVEL = 'DEBUG';

createApp(App).mount('#app');