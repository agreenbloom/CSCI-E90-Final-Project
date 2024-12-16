<template>
    <div id="logout button">
        <button @click="loggingOut">Logout</button>
    </div>
  </template>
  
  <script>
  import { signOut } from '@/services/auth';
  
  export default {
    async loggingOut() {
      console.log(' starting logout')
        try {
            await signOut(); 
            console.log('logout successful')
        } catch (error) {
          console.error('Error logging out:', error);
        }
      }
    }
  </script>