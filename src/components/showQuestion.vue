<template>
  <div class="trivia-container" v-if="!isAnswered">
    <h2 class="question-text">Question: {{ question.question_text }}</h2>
    <ul class="answers-list">
      <li v-for="(answer, index) in question.answers" :key="index">
        <button class="answer-button" @click="checkAnswer(question.question_id, answer)">
          {{ answer.answer_text }}
        </button>
      </li>
    </ul>
    <div v-if="selectedAnswerFeedback" :class="feedbackClass">
      {{ selectedAnswerFeedback }}
      <button class="hideButton" @click="hideAnswer" v-if="isCorrect">Hide Answer</button>
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
      isAnswered: false,
      isCorrect: false,
      feedbackClass: '',
    };
  },
  methods: {
    async checkAnswer(questionID, selectedAnswer) {
      if (selectedAnswer.is_correct) {
        this.selectedAnswerFeedback = "Correct answer!";
        this.feedbackClass = 'feedback-message success';
        this.isCorrect = true;
      } else {
        this.selectedAnswerFeedback = "Wrong answer. Try again!";
        this.feedbackClass = 'feedback-message error';
      }
      const scoreData = {
        question_id: questionID,
        answer_id: selectedAnswer.answer_id,
        is_correct: selectedAnswer.is_correct
      };

      try {
        const response = await submitTriviaAnswer(scoreData);
        this.responseMessage = `Success: ${response.data.message}`;
      } catch (error) {
        console.error("Error updating score:", error);
        this.responseMessage =
          error.response?.data?.message || "Failed to update score. Please try again.";
      }
    },
    hideAnswer() {
      this.isAnswered = true;
    }
  },
};
</script>

<style scoped>
.trivia-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.question-text {
  font-size: 24px;
  margin-bottom: 16px;
}

.answers-list {
  list-style: none;
  padding: 0;
}

.answer-button {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  font-size: 16px;
  background-color: #0177fb;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.answer-button:hover {
  background-color: #005bb5;
}
.feedback-message {
  margin-top: 16px;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.hideButton {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-items: flex-end
}

.feedback-message.success {
  background-color: #d4edda; /* Light green */
  border: 1px solid #c3e6cb;
  color: #155724;
}

.feedback-message.error {
  background-color: #f8d7da; /* Light red */
  border: 1px solid #f5c6cb;
  color: #721c24;
}
</style>