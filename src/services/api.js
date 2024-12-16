import axios from 'axios';


// Base URL of>> found in AWS API GATEWAY > Stage > Stage name > copy Invoke URL
const API_BASE_URL = 'ADD YOUR API';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});



// Function to make a GET request
export async function getTriviaQuestions(categoryId) {
  // update get request with the URL created in API GATEWSAY
    try {
      const response = await apiClient.get(`UPDATEHERE?category_id=${categoryId}`);
      const results = JSON.parse(response.data.body); // Assuming the response body is JSON formatted like { body: '{"results": [...]}' }
      return results.results;
    } catch (error) {
      console.error('Error fetching trivia questions', error);
      throw error;
    }
  }

