<template>
    <div>
      <h2>Question:  {{ question.results }}</h2>
      <!-- <ul>
        <li 
          v-for="(answer, index) in question.answers" 
          :key="index" 
          @click="selectAnswer(answer)"
          :class="{'selected': selectedAnswer === answer, 'correct': showFeedback && answer === question.correctAnswer, 'wrong': showFeedback && selectedAnswer === answer && answer !== question.correctAnswer}">
          {{ answer }}
        </li>
      </ul>
  
      <div v-if="showFeedback" class="feedback">
        <p v-if="selectedAnswer === question.correctAnswer" class="correct-feedback">Correct!</p>
        <p v-else class="wrong-feedback">Wrong! The correct answer is {{ question.correctAnswer }}.</p>
      </div>
  
      <button v-if="showFeedback" @click="nextQuestion">Next Question</button> -->
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
  