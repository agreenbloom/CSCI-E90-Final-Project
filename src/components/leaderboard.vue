<template>
  <div>
    <h2>Leaderboard</h2>
    <ul>
      <li v-for="user in scores" :key="user.userId">
        {{ user.userId }}: {{ user.score }}
      </li>
    </ul>
  </div>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify';
import { listUserScores } from '@/graphql/queries';
import { onScoreUpdate } from '@/graphql/subscriptions';

export default {
  data() {
    return {
      scores: [],
    };
  },
  async created() {
    await this.fetchScores();
    this.subscribeToScoreUpdates();
  },
  methods: {
    async fetchScores() {
      const result = await API.graphql(graphqlOperation(listUserScores));
      this.scores = result.data.listUserScores;
    },
    subscribeToScoreUpdates() {
      API.graphql(graphqlOperation(onScoreUpdate, { userId: "ALL" }))
        .subscribe({
          next: (eventData) => {
            const updatedScore = eventData.value.data.onScoreUpdate;
            const index = this.scores.findIndex(
              (u) => u.userId === updatedScore.userId
            );
            if (index >= 0) {
              this.$set(this.scores, index, updatedScore);
            } else {
              this.scores.push(updatedScore);
            }
          },
        });
    },
  },
};
</script>
