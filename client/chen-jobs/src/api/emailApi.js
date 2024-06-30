const API_URL = 'http://127.0.0.1:8000/';

async function sendEmail(emailData) {
  try {
    const response = await fetch(`${API_URL}send-email`, {
        method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(emailData)
    })
    if (response.ok) {
        alert('Email sent successfully!');
    } else {
        const error = await response.json();
        alert(`Failed to send email: ${error.detail}`);
    }
} catch (error) {
    console.error('Error sending email:', error);
    alert('Failed to send email. Please try again later.');
}
}


export default {sendEmail};
