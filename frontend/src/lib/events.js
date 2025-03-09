// Update your lib/events.js with these functions
async function fetchDUSAEvents() {
    try {
      const res = await fetch('http://localhost:5000/api/DUSAevents');
      return await res.json();
    } catch (error) {
      console.error('DUSA events fetch failed:', error);
      return [];
    }
  }
  
  async function fetchUniversityEvents() {
    try {
      const res = await fetch('http://localhost:5000/api/dundeeevents');
      return await res.json();
    } catch (error) {
      console.error('University events fetch failed:', error);
      return [];
    }
  }
  export { fetchDUSAEvents, fetchUniversityEvents };