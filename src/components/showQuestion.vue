<template>
    <div>
      <h2>Question:  {{ question.question_text }}</h2>
      <ul>
        <li v-for="(answer, index) in question.answers" :key="index">
          <button @click="checkAnswer(answer)">
            {{ answer.answer_text }}
          </button>
        </li>
      </ul>
      
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
        selectedAnswerFeedback: null,
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
      checkAnswer( selectedAnswer) {
      // Check if the clicked answer is correct
      console.log(selectedAnswer)
        if (selectedAnswer.is_correct) {
          console.log("correct")
          this.selectedAnswerFeedback = "Correct answer!";
        } else {
          this.selectedAnswerFeedback = "Wrong answer. Try again!";
        }
      },
    },
  };
  </script>
  