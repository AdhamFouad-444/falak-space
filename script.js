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
        // Increased density for better blending (was /10000)
        const numStars = Math.floor((this.width * this.height) / 4000);

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

    createShootingStar() {
        // Spawn from top-left or top-right quadrant mostly
        const startX = Math.random() * this.width;
        const startY = Math.random() * (this.height * 0.3); // Top 30%

        // Angle: mostly downwards diagonal
        const angle = Math.PI / 4 + (Math.random() * 0.5 - 0.25);

        this.shootingStars.push({
            x: startX,
            y: startY,
            length: Math.random() * 80 + 20,
            speed: Math.random() * 10 + 10,
            angle: angle,
            opacity: 1,
            life: 1 // Full life
        });
    }

    drawShootingStars() {
        for (let i = this.shootingStars.length - 1; i >= 0; i--) {
            const s = this.shootingStars[i];

            // Update
            s.x += Math.cos(s.angle) * s.speed;
            s.y += Math.sin(s.angle) * s.speed;
            s.life -= 0.02; // Fade out

            // Draw
            if (s.life > 0) {
                const endX = s.x - Math.cos(s.angle) * s.length;
                const endY = s.y - Math.sin(s.angle) * s.length;

                const gradient = this.ctx.createLinearGradient(s.x, s.y, endX, endY);
                gradient.addColorStop(0, `rgba(255, 255, 255, ${s.life})`);
                gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

                this.ctx.beginPath();
                this.ctx.moveTo(s.x, s.y);
                this.ctx.lineTo(endX, endY);
                this.ctx.strokeStyle = gradient;
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
            } else {
                this.shootingStars.splice(i, 1);
            }

            // Remove if out of bounds
            if (s.x > this.width + 100 || s.y > this.height + 100) {
                this.shootingStars.splice(i, 1);
            }
        }
    }

    animate(time = 0) {
        // Clear with fillRect for efficiency instead of clearRect if opaque background
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Batch drawing could be optimized but keep logic simple for now
        this.nebulaClouds.forEach(cloud => this.drawNebula(cloud, time));
        this.stars.forEach(star => this.drawStar(star, time));

        // Randomly spawn shooting stars
        // Chance: 1 in 100 frames (~1.5 per second at 60fps), increased for effect
        if (Math.random() < 0.015) {
            this.createShootingStar();
        }

        this.drawShootingStars();

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
// ============================================
// Particle Logo Reveal
// ============================================
class ParticleLogo {
    constructor(canvasId, imageId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.image = document.getElementById(imageId);
        this.particles = [];
        this.width = 0;
        this.height = 0;

        // Wait for image load
        if (this.image.complete) {
            this.init();
        } else {
            this.image.onload = () => this.init();
        }
    }

    init() {
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        // Draw image effectively to read data
        // We need to scale the image to fit the canvas 
        // Aspect ratio is key
        const aspect = this.image.naturalWidth / this.image.naturalHeight;
        let drawWidth = this.height * aspect;
        let drawHeight = this.height;

        if (drawWidth > this.width) {
            drawWidth = this.width;
            drawHeight = this.width / aspect;
        }

        const startX = (this.width - drawWidth) / 2;
        const startY = (this.height - drawHeight) / 2;

        this.ctx.drawImage(this.image, startX, startY, drawWidth, drawHeight);

        // Get Pixel Data
        const imageData = this.ctx.getImageData(0, 0, this.width, this.height);
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Create Particles
        // Skip pixels for performance (High density caused crash, reducing to 6)
        const density = 6;
        for (let y = 0; y < this.height; y += density) {
            for (let x = 0; x < this.width; x += density) {
                const index = (y * this.width + x) * 4;
                const alpha = imageData.data[index + 3];

                // Filter out dark/black background pixels
                if (alpha > 128 && (imageData.data[index] + imageData.data[index + 1] + imageData.data[index + 2] > 50)) {
                    const r = imageData.data[index];
                    const g = imageData.data[index + 1];
                    const b = imageData.data[index + 2];

                    // Star properties
                    const radius = Math.random() * 1.5 + 0.5;
                    const baseAlpha = Math.random() * 0.5 + 0.5;

                    this.particles.push({
                        x: Math.random() * this.width * 2 - this.width / 2,
                        y: Math.random() * this.height * 2 - this.height / 2,
                        originX: x,
                        originY: y,
                        color: `rgba(${r},${g},${b}`,
                        alpha: baseAlpha,
                        radius: radius,
                        vx: (Math.random() - 0.5) * 2,
                        vy: (Math.random() - 0.5) * 2,
                        ease: Math.random() * 0.15 + 0.08,
                        phase: Math.random() * Math.PI * 2
                    });
                }
            }
        }

        this.animate();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.globalCompositeOperation = 'screen';

        // Removed expensive shadowBlur for performance

        let settled = 0;
        const time = Date.now() * 0.003;

        this.particles.forEach(p => {
            const dx = p.originX - p.x;
            const dy = p.originY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 0.5) {
                p.x = p.originX;
                p.y = p.originY;
                settled++;
            } else {
                p.x += dx * p.ease;
                p.y += dy * p.ease;
            }

            // Simplified drawing
            // Twinkle only if settled to save power during movement? 
            // Actually, remove twinkle logic from draw loop color string creation for speed during heavy movement

            this.ctx.fillStyle = `${p.color},${p.alpha})`;
            this.ctx.fillRect(p.x, p.y, p.radius * 1.5, p.radius * 1.5); // rect is faster than arc
        });

        // STOP loop when done to save CPU
        if (settled < this.particles.length * 0.99) {
            requestAnimationFrame(() => this.animate());
        }
    }
}

