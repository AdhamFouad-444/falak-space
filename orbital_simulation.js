/* ============================================
   FALAk - Orbital Mechanics Simulator
   Phase 1: Core Physics Engine
   ============================================
   
   Architecture:
   - OrbitalVector: 2D vector math
   - CelestialBody: Planets/Moons with mass
   - Spacecraft: Player-controlled vehicle
   - OrbitalSimulation: Main loop & renderer
   ============================================ */

// ============================================
// VECTOR MATH
// ============================================
class OrbitalVector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(v) { return new OrbitalVector(this.x + v.x, this.y + v.y); }
    sub(v) { return new OrbitalVector(this.x - v.x, this.y - v.y); }
    mult(n) { return new OrbitalVector(this.x * n, this.y * n); }
    div(n) { return n !== 0 ? new OrbitalVector(this.x / n, this.y / n) : this; }

    mag() { return Math.sqrt(this.x * this.x + this.y * this.y); }
    magSq() { return this.x * this.x + this.y * this.y; }

    normalize() {
        const m = this.mag();
        return m > 0 ? this.div(m) : new OrbitalVector();
    }

    clone() { return new OrbitalVector(this.x, this.y); }

    static fromAngle(angle, length = 1) {
        return new OrbitalVector(Math.cos(angle) * length, Math.sin(angle) * length);
    }
}

// ============================================
// CELESTIAL BODY (Planet)
// ============================================
class CelestialBody {
    constructor(config) {
        this.name = config.name || "Planet";
        this.pos = new OrbitalVector(config.x || 0, config.y || 0);
        this.radius = config.radius || 50;           // Visual radius (px)
        this.mass = config.mass || 5.972e24;         // kg (Earth default)
        this.color = config.color || "#4a9eff";
        this.atmosphereHeight = config.atmosphereHeight || 0; // px above surface
        this.atmosphereColor = config.atmosphereColor || "rgba(100, 180, 255, 0.1)";

        // Standard Gravitational Parameter (GM) - precalculated for performance
        this.GM = 6.674e-11 * this.mass;
    }

    // Get gravity acceleration at distance r from center
    getGravityAt(distance) {
        // F = GM/r² (returns acceleration, not force, since we work with unit mass)
        if (distance < this.radius) distance = this.radius; // Prevent singularity
        return this.GM / (distance * distance);
    }

    draw(ctx, camera) {
        // Atmosphere glow
        if (this.atmosphereHeight > 0) {
            const gradient = ctx.createRadialGradient(
                this.pos.x - camera.x, this.pos.y - camera.y, this.radius,
                this.pos.x - camera.x, this.pos.y - camera.y, this.radius + this.atmosphereHeight
            );
            gradient.addColorStop(0, this.atmosphereColor);
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.pos.x - camera.x, this.pos.y - camera.y, this.radius + this.atmosphereHeight, 0, Math.PI * 2);
            ctx.fill();
        }

        // Planet surface
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x - camera.x, this.pos.y - camera.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Surface line (for visual reference)
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        ctx.beginPath();
        ctx.arc(this.pos.x - camera.x, this.pos.y - camera.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
    }
}

// ============================================
// SPACECRAFT
// ============================================
class Spacecraft {
    constructor(config) {
        this.pos = new OrbitalVector(config.x || 0, config.y || -200);
        this.vel = new OrbitalVector(config.vx || 150, config.vy || 0); // Initial orbital velocity
        this.mass = config.mass || 1000;       // kg (dry mass)
        this.fuel = config.fuel || 100;        // Percentage
        this.thrust = config.thrust || 50;     // Acceleration per frame when thrusting
        this.angle = config.angle || 0;        // Facing direction (radians)

        // Thrust state
        this.thrusting = false;
        this.thrustDirection = 0; // 0 = prograde, Math.PI = retrograde

        // Visual
        this.size = 8;
        this.trailHistory = [];
        this.maxTrailLength = 200;
    }

