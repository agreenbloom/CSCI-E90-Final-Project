<template>
    <div>
      <h2>Join Quiz Session</h2>
      <input v-model="username" type="text" placeholder="Enter a temporary username" required />
      <button @click="joinQuizSession">Join Session</button>
      <p v-if="sessionJoined">You have joined the session as {{ username }}!</p>
    </div>
  </template>
  
  <script>
  import { joinQuizSession } from '../services/api'; // API service
  
  export default {
    data() {
      return {
        username: '',
        sessionJoined: false,
      };
    },
    methods: {
      async joinQuizSession() {
        try {
          const sessionId = this.sessionId; // This should come from somewhere (URL or list of available sessions)
          const response = await joinQuizSession(sessionId, this.username);
          this.sessionJoined = true;
          console.log(response);
        } catch (error) {
          console.error('Error joining session:', error);
        }
      }
    }
  };
  </script>
  