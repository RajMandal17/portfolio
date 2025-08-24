declare global {
  interface Window {
    emailjs: any;
  }
}

// EmailJS configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'default_service';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'default_template';
const EMAILJS_USER_ID = import.meta.env.VITE_EMAILJS_USER_ID || 'default_user';

interface EmailParams {
  to_name: string;
  from_name: string;
  from_email: string;
  message: string;
}

export async function sendEmail(params: EmailParams): Promise<void> {
  // Initialize EmailJS if not already done
  if (window.emailjs && !window.emailjs._initialized) {
    window.emailjs.init(EMAILJS_USER_ID);
    window.emailjs._initialized = true;
  }
  
  try {
    if (!window.emailjs) {
      throw new Error('EmailJS not loaded');
    }
    
    const response = await window.emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_name: params.to_name,
        from_name: params.from_name,
        from_email: params.from_email,
        message: params.message,
        reply_to: params.from_email,
      }
    );
    
    if (response.status !== 200) {
      throw new Error(`EmailJS error: ${response.text}`);
    }
    
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email. Please try contacting me directly.');
  }
}
