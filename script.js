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
