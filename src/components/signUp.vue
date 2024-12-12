<template>
    <div>
      <h2>Sign Up</h2>
      <form @submit.prevent="handleSignUp">
        <input type="text" v-model="username" placeholder="Username" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <input type="email" v-model="email" placeholder="Email" required />
        <button type="submit">Sign Up</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import { signUp } from '@aws-amplify/auth';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        email: '',
        message: '',
      };
    },
    methods: {
      async handleSignUp() {
        try {
          const user = await signUp({
            username: this.username,
            password: this.password,
            attributes: {
              email: this.email,
            },
          });
          this.message = 'Sign-up successful! Check your email to confirm your account.';
          console.log(user);
        } catch (error) {
          this.message = `Error: ${error.message}`;
          console.error(error);
        }
      },
    },
  };
  </script>
  