import axios from 'axios';
import { getIdToken, getGuestCredentials, getCognitoUser } from './auth'; // Import the function to get the JWT token
import { getGuestId } from './utils';
import { config } from 'aws-sdk';

const { v4: uuidv4 } = require('uuid'); // Import uuid library

// Example of generating a session ID
function generateSessionId() {
  return uuidv4(); // Generates a unique session ID
}
// Base URL of your API Gateway or backend
const API_BASE_URL = 'https://7bgydjo949.execute-api.us-east-1.amazonaws.com/production';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

 async function getGuestToken() {
  const guestCredentials = await getGuestCredentials();
  console.log('guestCredentials', guestCredentials)
  return guestCredentials.IdentityId;  // Use the IdentityId as the token for guest users
}

export function confirmUserSignUp(username, confirmationCode) {
  const user = getCognitoUser(username);

  return new Promise((resolve, reject) => {
    user.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

// Add the JWT token to the request headers
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await getIdToken(); // Get the token asynchronously
      console.log('Token being sent:', token);
      config.headers['Authorization'] = `Bearer ${token}`; // Add the token to the Authorization header
    } catch (error) {
      console.error('Error getting the token', error);
      const guestToken = await getGuestToken();
      console.log('Using guest token:', guestToken);
      config.headers['Authorization'] = `Bearer ${guestToken}`; // Use the guest token if idToken fails
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
      const response = await apiClient.get(`questions?category_id=${categoryId}`);
      console.log('response', response)
      const results = JSON.parse(response.data.body); // Assuming the response body is JSON formatted like { body: '{"results": [...]}' }
      return results.results;
    } catch (error) {
      console.error('Error fetching trivia questions', error);
      throw error;
    }
  }
// Function to make a POST request
export async function submitTriviaAnswer(answerData) {
  console.log('here>>???')
  try {
    console.log('config', config)
    const response = await apiClient.post('/scores', answerData);
    return response.data;
  } catch (error) {
    console.log("confid >>", config)
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
  export async function joinQuizSession(sessionId) {
    try {
      const guestId = getGuestId(); // Retrieve guest ID for guest users
      const response = await apiClient.post(`${API_BASE_URL}/join-session/${sessionId}`, { guestId });
      return response.data; // { userId, sessionId }
    } catch (error) {
      console.error('Error joining quiz session:', error);
      throw error;
    }
  }