<template>
    <button @click="handleSignOut">Log Out</button>
  </template>
  
  <script>
  import { signOut } from '@aws-amplify/auth';
  
  export default {
    methods: {
      async handleSignOut() {
        try {
          await signOut();
          console.log('User signed out');
        } catch (error) {
          console.error('Error signing out:', error);
        }
      },
    },
  };
  </script>
  