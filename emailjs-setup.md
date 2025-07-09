# EmailJS Setup Guide

To make the contact form functional, you need to set up EmailJS. Follow these steps:

## 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

## 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and note down your **Template ID**

## 4. Get Your Public Key
1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** (also called User ID)

## 5. Update the Configuration
Replace the placeholders in `src/main.js`:

```javascript
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key

const result = await emailjs.send(
  'YOUR_SERVICE_ID',    // Replace with your service ID
  'YOUR_TEMPLATE_ID',   // Replace with your template ID
  {
    // ... rest of the parameters
  }
);
```

## 6. Test the Form
1. Run your development server
2. Fill out the contact form
3. Check your email for the message
4. Verify the form shows success/error notifications

## Security Notes
- EmailJS handles the email sending securely
- Your email credentials are not exposed in the frontend code
- The service has rate limiting to prevent spam
- Consider adding a reCAPTCHA for additional protection

## Alternative: Formspree
If you prefer a simpler solution, you can use Formspree:
1. Go to [Formspree.io](https://formspree.io/)
2. Create a form endpoint
3. Update the form action to point to your Formspree endpoint

Let me know if you need help with any of these steps!
