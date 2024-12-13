<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { signIn } from '../services/auth';

export default {
  setup() {
    const username = ref('');
    const password = ref('');

    const handleLogin = async () => {
      try {
        const result = await signIn(username.value, password.value);
        console.log('Logged in:', result);
        // Navigate to trivia page after successful login
        this.$router.push('/trivia');
      } catch (error) {
        console.error('Login error:', error);
      }
    };

    return {
      username,
      password,
      handleLogin,
    };
  },
};
</script>
