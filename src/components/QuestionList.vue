<template>
    <div>
      <h2>Available Questions</h2>
      <ul>
        <li v-for="q in questions" :key="q.id">
          {{ q.question }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { API, graphqlOperation } from 'aws-amplify';
  import { listQuestions } from '@/graphql/queries';
  import { onNewQuestion } from '@/graphql/subscriptions';
  
  export default {
    data() {
      return {
        questions: [],
      };
    },
    async created() {
      await this.fetchQuestions();
      this.subscribeToNewQuestions();
    },
    methods: {
      async fetchQuestions() {
        const result = await API.graphql(graphqlOperation(listQuestions));
        this.questions = result.data.listQuestions;
      },
      subscribeToNewQuestions() {
        API.graphql(graphqlOperation(onNewQuestion))
          .subscribe({
            next: (eventData) => {
              const newQuestion = eventData.value.data.onNewQuestion;
              this.questions.push(newQuestion);
            },
          });
      },
    },
  };
  </script>
  