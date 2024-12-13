<!-- TriviaHome.vue -->
<template>
    <div>
      <h1>Welcome to the Trivia App</h1>
  
      <div v-if="isQuizMaster">
        <CreateQuizSession />
      </div>
  
      <div v-if="!isQuizMaster">
        <JoinQuizSession />
      </div>
    </div>
  </template>
  
  <script>
  import CreateQuizSession from './createQuizSession.vue';
  import JoinQuizSession from './joinQuizSession.vue';
  import { ref } from 'vue';
  
  export default {
    components: {
      CreateQuizSession,
      JoinQuizSession,
    },
    setup() {
      const isQuizMaster = ref(true); // You can set this based on the user's role, e.g., from authentication
  
      return {
        isQuizMaster,
      };
    },
  };
  </script>
  