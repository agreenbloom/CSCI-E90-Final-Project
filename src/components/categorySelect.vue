<template>
  <div>
    <label for="category">Select a category:</label>
    <select id="category" v-model="selectedCategory">
      <option v-for="category in categories" :key="category.id" :value="category.id">
        {{ category.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: {
    modelValue: { // This is the value for v-model in Vue 3
      type: [String, Number],
      default: null,
    },
    categories: { // List of categories passed from parent
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedCategory: this.modelValue, // Bind selected category to the v-model value
    };
  },
  watch: {
    selectedCategory(newValue) {
      this.$emit('update:modelValue', newValue); // Emit updated category ID to parent using correct event name
    },
  },
};
</script>

<style scoped>
/* Add any styles you need */
</style>
