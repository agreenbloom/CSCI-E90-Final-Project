<template>
  <div class="category-select-div">
    <label for="category" class="category-label">Select a category:</label>
    <select id="category" v-model="selectedCategory" class="category-dropdown">
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
    modelValue: {
      type: [String, Number],
      default: null,
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedCategory: this.modelValue,
    };
  },
  watch: {
    selectedCategory(newValue) {
      this.$emit('update:modelValue', newValue);
    },
  },
};
</script>

<style scoped>
.category-select-div {
  max-width: 300px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
  color: #333;
}

.category-label {
  display: inline-block;
  font-size: 16px;
  margin-bottom: 8px;
  text-align: center;
}

.category-dropdown {
  display: inline-block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.category-dropdown:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>