// Hamburger Menu Toggle
function toggleMenu() {
    document.getElementById('menu').classList.toggle('active');
    document.getElementById('menu-overlay').classList.toggle('active');
}

// Create bubbles dynamically
function createBubbles() {
    const bubblesContainer = document.querySelector('.bubbles');
    for (let i = 0; i < 20; i++) {
        const size = Math.random() * 60 + 20;
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${Math.random() * 10 + 10}s`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        bubblesContainer.appendChild(bubble);
    }
}

// Initialize animations and 3D effects
window.onload = function () {
    createBubbles();

    // Rotate cards on scroll
    const cards = document.querySelectorAll('.day-card');
    window.addEventListener('scroll', function () {
        cards.forEach(card => {
            const cardPos = card.getBoundingClientRect();
            const screenHeight = window.innerHeight;
            if (cardPos.top < screenHeight && cardPos.bottom > 0) {
                const scrollPercent = (cardPos.top + cardPos.height / 2) / screenHeight;
                const rotateY = (0.5 - scrollPercent) * 20;
                card.style.transform = `perspective(1000px) rotateY(${rotateY}deg)`;
            }
        });
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                // Close menu if open
                document.getElementById('menu').classList.remove('active');
                document.getElementById('menu-overlay').classList.remove('active');
            }
        });
    });

    // Animate floating day indicators
    const dayIndicators = document.querySelectorAll('.day-indicator');
    dayIndicators.forEach((indicator, index) => {
        indicator.style.animationDelay = `${index * 0.5}s`;
    });

    // 3D effect for spline object
    const splineObject = document.querySelector('.spline-object');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;

        splineObject.style.transform = `translate(-50%, -50%) rotateY(${x * 30}deg) rotateX(${-y * 30}deg)`;
    });

    // Day cards carousel auto-scroll
    const carousel = document.querySelector('.days-carousel');
    let scrollPosition = 0;
    let scrollDirection = 1;
    const autoScroll = setInterval(() => {
        if (scrollPosition >= carousel.scrollWidth - carousel.clientWidth) {
            scrollDirection = -1;
        } else if (scrollPosition <= 0) {
            scrollDirection = 1;
        }
        scrollPosition += scrollDirection * 2;
        carousel.scrollLeft = scrollPosition;
    }, 50);

    // Stop auto-scroll on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoScroll);
    });

    setupSponsorScroll();
};

document.addEventListener('mousemove', (e) => {
    const cursorEffect = document.querySelector('.cursor-effect');
    if (cursorEffect) {
        cursorEffect.style.setProperty('--cursor-x', e.clientX + 'px');
        cursorEffect.style.setProperty('--cursor-y', e.clientY + 'px');
    }
});

// Add touch support for mobile devices
document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const cursorEffect = document.querySelector('.cursor-effect');
    if (cursorEffect) {
        cursorEffect.style.setProperty('--cursor-x', touch.clientX + 'px');
        cursorEffect.style.setProperty('--cursor-y', touch.clientY + 'px');
    }
});


const modal = document.getElementById('mapModal');
const mapLinks = document.querySelectorAll('a[data-toggle="modal"]');
const closeBtn = document.querySelector('.close-modal');

mapLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Add this function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const buffer = 100; // Add buffer zone for smoother animations
    return (
        rect.top <= (window.innerHeight + buffer) &&
        rect.bottom >= -buffer &&
        rect.left <= (window.innerWidth + buffer) &&
        rect.right >= -buffer
    );
}

function animateCards() {
    const cards = document.querySelectorAll('.event-card');

    cards.forEach((card, index) => {
        if (isInViewport(card)) {
            // Add delay based on index
            setTimeout(() => {
                card.classList.add('animate');
            }, index * 150);
        } else {
            // Reset animation when card is out of view
            card.classList.remove('animate');
        }
    });
}

// Use throttle to improve scroll performance
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Update event listeners with throttled function
window.addEventListener('scroll', throttle(animateCards, 100));
window.addEventListener('load', animateCards);

// Clone sponsor cards for smooth infinite scroll
function setupSponsorScroll() {
    const sponsorsGrid = document.querySelector('.sponsors-grid');
    const sponsorCards = document.querySelectorAll('.sponsor-card');

    // Clear existing clones
    sponsorsGrid.innerHTML = '';

    // Add original cards
    sponsorCards.forEach(card => {
        sponsorsGrid.appendChild(card.cloneNode(true));
    });

    // Add clones for smooth infinite scroll
    sponsorCards.forEach(card => {
        const clone = card.cloneNode(true);
        sponsorsGrid.appendChild(clone);
    });

    // Add hover pause functionality
    sponsorsGrid.addEventListener('mouseenter', () => {
        sponsorsGrid.style.animationPlayState = 'paused';
    });

    sponsorsGrid.addEventListener('mouseleave', () => {
        sponsorsGrid.style.animationPlayState = 'running';
    });
}

// Add this script to your script.js file
document.addEventListener('DOMContentLoaded', function () {
    const heroTexts = document.querySelectorAll('.hero-content h1, .hero-content h2, .hero-content p');

    heroTexts.forEach(element => {
        const text = element.textContent;
        element.textContent = '';

        [...text].forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            element.appendChild(span);
        });
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Reduce delay between cards
            const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 50; // Reduced from 100ms
            entry.target.style.transitionDelay = delay + 'ms';
        }
    });
}, observerOptions);

// Add scroll reveal functionality
document.addEventListener('DOMContentLoaded', function () {
    const scrollElements = document.querySelectorAll('.section-title, .event-card, .day-card, .sponsor-card');

    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100))
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 100)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
});
