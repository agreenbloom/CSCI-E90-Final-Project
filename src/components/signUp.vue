<template>
    <div>
      <h2>Sign Up</h2>
      <form @submit.prevent="handleSignUp">
        <input v-model="username" type="text" placeholder="Username" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { signUp } from '../services/auth';
  
  export default {
    setup() {
      const username = ref('');
      const email = ref('');
      const password = ref('');
      const errorMessage = ref('');
      const successMessage = ref('');
  
      const handleSignUp = async () => {
        try {
          await signUp(username.value, email.value, password.value);
          successMessage.value = 'Sign-up successful! Please check your email for a confirmation link.';
          errorMessage.value = '';
        } catch (error) {
          errorMessage.value = error.message || 'An error occurred during sign-up.';
          successMessage.value = '';
        }
      };
  
      return {
        username,
        email,
        password,
        errorMessage,
        successMessage,
        handleSignUp,
      };
    },
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  .success {
    color: green;
  }
  </style>
  