    // Apply thrust in specified direction relative to velocity
    applyThrust(dt) {
        if (!this.thrusting || this.fuel <= 0) return new OrbitalVector();

        // Get velocity direction (prograde)
        const prograde = this.vel.normalize();

        // Rotate by thrust direction (0 = prograde, PI = retrograde)
        const thrustAngle = Math.atan2(prograde.y, prograde.x) + this.thrustDirection;
        const thrustVec = OrbitalVector.fromAngle(thrustAngle, this.thrust * dt);

        this.fuel -= 0.05 * dt * 60; // Consume fuel
        return thrustVec;
    }

    update(acceleration, dt) {
        // Update velocity
        this.vel = this.vel.add(acceleration.mult(dt));

        // Update position
        this.pos = this.pos.add(this.vel.mult(dt));

        // Store trail
        this.trailHistory.push(this.pos.clone());
        if (this.trailHistory.length > this.maxTrailLength) {
            this.trailHistory.shift();
        }

        // Update facing angle to velocity direction
        this.angle = Math.atan2(this.vel.y, this.vel.x);
    }

    draw(ctx, camera) {
        const screenX = this.pos.x - camera.x;
        const screenY = this.pos.y - camera.y;

        // Draw trail
        if (this.trailHistory.length > 1) {
            ctx.strokeStyle = "rgba(56, 189, 248, 0.3)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(this.trailHistory[0].x - camera.x, this.trailHistory[0].y - camera.y);
            for (let i = 1; i < this.trailHistory.length; i++) {
                ctx.lineTo(this.trailHistory[i].x - camera.x, this.trailHistory[i].y - camera.y);
            }
            ctx.stroke();
        }

        // Draw spacecraft
        ctx.save();
        ctx.translate(screenX, screenY);
        ctx.rotate(this.angle + Math.PI / 2);

        // Body
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.lineTo(-this.size / 2, this.size);
        ctx.lineTo(this.size / 2, this.size);
        ctx.closePath();
        ctx.fill();

        // Thrust flame
        if (this.thrusting && this.fuel > 0) {
            ctx.fillStyle = `rgba(255, ${100 + Math.random() * 100}, 0, ${0.5 + Math.random() * 0.5})`;
            ctx.beginPath();
            ctx.moveTo(-this.size / 3, this.size);
            ctx.lineTo(0, this.size + 10 + Math.random() * 10);
            ctx.lineTo(this.size / 3, this.size);
            ctx.fill();
        }

        ctx.restore();
    }
}

// ============================================
// ORBITAL CALCULATOR
// ============================================
class OrbitalCalculator {
    // Calculate orbital elements from state vectors
    static getOrbitalElements(pos, vel, body) {
        const r = pos.sub(body.pos);
        const v = vel;

        const rMag = r.mag();
        const vMag = v.mag();

        // Specific orbital energy
        const energy = (vMag * vMag) / 2 - body.GM / rMag;

        // Semi-major axis
        const a = -body.GM / (2 * energy);

        // Eccentricity vector
        const h = r.x * v.y - r.y * v.x; // Angular momentum (2D cross product)
        const ex = (v.y * h) / body.GM - r.x / rMag;
        const ey = -(v.x * h) / body.GM - r.y / rMag;
        const e = Math.sqrt(ex * ex + ey * ey);

        // Apoapsis and Periapsis
        const apoapsis = a * (1 + e);
        const periapsis = a * (1 - e);

        // Orbital period
        const period = 2 * Math.PI * Math.sqrt(Math.pow(a, 3) / body.GM);

        return {
            semiMajorAxis: a,
            eccentricity: e,
            apoapsis: apoapsis,
            periapsis: periapsis,
            period: period,
            energy: energy,
            altitude: rMag - body.radius
        };
    }

    // Predict orbital path for rendering
    static predictOrbit(pos, vel, body, steps = 200, dt = 1) {
        const points = [];
        let p = pos.clone();
        let v = vel.clone();

        for (let i = 0; i < steps; i++) {
            // Calculate gravity
            const r = p.sub(body.pos);
            const rMag = r.mag();

            // Check for collision
            if (rMag < body.radius) break;

            const gravMag = body.GM / (rMag * rMag);
            const gravDir = r.normalize().mult(-1);
            const grav = gravDir.mult(gravMag);

            // Integrate
            v = v.add(grav.mult(dt));
            p = p.add(v.mult(dt));

            points.push(p.clone());
        }

        return points;
    }
}

