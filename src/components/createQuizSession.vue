<template>
  <div>
    <h2>Create Quiz Session</h2>
    <button @click="createQuizSession">Create New Session</button>
    <p v-if="sessionCreated">Session Created! Your Session ID: {{ sessionId }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { createQuizSession } from '../services/api'; // API service
import { getCurrentUser } from '@/services/auth';
export default {
  setup() {
    const sessionCreated = ref(false);
    const sessionId = ref('');
  

    // Function to create quiz session
    const createQuizSessionHandler = async () => {
      try {
        await createQuizSession(getCurrentUser()); // API call 
      } catch (error) {
        console.error('Error creating session:', error);
      }
    };

    // Return the necessary data and methods to the template
    return {
      sessionCreated,
      sessionId,
      createQuizSession: createQuizSessionHandler, // Bind the method to the template
    };
  },
};
</script>
