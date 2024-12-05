<template>
    <div>
      <h2>Add a New Question</h2>
      <form @submit.prevent="submitQuestion">
        <div>
          <label>Question:</label>
          <input v-model="question" required />
        </div>
        <div>
          <label>Answer:</label>
          <input v-model="answer" required />
        </div>
        <div>
          <label>Choices (comma separated):</label>
          <input v-model="choicesInput" required />
        </div>
        <button type="submit">Add Question</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import { API, graphqlOperation } from 'aws-amplify';
  import { addQuestion as addQuestionMutation } from '@/graphql/mutations';
  
  export default {
    data() {
      return {
        question: '',
        answer: '',
        choicesInput: '',
        message: '',
      };
    },
    methods: {
      async submitQuestion() {
        const choices = this.choicesInput.split(',').map((c) => c.trim());
        try {
          await API.graphql(
            graphqlOperation(addQuestionMutation, {
              question: this.question,
              answer: this.answer,
              choices,
            })
          );
          this.message = 'Question added successfully!';
          this.question = '';
          this.answer = '';
          this.choicesInput = '';
        } catch (error) {
          console.error('Error adding question:', error);
          this.message = 'Failed to add question.';
        }
      },
    },
  };
  </script>
  