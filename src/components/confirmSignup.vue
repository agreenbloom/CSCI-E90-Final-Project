<template>
  <div>
    <h2>Confirm Sign-Up</h2>
    <form @submit.prevent="handleConfirmSignUp">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="confirmationCode" type="text" placeholder="Confirmation Code" required />
      <button type="submit">Confirm</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { confirmUserSignUp } from "../services/api";

export default {
  setup() {
    const username = ref("");
    const confirmationCode = ref("");
    const errorMessage = ref("");
    const successMessage = ref("");

    const handleConfirmSignUp = async () => {
      try {
        const result = await confirmUserSignUp(username.value, confirmationCode.value);
        successMessage.value = "Account successfully confirmed! You can now log in.";
        errorMessage.value = "";
        console.log("Confirmation result:", result);
        this.$router.push('/login');
      } catch (err) {
        errorMessage.value = err.message || "Error confirming sign-up.";
        successMessage.value = "";
        console.error("Error during confirmation:", err);
      }
    };

    return {
      username,
      confirmationCode,
      errorMessage,
      successMessage,
      handleConfirmSignUp,
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
