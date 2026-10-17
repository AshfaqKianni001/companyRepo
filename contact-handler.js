const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwa4HNA4VWzR5-C8IlU4JfFrkYNXLw0m3QuAjhnFWVSJFcku8axklcWawCRAhRCINxhag/exec';

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formStatus.textContent = 'Sending...';
    formStatus.style.color = 'var(--sage)';

    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      subject: document.getElementById('subject').value.trim(),
      message: document.getElementById('message').value.trim()
    };

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      formStatus.textContent = 'Message sent successfully! We will contact you soon.';
      formStatus.style.color = 'var(--led)';
      contactForm.reset();
    } catch (error) {
      formStatus.textContent = 'Submission failed. Please try again or contact us directly.';
      formStatus.style.color = '#e06c75';
      console.error('Contact error:', error);
    }
  });
}
