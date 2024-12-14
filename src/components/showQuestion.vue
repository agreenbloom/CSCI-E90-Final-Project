<template>
    <div>
      <h2>Question:  {{ question.question_text }}</h2>
      <ul>
        <li v-for="(answer, index) in question.answers" :key="index">
          <button @click="checkAnswer(question.question_id, answer)">
            {{ answer.answer_text }}
          </button>
        </li>
      </ul>
      <div v-if="selectedAnswerFeedback">
        {{ selectedAnswerFeedback }}
      </div>
    </div>
  </template>
  
  <script>
  import { submitTriviaAnswer } from "../services/api";
  export default {
    props: {
      question: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        selectedAnswer: null,
        selectedAnswerFeedback: null,
      };
    },
    methods: {
      async checkAnswer( questionID, selectedAnswer) {
      // Check if the clicked answer is correct

        if (selectedAnswer.is_correct) {
          this.selectedAnswerFeedback = "Correct answer!";
        } else {
          this.selectedAnswerFeedback = "Wrong answer. Try again!";
        }
        const scoreData = {
          question_id: questionID,
          answer_id: selectedAnswer.answer_id,
          is_correct: selectedAnswer.is_correct
        }
       
        try {
          
          const response = await submitTriviaAnswer(scoreData);
          this.responseMessage = `Success: ${response.data.message}`;
        } catch (error) {
          console.error("Error updating score:", error);
          this.responseMessage =
            error.response?.data?.message ||  "Failed to update score. Please try again.";
        }
      },
      
    },
  };
  </script>
  