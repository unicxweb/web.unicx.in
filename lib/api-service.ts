interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  details: string;
}

interface ContactApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Helper function to split name into first and last name
function splitName(fullName: string): { first_name: string; last_name: string } {
  const parts = fullName.trim().split(' ');
  const first_name = parts[0] || '';
  const last_name = parts.slice(1).join(' ') || '';
  return { first_name, last_name };
}

export async function submitContactForm(formData: ContactFormData): Promise<ContactApiResponse> {
  const apiUrl = 'https://backend-auth-production-f56c.up.railway.app/api/v1/category/add-contactus';
  
  try {
    // Split name into first and last name
    const { first_name, last_name } = splitName(formData.name);
    
    // Create comprehensive message
    const message = [
      `Service: ${formData.service}`,
      `Budget: ${formData.budget}`,
      `Timeline: ${formData.timeline || 'Not specified'}`,
      `Project Details: ${formData.details}`
    ].join(', ');

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        expertName: formData.service, // Selected service as expertName
        first_name: first_name,
        last_name: last_name,
        contact_name: formData.company || formData.name, // Company if available, otherwise name
        email: formData.email,
        phone: formData.phone,
        message: message,
        buttonId: 13, // Required button ID
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      message: 'Contact form submitted successfully!',
      data: data
    };
    
  } catch (error) {
    console.error('Contact form submission error:', error);
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to submit contact form'
    };
  }
}
