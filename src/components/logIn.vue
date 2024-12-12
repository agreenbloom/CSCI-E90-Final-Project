<template>
  <div>
    <h2>Sign In</h2>
    <form @submit.prevent="handleSignIn">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Sign In</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import { signIn } from '@aws-amplify/auth';

export default {
  data() {
    return {
      username: '',
      password: '',
      message: '',
    };
  },
  methods: {
    async handleSignIn(username, password) {
      try {
        const user = await signIn(username, password);
        this.message = 'Sign-in successful!';
        console.log(user);
      } catch (error) {
        this.message = `Error: ${error.message}`;
        console.error(error);
      }
    },
  },
};
</script>
