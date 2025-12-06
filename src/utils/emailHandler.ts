interface EmailData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

// Get the API base URL
// In development with Netlify dev, use relative URL (same origin)
// In production, use relative URL (same origin) or set VITE_API_URL if needed
const getApiBaseUrl = () => {
  // Use relative URL - works in both dev (Netlify dev server) and production
  // Netlify dev server proxies everything, so relative URLs work perfectly
  return '';
};

export const sendContactEmail = async (emailData: EmailData) => {
  try {
    const apiUrl = `${getApiBaseUrl()}/api/sendEmail`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Email failed:', result);
      return { success: false, error: result.error || 'Failed to send email' };
    }

    console.log('Email sent successfully:', result.data);
    return { success: true, data: result.data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};
