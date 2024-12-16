import axios from 'axios';


// Base URL of your API Gateway or backend
const API_BASE_URL = 'https://7bgydjo949.execute-api.us-east-1.amazonaws.com/production';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add the JWT token to the request headers
// apiClient.interceptors.request.use(
//   async (config) => {
//     try {
//       const token = await getIdToken(); // Get the token asynchronously
//       config.headers['Authorization'] = `Bearer ${token}`; // Add the token to the Authorization header
//     } catch (error) {
//       const guestToken = await getGuestToken();
//       config.headers['Authorization'] = `Bearer ${guestToken}`; // Use the guest token if idToken fails
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Function to make a GET request
// export async function getTriviaQuestions(categoryId) {
//     try {
//       const response = await apiClient.get(`questions?category_id=${categoryId}`);
//       const results = JSON.parse(response.data.body); // Assuming the response body is JSON formatted like { body: '{"results": [...]}' }
//       return results.results;
//     } catch (error) {
//       console.error('Error fetching trivia questions', error);
//       throw error;
//     }
//   }
