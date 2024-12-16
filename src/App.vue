<template>
  <div id="app">
    <header class="triviaHeader">
      <p>Welcome {{ currentUsrName }}</p>
      <button v-if="loggedIn" @click="loggedOut"> Log Out</button>    
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import { getCurrentUser, signOut } from './services/auth';
import { ref, onMounted } from 'vue';

export default {
  name: 'App',
  setup() {
    // Reactive state for the current user
    const currentUsrName = ref(null);
    const loggedIn = ref(false); // Track login status

    // Check if the user is logged in
    const isUserLoggedIn = () => {
      const user = getCurrentUser();
      console.log(user);
      currentUsrName.value = user ? user.username : null;
      loggedIn.value = !!user; // Update login status
      return loggedIn.value;
    };

    // Logout function
    const loggedOut = async () => {
      try {
        await signOut(); // Call the signOut function
        localStorage.removeItem('user'); // Clear user data from localStorage
        currentUsrName.value = null; // Reset the current user name
        loggedIn.value = false; // Update login status
        window.location.href = '/'; // Redirect to the home page
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    // Run on component load
    onMounted(() => {
      isUserLoggedIn();
    });

    return {
      currentUsrName,
      loggedIn,
      isUserLoggedIn,
      loggedOut,
    };
  },
};
</script>

<style> 
/* General Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  color: #333;
  line-height: 1.6;
}

/* Header Styles */
header {
  text-align: center;
  margin-bottom: 20px;
}

header h1 {
  font-size: 2rem;
  color: #2c3e50;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #34495e;
}

/* Category Select Dropdown */
select {
  width: 60%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f7f7f7;
  cursor: pointer;
}

/* Button Styles */
button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #3498db;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}

.triviaHeader {
  background-color: #000;
  color: white;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: black solid 3px;
}

/* Responsive Styles */
@media (max-width: 600px) {
  #trivia {
    padding: 15px;
  }

  select {
    width: 100%;
  }

  button {
    width: 100%;
  }
}
</style>
