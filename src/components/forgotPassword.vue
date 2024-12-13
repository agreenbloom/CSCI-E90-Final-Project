<template>
    <div>
      <h2>Forgot Password</h2>
      <form v-if="step === 1" @submit.prevent="handleForgotPassword">
        <input v-model="username" type="text" placeholder="Enter your email or username" required />
        <button type="submit">Send Reset Code</button>
      </form>
      
      <form v-if="step === 2" @submit.prevent="handleResetPassword">
        <input v-model="verificationCode" type="text" placeholder="Enter the reset code" required />
        <input v-model="newPassword" type="password" placeholder="Enter new password" required />
        <button type="submit">Reset Password</button>
      </form>
  
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { forgotPassword, confirmForgotPassword } from '../services/auth';
  
  export default {
    setup() {
      const step = ref(1); // Step 1: Request Reset Code, Step 2: Enter Code and New Password
      const username = ref('');
      const verificationCode = ref('');
      const newPassword = ref('');
      const errorMessage = ref('');
      const successMessage = ref('');
  
      // Step 1: Handle forgot password (send reset code)
      const handleForgotPassword = async () => {
        try {
          await forgotPassword(username.value);
          successMessage.value = 'Reset code sent to your email. Please check your inbox.';
          errorMessage.value = '';
          step.value = 2; // Move to Step 2
        } catch (error) {
          errorMessage.value = error.message || 'An error occurred while sending the reset code.';
          successMessage.value = '';
        }
      };
  
      // Step 2: Handle reset password (confirm reset code)
      const handleResetPassword = async () => {
        try {
          await confirmForgotPassword(username.value, verificationCode.value, newPassword.value);
          successMessage.value = 'Your password has been successfully reset. You can now log in with your new password.';
          errorMessage.value = '';
          // Optionally, navigate to the login page after successful reset
          // this.$router.push('/login');
        } catch (error) {
          errorMessage.value = error.message || 'An error occurred while resetting the password.';
          successMessage.value = '';
        }
      };
  
      return {
        step,
        username,
        verificationCode,
        newPassword,
        errorMessage,
        successMessage,
        handleForgotPassword,
        handleResetPassword,
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
  