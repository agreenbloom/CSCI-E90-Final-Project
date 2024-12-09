<template>
  <div id="app">
    <header>
      <h1>Trivia App</h1>
    </header>

    <div >
      <p>Welcome</p>
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

export default {
  components: {
    Question,
  },
  data() {
    return {
      questions: [], // Array to store the questions
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
              category_id: 1, // You can set the category dynamically
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
