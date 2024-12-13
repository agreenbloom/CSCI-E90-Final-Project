import axios from 'axios';
import { getIdToken } from './auth'; // Import the function to get the JWT token

const { v4: uuidv4 } = require('uuid'); // Import uuid library

// Example of generating a session ID
function generateSessionId() {
  return uuidv4(); // Generates a unique session ID
}
// Base URL of your API Gateway or backend
const API_BASE_URL = 'https://7bgydjo949.execute-api.us-east-1.amazonaws.com/production/questions?';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add the JWT token to the request headers
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await getIdToken(); // Get the token asynchronously
      config.headers['Authorization'] = `Bearer ${token}`; // Add token to the Authorization header
    } catch (error) {
      console.error('Error getting the token', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to make a GET request
export async function getTriviaQuestions(categoryId) {
    try {
      const response = await apiClient.get(`/questions?category_id=${categoryId}`);
      const results = JSON.parse(response.data.body); // Assuming the response body is JSON formatted like { body: '{"results": [...]}' }
      return results.results;
    } catch (error) {
      console.error('Error fetching trivia questions', error);
      throw error;
    }
  }
// Function to make a POST request
export async function submitTriviaAnswer(answerData) {
  try {
    const response = await apiClient.post('/submit-answer', answerData);
    return response.data;
  } catch (error) {
    console.error('Error submitting trivia answer', error);
    throw error;
  }
}

export async function createQuizSession(data) {
    try {
      const response = await axios.post(`${API_BASE_URL}/startQuiz`, data);
      const sessionId = generateSessionId(); // Implement logic to generate a unique session ID
      response.join({sessionId})
      return response.data; // { sessionId: 'xxx' }
    } catch (error) {
      console.error('Error creating quiz session:', error);
      throw error;
    }
  }
  
  // Function for quiz users to join a session
  export async function joinQuizSession(sessionId, username) {
    try {
      const response = await axios.post(`${API_BASE_URL}/join-session/${sessionId}`, { username });
      return response.data; // { userId, sessionId }
    } catch (error) {
      console.error('Error joining quiz session:', error);
      throw error;
    }
  }