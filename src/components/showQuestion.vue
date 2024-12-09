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
      <div v-if="selectedAnswerFeedback">
        {{ selectedAnswerFeedback }}
      </div>
      <!-- <div v-if="selectedAnswer.is_correct" class="feedback-box">
            {{ selectedAnswerFeedback }}
      </div> -->
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
      };
    },
    methods: {
      checkAnswer( selectedAnswer) {
      // Check if the clicked answer is correct
      // console.log('before ', this.selectedAnswerFeedback)

        if (selectedAnswer.is_correct) {
          this.selectedAnswerFeedback = "Correct answer!";
        } else {
          this.selectedAnswerFeedback = "Wrong answer. Try again!";
        }
        console.log('after',this.selectedAnswerFeedback)
      },
    },
  };
  </script>
  