<template>
    <div class="triviaForm">
      <h2>Create a Trivia Question</h2>
  
      <form @submit.prevent="submitTriviaQuestion">
        <div>
          <label>Category:</label>
          <!-- Use CategorySelect component -->
          <CategorySelect
            v-model="selectedCategory"
            :categories="categories"
          />
        </div>
  
        <div>
          <label for="question">Question:</label>
          <input type="text" v-model="questionText" required />
        </div>
  
        <div>
          <label>Answers:</label>
          <div v-for="(answer, index) in answers" :key="index">
            <input
              type="text"
              v-model="answers[index].text"
              required
              placeholder="Answer Here"
            />
            <input type="radio" :value="index" v-model="correctAnswerIndex" /> Mark
            as correct
          </div>
        </div>
  
        <button type="submit">Submit Question</button>
      </form>
  
      <p>create another: {{ createAnother }}</p>
      <div v-if="createAnother">
        <button @click="resetTriviaForm">Create Another Question</button>
        <button @click="playTriviaGame">Play Trivia</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import CategorySelect from './categorySelect.vue'; // Import the CategorySelect component
  import { categories } from '@/services/utils';
  import { createTriviaQuestion } from '@/services/api';
  import { useRouter } from 'vue-router';

  
  export default {
    name: 'App',
    components: {
      CategorySelect,
    },
    setup() {
      const selectedCategory = ref(null);
      const questionText = ref('');
      const createAnother = ref(false);
      const answers = ref([
        { text: '' },
        { text: '' },
        { text: '' },
        { text: '' },
      ]);
      const correctAnswerIndex = ref(null);
      const router = useRouter();
  
      const submitTriviaQuestion = async () => {
        try {
          if (correctAnswerIndex.value === null) {
            return;
          }
          const payload = {
            category_id: selectedCategory.value,
            question_text: questionText.value,
            answers: answers.value.map((answer, index) => ({
              text: answer.text,
              is_correct: index === correctAnswerIndex.value,
            })),
          };
  
          await createTriviaQuestion(payload);
          createAnother.value = true;  // Set createAnother to true when submission is successful
  
        } catch (error) {
          console.error('Error submitting trivia question:', error);
        }
      };
  
      const resetTriviaForm = () => {
        // Reset form
        selectedCategory.value = null;
        questionText.value = '';
        answers.value = [{ text: '' }, { text: '' }, { text: '' }, { text: '' }];
        correctAnswerIndex.value = null;
        createAnother.value = false; // Reset createAnother back to false
      };
  
      const playTriviaGame = () => {
        router.push({name: 'Trivia'})
    };
  
      return {
        categories,
        selectedCategory,
        questionText,
        answers,
        correctAnswerIndex,
        createAnother,
        submitTriviaQuestion,
        resetTriviaForm,
        playTriviaGame,
      };
    }
  }
  </script>
  
  <style scoped>
  .triviaForm {
    max-width: 600px;
    margin: 30px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
  }
  
  h2 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #555;
  }
  
  input[type="text"] {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  
  .answer-group {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .answer-group input[type="text"] {
    flex: 1;
  }
  
  .answer-group input[type="radio"] {
    margin-left: 10px;
  }
  
  .submit-button {
    width: 100%;
    padding: 10px;
    font-size: 18px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .submit-button:hover {
    background-color: #45a049;
  }
  
  .create-another {
    text-align: center;
    font-size: 14px;
    margin-top: 15px;
    color: #777;
  }
  
  .action-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .action-buttons button {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 0 5px;
  }
  
  .action-buttons button:hover {
    background-color: #0056b3;
  }
  </style>