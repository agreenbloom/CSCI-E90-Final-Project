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
  