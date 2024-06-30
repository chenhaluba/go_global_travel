const API_URL = 'http://127.0.0.1:8000/';

async function fetchJobsHistory() {
  try {
    const response = await fetch(`${API_URL}jobs_history`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
}

async function getHistoryByJobID(id) {
  try {
    const response = await fetch(`${API_URL}jobs_history/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}

export default {
  fetchJobsHistory,
  getHistoryByJobID
};
