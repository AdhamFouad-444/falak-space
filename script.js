/* ============================================
   FALAk - Space Education Platform
   Premium Interactive JavaScript
   ============================================ */

// Throttling utility
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

// ============================================
// Enhanced Starfield with Nebula Effect
// ============================================
class CosmicStarfield {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d', { alpha: false }); // Optimize for non-transparent canvas if possible, but we layer it.
        this.stars = [];
        this.shootingStars = [];
        this.nebulaClouds = [];
        this.mouse = { x: 0, y: 0 };
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.resize();
        this.createStars();
        this.createNebulaClouds();
        this.animate();

        // Optimized Resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.resize(), 200);
        });

        // Throttled Mouse Tracking
        window.addEventListener('mousemove', throttle((e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        }, 50));
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.createStars();
    }

    createStars() {
        this.stars = [];
        // Reduced density for performance (was /5000)
        const numStars = Math.floor((this.width * this.height) / 10000);

        for (let i = 0; i < numStars; i++) {
            this.stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: Math.random() * 1.5, // Slightly smaller
                baseOpacity: Math.random() * 0.8 + 0.2,
                twinkleSpeed: Math.random() * 0.02 + 0.005,
                phase: Math.random() * Math.PI * 2,
                color: this.getStarColor()
            });
        }
    }

    getStarColor() {
        // Pre-calculated RGB strings
        const colors = [
            '255, 255, 255',
            '200, 220, 255',
            '255, 240, 220',
            '0, 212, 255'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    createNebulaClouds() {
        this.nebulaClouds = [];
        // Reduced clouds
        for (let i = 0; i < 2; i++) {
            this.nebulaClouds.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: Math.random() * 200 + 100,
                color: i === 0 ? '0, 212, 255' : '124, 58, 237',
                phase: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.003 + 0.001
            });
        }
    }

    drawStar(star, time) {
        // Simplified opacity calcs
        const twinkle = Math.sin(time * star.twinkleSpeed + star.phase);
        const opacity = star.baseOpacity * (0.6 + 0.4 * twinkle);

        // Very simplified mouse interaction check
        // Only calculate distance if close (taxicab metric for speed approximation)
        let mouseGlow = 0;
        if (Math.abs(this.mouse.x - star.x) < 200 && Math.abs(this.mouse.y - star.y) < 200) {
            const dx = this.mouse.x - star.x;
            const dy = this.mouse.y - star.y;
            // Only do sqrt if within box
            const distance = Math.sqrt(dx * dx + dy * dy);
            mouseGlow = Math.max(0, 1 - distance / 200);
        }

        const finalOpacity = Math.min(1, opacity + mouseGlow * 0.3);

        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.radius * (1 + mouseGlow * 0.3), 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${star.color}, ${finalOpacity})`;
        this.ctx.fill();

        // Removed expensive gradient glow for every star
    }

    drawNebula(cloud, time) {
        cloud.phase += cloud.speed;
        // Draw simplified nebula
        this.ctx.beginPath();
        this.ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${cloud.color}, 0.015)`; // Constant low opacity, no gradient update per frame
        this.ctx.fill();
    }

    animate(time = 0) {
        // Clear with fillRect for efficiency instead of clearRect if opaque background, 
        // but here we need transparency possibly? No, body is black.
        // Using clearRect is fine.
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Batch drawing could be optimized but keep logic simple for now
        this.nebulaClouds.forEach(cloud => this.drawNebula(cloud, time));
        this.stars.forEach(star => this.drawStar(star, time));

        /* Shooting stars removed for performance or greatly simplified */

        requestAnimationFrame((t) => this.animate(t));
    }
}

// ============================================
// Navigation
// ============================================
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    let lastScroll = 0;
    // Throttled scroll listener
    window.addEventListener('scroll', throttle(() => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }, 100));

    navToggle?.addEventListener('click', () => {
        navLinks?.classList.toggle('active');
    });

    navLinks?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks?.classList.remove('active');
        });
    });
}

// ============================================
// Smooth Scroll
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('starfield');
    if (canvas) {
        new CosmicStarfield(canvas);
    }

    initNavigation();
    initSmoothScroll();

    // Disable high-cost effects unless requested
    // initMagneticButtons(); // Disabled for performance
    // initCardTilt(); // Disabled for performance
    // initHeroParallax(); // Disabled to reduce scroll jank

    console.log('✦ FALAk initialized (Performance Mode)');
});

