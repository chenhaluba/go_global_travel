const API_URL = 'http://127.0.0.1:8000/';

async function fetchJobs() {
  try {
    const response = await fetch(`${API_URL}jobs_and_comments`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
}

async function getCommentsByJobID(id) {
  try {
    const response = await fetch(`${API_URL}comments/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}

async function addJob(job) {
  try {
    const response = await fetch(`${API_URL}add_job`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding job:', error);
    throw error;
  }
}

async function updateJob(job,commentsByID, id) {
  try {
    const response = await fetch(`${API_URL}update_job/${id}/${commentsByID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
}

async function updateCommentJob(comment, id) {
  try {
    const response = await fetch(`${API_URL}update_comments_job/${id}?comment_job=${comment}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating comment job:', error);
    throw error;
  }
}

async function deleteJob(id) {
  try {
    const response = await fetch(`${API_URL}delete_job_and_comments/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    } 
    return await response.json();

  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
}

export default {
  fetchJobs,
  getCommentsByJobID,
  addJob,
  updateJob,
  updateCommentJob,
  deleteJob
};
