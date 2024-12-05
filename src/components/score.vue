<template>
  <div>
    <h2>Your Score: {{ score }}</h2>
  </div>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify';
import { getUserScore } from '@/graphql/queries';
import { onScoreUpdate } from '@/graphql/subscriptions';

export default {
  data() {
    return {
      score: 0,
    };
  },
  async created() {
    await this.fetchScore();
    this.subscribeToScoreUpdates();
  },
  methods: {
    async fetchScore() {
      const userId = this.$store.state.user.id; // Assuming using Vuex for state management
      const result = await API.graphql(
        graphqlOperation(getUserScore, { userId })
      );
      this.score = result.data.getUserScore.score;
    },
    subscribeToScoreUpdates() {
      const userId = this.$store.state.user.id;
      API.graphql(
        graphqlOperation(onScoreUpdate, { userId })
      ).subscribe({
        next: (eventData) => {
          this.score = eventData.value.data.onScoreUpdate.score;
        },
      });
    },
  },
};
</script>
