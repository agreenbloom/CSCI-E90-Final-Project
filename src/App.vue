<template>
  <div id="app">
    <header>
      <h1>Trivia App</h1>
      <amplify-authenticator></amplify-authenticator>
    </header>
    <div v-if="user">
      <p>Welcome, {{ user.username }}!</p>
      <button @click="fetchTrivia">Get Trivia Question</button>
      <p v-if="trivia">{{ trivia.question }}</p>
    </div>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
import axios from "axios";

export default {
  data() {
    return {
      user: null,
      trivia: null,
    };
  },
  async created() {
    this.user = {}
    // await Auth.currentAuthenticatedUser();
  },
  methods: {
    async fetchTrivia() {
      try {
        const token = (await Auth.currentSession()).getIdToken().getJwtToken();
        const response = await axios.get("YOUR_API_GATEWAY_URL/trivia", {
          headers: { Authorization: token },
        });
        this.trivia = response.data;
      } catch (error) {
        console.error("Error fetching trivia:", error);
      }
    },
  },
};
</script>