// ============================================
// Swoop Reveal Logo Animation
// ============================================
class SwoopReveal {
    constructor() {
        this.rocket = document.getElementById('rocket-actor');
        this.mask = document.getElementById('logo-reveal-mask');
        this.container = document.getElementById('hero-logo-container');

        if (!this.rocket || !this.mask) return;

        this.startTime = null;
        this.duration = 2000; // 2 seconds for the swoop

        // Start animation after a short delay
        setTimeout(() => {
            this.rocket.style.opacity = '1';
            requestAnimationFrame(this.animate.bind(this));
        }, 500);
    }

    easeOutQuad(t) { return t * (2 - t); }

    animate(timestamp) {
        if (!this.startTime) this.startTime = timestamp;
        const progress = (timestamp - this.startTime) / this.duration;

        if (progress < 1) {
            // Easing
            const ease = this.easeOutQuad(progress);

            // Flight Path: Swoop from Bottom-Left (-50, 400) to Top-Right (650, -50)
            // Using a Quadratic Bezier Curve logic or simple parametric

            // Let's define specific waypoints for a nice curve
            // Start: x=-100, y=350 (Bottom Left)
            // Control: x=300, y=350 
            // End: x=700, y=-100

            // Simple interpolation for "Swoop"
            // X moves linearly-ish
            const startX = -100;
            const endX = 800;
            const currentX = startX + (endX - startX) * ease;

            // Y moves with a curve (dip then go up? or just arc up?)
            // Let's do a simple diagonal arc
            const startY = 400;
            const endY = -100;
            // Add some curve: y = lerp(startY, endY, ease) - arc
            const linearY = startY + (endY - startY) * ease;
            const arc = Math.sin(ease * Math.PI) * 50; // Slight curve upwards
            const currentY = linearY - arc;

            // Rotation calculation
            // approx tangent
            const dx = (endX - startX);
            const dy = (endY - startY);
            // Simple fixed rotation for now as the arc is subtle, or dynamic
            const angle = Math.atan2(dy, dx) * 180 / Math.PI + 90; // +90 to align rocket nose

            // Apply to Rocket
            this.rocket.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${angle}deg)`;

            // REVEAL MASK LOGIC
            // The mask should expand following the rocket
            // We use clip-path: polygon or circle.
            // Let's use a slanted rectangle reveal that follows x

            // We want to reveal everything TO THE LEFT of the rocket
            // mask X should lag slightly behind rocket X
            const maskX = (currentX / this.container.clientWidth) * 100;

            // Using clip-path: polygon. 
            // 0 0 (top left) -> maskX 0 (top right dynamic) -> maskX-20 100% (bottom right dynamic slanted) -> 0 100% (bottom left)
            const slope = 20; // percent slant
            const topX = Math.min(100, Math.max(0, (currentX + 50) / 6)); // approximate %
            const botX = Math.min(100, Math.max(0, (currentX - 50) / 6));

            // Better approach: Circle growing? Or simple curtain?
            // User asked for "Swoop".
            // Let's map the mask to exactly the rocket position + a large radius
            // clip-path: circle( [radius]% at [rocketX]% [rocketY]% ) ? No that reveals a spot. 
            // We want to reveal the TRAIL.

            // Efficient approach:
            // Clip the image from Left to Right.
            this.mask.style.clipPath = `polygon(0% 0%, ${topX}% 0%, ${botX}% 100%, 0% 100%)`;
            this.mask.style.webkitClipPath = `polygon(0% 0%, ${topX}% 0%, ${botX}% 100%, 0% 100%)`;

            requestAnimationFrame(this.animate.bind(this));
        } else {
            // Finish
            this.mask.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
            this.mask.style.webkitClipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

            // Fly rocket out completely
            this.rocket.style.opacity = '0';
            this.rocket.style.transition = 'opacity 0.5s';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('starfield');
    if (canvas) {
        new CosmicStarfield(canvas);
    }

    // Init Swoop Reveal
    new SwoopReveal();

    // Old Particle Logic Removed
    // initNavigation(); ...
    initNavigation();
    initSmoothScroll();

    console.log('✦ FALAk initialized (Swoop Mode)');
});


// ============================================
// Interactive Planets Logic
// ============================================
// ============================================
// Interactive Planets Logic (Localized)
// ============================================

function openPlanet(type) {
    const modal = document.getElementById('planet-modal-overlay');
    const title = document.getElementById('pm-title');
    const subtitle = document.getElementById('pm-subtitle');
    const desc = document.getElementById('pm-desc');
    const statsContainer = document.getElementById('pm-stats');

    // 1. Determine Data Source
    let p = null;

    // Try to get localized data
    if (typeof PLANET_CONTENT !== 'undefined' && window.appTranslator) {
        const lang = window.appTranslator.currentLang;
        if (PLANET_CONTENT[lang] && PLANET_CONTENT[lang][type]) {
            p = PLANET_CONTENT[lang][type];
        }
    }

    // Fallback to English if not found
    if (!p && typeof PLANET_CONTENT !== 'undefined' && PLANET_CONTENT['en']) {
        p = PLANET_CONTENT['en'][type];
    }

    if (p) {
        title.textContent = p.title;
        subtitle.textContent = p.level;
        desc.textContent = p.desc;

        // Populate Stats
        if (statsContainer && p.stats) {
            statsContainer.innerHTML = ''; // Clear old
            p.stats.forEach(stat => {
                const div = document.createElement('div');
                div.style.background = 'rgba(255, 255, 255, 0.05)';
                div.style.padding = '12px';
                div.style.borderRadius = '8px';
                div.style.border = '1px solid rgba(255, 255, 255, 0.1)';

                div.innerHTML = `
                    <div style="font-size: 0.7rem; text-transform: uppercase; color: rgba(255,255,255,0.5); letter-spacing: 1px; margin-bottom: 4px;">${stat.label}</div>
                    <div style="font-size: 0.95rem; font-weight: 600; color: #fff;">${stat.value}</div>
                `;
                statsContainer.appendChild(div);
            });
        }

        modal.classList.add('active');
        // Force visual state just in case
        modal.style.display = 'flex';
        modal.style.opacity = '1';
        document.body.style.overflow = 'hidden';
    } else {
        console.error("Planet data missing for:", type);
    }
}

function closePlanet() {
    const modal = document.getElementById('planet-modal-overlay');
    modal.classList.remove('active');
    setTimeout(() => {
        if (!modal.classList.contains('active')) {
            modal.style.display = '';
            modal.style.opacity = '';
        }
    }, 300);
    document.body.style.overflow = '';
}

document.getElementById('planet-modal-overlay')?.addEventListener('click', function (e) {
    if (e.target === this) {
        closePlanet();
    }
});

// Ensure openPlanet is globally available
window.openPlanet = openPlanet;
window.closePlanet = closePlanet;
