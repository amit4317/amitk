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

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

function initTheme() {
	const saved = localStorage.getItem('theme');
	const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
	const theme = saved || (prefersLight ? 'light' : 'dark');
	html.setAttribute('data-theme', theme);
	updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
	if (!themeToggle) return;
	const icon = themeToggle.querySelector('i');
	if (!icon) return;
	icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

if (themeToggle) {
	themeToggle.addEventListener('click', () => {
		const current = html.getAttribute('data-theme');
		const next = current === 'light' ? 'dark' : 'light';
		html.setAttribute('data-theme', next);
		localStorage.setItem('theme', next);
		updateThemeIcon(next);
	});
}

initTheme();

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

// FAQ Accordion enhancements
document.querySelectorAll('.faq-item').forEach(item => {
	item.addEventListener('toggle', () => {
		// Close other open items (optional: accordion behavior)
		// Uncomment below for single-open accordion:
		// document.querySelectorAll('.faq-item[open]').forEach(openItem => {
		//     if (openItem !== item) openItem.open = false;
		// });
	});
});

// Keyboard support for FAQ items
document.querySelectorAll('.faq-item summary').forEach(summary => {
	summary.addEventListener('keydown', (e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			summary.click();
		}
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


