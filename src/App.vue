<template>
  <div id="app">
    <header>
      <h1>Trivia App</h1>
    </header>

    <div >
      <p>Welcome</p>

      <div>
        <h1>Select a Category</h1>
        <CategorySelect :categories="categories" v-model="selectedCategoryId" />
        <p v-if="selectedCategoryId">Selected Category ID: {{ selectedCategoryId }}</p>
      </div>

      <button @click="fetchTrivia">Get Trivia Question</button>
    
      <Question 
        v-for="question in questions" 
        :key="question.question_id" 
        :question="question" 
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Question from './components/showQuestion.vue';
import CategorySelect from './components/categorySelect.vue';


export default {
  components: {
    Question,
    CategorySelect,
  },
  data() {
    return {
      questions: [], // Array to store the questions
      selectedCategoryId: null, // Holds the selected category ID
      categories: [
        {id: 1, name: 'Books' },
        {id: 2, name: 'Sports' },
        {id: 3, name: 'Computers' },
        {id: 4, name: "Film"},
        {id: 5, name: "History"},
        {id: 6, name: "Cartoons"},
        {id: 7, name: "Geography"},
        {id: 8, name: "Television"},
        {id: 9, name: "Video Games"},
        {id: 10, name: "	Vehicles"},
        {id: 11, name: "	Music"},
        {id: 12, name: "	Mathematics"},
        {id: 13, name: "	Nature"},
        {id: 14, name: "	Animals"},
        {id: 15, name: "	Comics"},
        {id: 16, name: "	Manga"},
        {id: 17, name: "	General Knowledge"},
        {id: 18, name: "	Board Games"},
      ],
    };
  },
  
  methods: {
    async fetchTrivia() {
      try {
        const response = await axios.get('https://7bgydjo949.execute-api.us-east-1.amazonaws.com/production/questions', {
          headers: {
            'Content-Type': 'application/json'
          },
          params: {
            category_id: this.selectedCategoryId || 17, // You can set the category dynamically
          },
        });
        const results = JSON.parse(response.data.body)
        this.questions = results.results;
      } catch (error) {
        console.error("Error fetching trivia:", error);
      }
    },
  },
};
</script>