// ============================================
// MAIN SIMULATION
// ============================================
class OrbitalSimulation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.running = true;
        this.timeScale = 1;
        this.lastTime = performance.now();

        // Camera (follows spacecraft)
        this.camera = { x: 0, y: 0 };

        // Create planet (scaled for visual representation)
        // Using scaled units: 1 pixel ≈ 10 km
        this.planet = new CelestialBody({
            name: "Kerbin",
            x: 0,
            y: 0,
            radius: 60,                    // 600 km scaled
            mass: 5.2915e22,               // Kerbin's mass
            color: "#2d5a2d",
            atmosphereHeight: 7,           // 70 km atmosphere
            atmosphereColor: "rgba(100, 180, 255, 0.15)"
        });

        // Recalculate GM for our scaled units
        // We want orbits to be visually pleasing, so we tune GM
        this.planet.GM = 50000; // Tuned for gameplay

        // Create spacecraft in a starting orbit
        const orbitRadius = this.planet.radius + 50; // 50 units above surface
        const orbitalVelocity = Math.sqrt(this.planet.GM / orbitRadius);

        this.spacecraft = new Spacecraft({
            x: 0,
            y: -orbitRadius,
            vx: orbitalVelocity,
            vy: 0
        });

        // Predict initial orbit
        this.predictedOrbit = [];

        this.resize();
        this.initControls();
        this.loop();

        window.addEventListener('resize', () => this.resize());

        console.log("✦ Orbital Simulation initialized");
    }

    resize() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    }

    initControls() {
        // Keyboard controls
        window.addEventListener('keydown', (e) => {
            if (e.code === 'KeyW' || e.code === 'ArrowUp') {
                this.spacecraft.thrusting = true;
                this.spacecraft.thrustDirection = 0; // Prograde
            }
            if (e.code === 'KeyS' || e.code === 'ArrowDown') {
                this.spacecraft.thrusting = true;
                this.spacecraft.thrustDirection = Math.PI; // Retrograde
            }
            if (e.code === 'Period') {
                this.timeScale = Math.min(100, this.timeScale * 2);
            }
            if (e.code === 'Comma') {
                this.timeScale = Math.max(0.25, this.timeScale / 2);
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.code === 'KeyW' || e.code === 'ArrowUp' || e.code === 'KeyS' || e.code === 'ArrowDown') {
                this.spacecraft.thrusting = false;
            }
        });

        // UI Button bindings
        const progradeBtn = document.getElementById('btn-prograde');
        const retrogradeBtn = document.getElementById('btn-retrograde');

        if (progradeBtn) {
            progradeBtn.onmousedown = () => { this.spacecraft.thrusting = true; this.spacecraft.thrustDirection = 0; };
            progradeBtn.onmouseup = () => { this.spacecraft.thrusting = false; };
            progradeBtn.onmouseleave = () => { this.spacecraft.thrusting = false; };
        }
        if (retrogradeBtn) {
            retrogradeBtn.onmousedown = () => { this.spacecraft.thrusting = true; this.spacecraft.thrustDirection = Math.PI; };
            retrogradeBtn.onmouseup = () => { this.spacecraft.thrusting = false; };
            retrogradeBtn.onmouseleave = () => { this.spacecraft.thrusting = false; };
        }
    }

    update(dt) {
        dt *= this.timeScale;

        // Calculate gravity from planet
        const r = this.spacecraft.pos.sub(this.planet.pos);
        const rMag = r.mag();

        // Check collision
        if (rMag < this.planet.radius) {
            alert("IMPACT! Spacecraft crashed into " + this.planet.name);
            this.reset();
            return;
        }

        // Gravity acceleration (towards planet center)
        const gravMag = this.planet.GM / (rMag * rMag);
        const gravDir = r.normalize().mult(-1);
        const gravity = gravDir.mult(gravMag);

        // Thrust acceleration
        const thrust = this.spacecraft.applyThrust(dt);

        // Total acceleration
        const acceleration = gravity.add(thrust);

        // Update spacecraft
        this.spacecraft.update(acceleration, dt);

        // Update camera (follow spacecraft with smoothing)
        const targetCamX = this.spacecraft.pos.x - this.canvas.width / 2;
        const targetCamY = this.spacecraft.pos.y - this.canvas.height / 2;
        this.camera.x += (targetCamX - this.camera.x) * 0.1;
        this.camera.y += (targetCamY - this.camera.y) * 0.1;

        // Predict orbit (only when not thrusting for performance)
        if (!this.spacecraft.thrusting) {
            this.predictedOrbit = OrbitalCalculator.predictOrbit(
                this.spacecraft.pos,
                this.spacecraft.vel,
                this.planet,
                500,
                0.5
            );
        }
    }

    draw() {
        const ctx = this.ctx;

        // Clear
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw predicted orbit
        if (this.predictedOrbit.length > 1) {
            ctx.strokeStyle = "rgba(255, 200, 100, 0.4)";
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(this.predictedOrbit[0].x - this.camera.x, this.predictedOrbit[0].y - this.camera.y);
            for (let p of this.predictedOrbit) {
                ctx.lineTo(p.x - this.camera.x, p.y - this.camera.y);
            }
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // Draw planet
        this.planet.draw(ctx, this.camera);

        // Draw spacecraft
        this.spacecraft.draw(ctx, this.camera);

        // Draw HUD
        this.drawHUD();
    }

    drawHUD() {
        const ctx = this.ctx;
        const elements = OrbitalCalculator.getOrbitalElements(
            this.spacecraft.pos,
            this.spacecraft.vel,
            this.planet
        );

        // Update DOM elements if they exist
        const altEl = document.getElementById('val-alt');
        const velEl = document.getElementById('val-vel');
        const apoEl = document.getElementById('val-apo');
        const periEl = document.getElementById('val-peri');
        const fuelEl = document.getElementById('val-fuel');
        const timeEl = document.getElementById('val-timescale');

        if (altEl) altEl.textContent = Math.max(0, elements.altitude * 10).toFixed(0) + ' km';
        if (velEl) velEl.textContent = (this.spacecraft.vel.mag() * 10).toFixed(0) + ' m/s';
        if (apoEl) apoEl.textContent = (elements.apoapsis * 10 - this.planet.radius * 10).toFixed(0) + ' km';
        if (periEl) periEl.textContent = Math.max(0, elements.periapsis * 10 - this.planet.radius * 10).toFixed(0) + ' km';
        if (fuelEl) fuelEl.textContent = Math.floor(this.spacecraft.fuel) + '%';
        if (timeEl) timeEl.textContent = this.timeScale + 'x';

        // Orbit stability indicator
        const stable = elements.periapsis > this.planet.radius + this.planet.atmosphereHeight;
        const statusEl = document.getElementById('orbit-status');
        if (statusEl) {
            statusEl.textContent = stable ? 'STABLE ORBIT' : 'SUBORBITAL';
            statusEl.style.color = stable ? '#22c55e' : '#ef4444';
        }
    }

    reset() {
        const orbitRadius = this.planet.radius + 50;
        const orbitalVelocity = Math.sqrt(this.planet.GM / orbitRadius);

        this.spacecraft.pos = new OrbitalVector(0, -orbitRadius);
        this.spacecraft.vel = new OrbitalVector(orbitalVelocity, 0);
        this.spacecraft.fuel = 100;
        this.spacecraft.trailHistory = [];
        this.timeScale = 1;
    }

    loop() {
        const now = performance.now();
        const dt = Math.min((now - this.lastTime) / 1000, 0.1); // Cap dt to prevent spiraling
        this.lastTime = now;

        if (this.running) {
            this.update(dt);
            this.draw();
        }

        requestAnimationFrame(() => this.loop());
    }
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Check if orbital sim canvas exists
    if (document.getElementById('orbital-sim-canvas')) {
        window.orbitalSim = new OrbitalSimulation('orbital-sim-canvas');
    }
});
