// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
	hamburger.addEventListener('click', () => {
		navMenu.classList.toggle('active');
	});

	// Close menu on link click (mobile)
	navMenu.querySelectorAll('a').forEach(link => {
		link.addEventListener('click', () => navMenu.classList.remove('active'));
	});
}

// Smooth scroll for internal links (fallback for browsers without CSS smooth scroll)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		const targetId = this.getAttribute('href');
		if (!targetId || targetId === '#') return;
		const target = document.querySelector(targetId);
		if (!target) return;
		e.preventDefault();
		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
	});
});

// Basic form handling (no backend; prevents default and gives lightweight feedback)
const contactForm = document.querySelector('#contact form');
if (contactForm) {
	contactForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const submitButton = contactForm.querySelector('button[type="submit"]');
		const originalText = submitButton ? submitButton.textContent : '';
		if (submitButton) {
			submitButton.disabled = true;
			submitButton.textContent = 'Sending...';
		}

		setTimeout(() => {
			alert('Thanks! Your message has been captured locally. Connect a backend to send.');
			contactForm.reset();
			if (submitButton) {
				submitButton.disabled = false;
				submitButton.textContent = originalText || 'Send Message';
			}
		}, 800);
	});
}


