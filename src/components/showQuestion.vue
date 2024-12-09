<template>
    <div>
      <h2>Question:  {{ question.question_text }}</h2>
     
  
      <!-- <div v-if="showFeedback" class="feedback">
        <p v-if="selectedAnswer === question.correctAnswer" class="correct-feedback">Correct!</p>
        <p v-else class="wrong-feedback">Wrong! The correct answer is {{ question.correctAnswer }}.</p>
      </div>
   -->
      <!-- <button v-if="showFeedback" @click="nextQuestion">Next Question</button>  -->
    </div>
  </template>
  
  <script>
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
        showFeedback: false,
      };
    },
    methods: {
      selectAnswer(answer) {
        if (!this.showFeedback) {
          this.selectedAnswer = answer;
          this.showFeedback = true;
        }
      },
    },
  };
  </script>
  