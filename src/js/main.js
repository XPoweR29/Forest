const navBtn = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.nav--mobile .nav__links');
const mobileMenuLinks = document.querySelectorAll('.nav--mobile .nav__link');
const desktopMenuLinks = document.querySelectorAll('.nav--desktop .nav__link');
const footerYear = document.querySelector('.footer-year');
const sections = document.querySelectorAll('section[id]');
const form = document.querySelector('.contact__form');

const handleNav = () => {
	navBtn.classList.toggle('is-active');
	mobileMenu.classList.toggle('nav__links--active');

	if (mobileMenu.classList.contains('nav__links--active')) {	
		document.body.classList.add('overflow-hidden');
	} else {
		document.body.classList.remove('overflow-hidden');
	}

	navItemAnimation();
};

const navItemAnimation = () => {
	let delayTime = 0;
	mobileMenuLinks.forEach(link => {
		link.classList.toggle('nav-items-animation');
		link.style.animationDelay = `${delayTime}s`
		delayTime+=0.05;
	});
}

const year = new Date().getFullYear();
footerYear.innerText = year;

const scrollSpy = () => {
	sections.forEach(current => {
		const sectionTop = current.offsetTop;
		const sectionHeight = current.offsetHeight;
		const sectionId = current.getAttribute('id');

		if(scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
			for (const link of desktopMenuLinks) {
				link.classList.remove('nav__link--active');
				if(link.getAttribute('data-id') === sectionId) {
					link.classList.add('nav__link--active');
				}
			}
		} else if (scrollY < sectionTop && sectionId === 'about-us') {
			desktopMenuLinks.forEach(link => link.classList.remove('nav__link--active'));
			document.querySelector('[data-id="home"]').classList.add('nav__link--active');
		}
	});
}

const linkHighlight = () => {
	if(window.location.pathname === '/contact.html') {
		document.querySelector('[data-id="contact"]').classList.add('nav__link--active');
	} else if (window.location.pathname === '/offers.html') {
		document.querySelector('[data-id="offer"]').classList.add('nav__link--active');
	}
}

const handleSendForm = (e) => {
	e.preventDefault();
	const inputs = document.querySelectorAll('input, textarea');
	for (const input of inputs) {
		if (input.value.trim() === '') {
			document.querySelector('.contact__form-warn').classList.add('contact__form-warn--active');
			return;
		} else {
			document.querySelector('.contact__form-warn').classList.remove('contact__form-warn--active');

		}
	}
}

linkHighlight();

mobileMenuLinks.forEach(link => link.addEventListener('click', handleNav));
navBtn.addEventListener('click', handleNav);
form.addEventListener('submit', handleSendForm);
window.addEventListener('scroll', scrollSpy);
window.addEventListener('DOMContentLoaded', scrollSpy);
