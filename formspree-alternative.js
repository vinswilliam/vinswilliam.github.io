// Alternative contact form implementation using Formspree
// Replace the initContactForm function with this if you prefer Formspree

function initContactFormFormspree() {
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formEntries = Object.fromEntries(formData);
    
    // Basic validation
    if (!formEntries.name || !formEntries.email || !formEntries.message) {
      showNotification('Please fill in all fields', 'error');
      return;
    }
    
    if (!isValidEmail(formEntries.email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
      // Send to Formspree endpoint
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
      } else {
        throw new Error('Network response was not ok');
      }
      
    } catch (error) {
      console.error('Form submission failed:', error);
      showNotification('Failed to send message. Please try again or contact me directly.', 'error');
    } finally {
      // Reset button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// To use Formspree instead of EmailJS:
// 1. Go to https://formspree.io/
// 2. Create a free account
// 3. Create a new form
// 4. Replace YOUR_FORM_ID with your actual form ID
// 5. Replace initContactForm() with initContactFormFormspree() in the init() function
