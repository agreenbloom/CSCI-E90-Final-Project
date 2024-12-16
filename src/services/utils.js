const { v4: uuidv4 } = require('uuid'); // Import uuid library
import { ref } from 'vue';


// utils.js
export function generateGuestId() {
    return 'guest_' + Math.random().toString(36).substr(2, 9);
  }
  
  // Store the guest ID in localStorage if it doesn't exist
  export function getGuestId() {
    let guestId = localStorage.getItem('guestId');
    if (!guestId) {
      guestId = generateGuestId();
      localStorage.setItem('guestId', guestId);
    }
    return guestId;
  }
  
  export function generateSessionId() {
    return uuidv4(); // Generates a unique session ID
  }

// Define the categories and export them
export const categories = ref([
  { id: 1, name: 'Books' },
  { id: 2, name: 'Sports' },
  { id: 3, name: 'Computers' },
  { id: 4, name: 'Film' },
  { id: 5, name: 'History' },
  { id: 6, name: 'Cartoons' },
  { id: 7, name: 'Geography' },
  { id: 8, name: 'Television' },
  { id: 9, name: 'Video Games' },
  { id: 10, name: 'Vehicles' },
  { id: 11, name: 'Music' },
  { id: 12, name: 'Mathematics' },
  { id: 13, name: 'Nature' },
  { id: 14, name: 'Animals' },
  { id: 15, name: 'Comics' },
  { id: 16, name: 'Manga' },
  { id: 17, name: 'General Knowledge' },
  { id: 18, name: 'Board Games' },
]);