<template>
    <div>
      <h2>Create Quiz Session</h2>
      <button @click="createQuizSession">Create New Session</button>
      <p v-if="sessionCreated">Session Created! Your Session ID: {{ sessionId }}</p>
    </div>
  </template>
  
  <script>
  import { createQuizSession } from '../services/api'; // API service
  
  export default {
    data() {
      return {
        sessionCreated: false,
        sessionId: '',
      };
    },
    methods: {
      async createQuizSession() {
        try {
          const response = await createQuizSession({ quizMasterUserId: 'master-id' }); // pass the quiz master user ID
          this.sessionId = response.sessionId;
          this.sessionCreated = true;
        } catch (error) {
          console.error('Error creating session:', error);
        }
      }
    }
  };
  </script>
  