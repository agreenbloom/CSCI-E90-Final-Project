<template>
    <div id="trivia" class="triviaHome">
  
      <header>
        <h1>Trivia questions</h1>
      </header>
  
        <div>
          <h1 class="category-header">Select a Category</h1>
          <div class="category-select">
            <div>
              <CategorySelect :categories="categories" v-model="selectedCategoryId" />
            </div>
            <button @click="fetchTrivia" class="getTriviaQuestion">Get Trivia Question</button>
          </div>
        </div>
  
        <ShowQuestion 
          v-for="question in questions" 
          :key="question.question_id" 
          :question="question" 
        />
    </div>
  </template>
  
  <script>
    import ShowQuestion from './showQuestion.vue'
    import CategorySelect from './categorySelect.vue'
    import { ref } from 'vue';
    import { getTriviaQuestions } from '@/services/api';
    import { categories } from '@/services/utils';
    
  export default {
    components: {
        ShowQuestion,
        CategorySelect,
    },
    setup() {
    const questions = ref([]); // Store trivia questions
    const selectedCategoryId = ref(17); // Default category
  
    // Fetch trivia questions based on selected category ID
    const fetchTrivia = async () => {
      try {
        const fetchedQuestions = await getTriviaQuestions(selectedCategoryId.value);
        questions.value = fetchedQuestions; // Update questions with the response
      } catch (error) {
        console.error("Error fetching trivia:", error);
      }
    };
    return {
      questions,
      selectedCategoryId,
      fetchTrivia,
      categories,
    };
  }
}
  </script>

<style>
  .category-header{
    text-align: center;
  }

  .getTriviaQuestion{
    max-height: 50px;
    align-self: center;

  }

  .getTriviaQuestion:hover {
    background-color: #45a049;
  }
  .triviaHome {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100vh;
    background-color: #f0f0f0;
    font-family: Arial, sans-serif;
  }

  .category-select {
    display: grid;
    grid-template-columns: 6fr 3fr 1fr;
    flex-direction: column;
    align-items: normal;
    justify-content: center;
    margin-top: 20px;
  }
</style>
  