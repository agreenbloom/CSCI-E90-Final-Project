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
  import { ref } from 'vue';
  import { CognitoUser } from 'amazon-cognito-identity-js';
  
  export default {
    setup() {
      const username = ref('');
      const confirmationCode = ref('');
      const errorMessage = ref('');
      const successMessage = ref('');
  
      const handleConfirmSignUp = async () => {
        const user = new CognitoUser({
          Username: username.value,
          Pool: pool,  // Cognito user pool reference
        });
  
        user.confirmRegistration(confirmationCode.value, true, (err, result) => {
          if (err) {
            errorMessage.value = err.message || JSON.stringify(err);
            successMessage.value = '';
          } else {
            successMessage.value = 'Account successfully confirmed! You can now log in.';
            errorMessage.value = '';
          }
        });
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
  