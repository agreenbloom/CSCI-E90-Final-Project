<template>
  <div id="app">
    <header class="triviaHeader">
      <p>Welcome </p>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  setup() {
    return {
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
