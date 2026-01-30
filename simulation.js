/* ============================================
   FALAk - Orbital Physics Engine
   A lightweight 2D physics simulation for web.
   Uses Newton's laws for gravity and thrust.
   ============================================ */

class PhysicsVector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    mult(n) {
        this.x *= n;
        this.y *= n;
        return this;
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        const m = this.mag();
        if (m !== 0) {
            this.mult(1 / m);
        }
        return this;
    }

    clone() {
        return new PhysicsVector(this.x, this.y);
    }
}

class RocketBody {
    constructor(x, y) {
        this.pos = new PhysicsVector(x, y);
        this.vel = new PhysicsVector(0, 0);
        this.acc = new PhysicsVector(0, 0);

        // Physics Properties
        this.mass = 1000; // kg
        this.fuel = 100; // Percentage
        this.thrustPower = 0.5; // Acceleration per tick

        // State
        this.isLanded = true;
        this.isCrashed = false;
        this.throttle = 0; // 0 to 1
        this.angle = -Math.PI / 2; // Pointing up
    }

    applyForce(force) {
        // F = ma -> a = F/m
        // For simplicity, we just add to acceleration directly here as we execute per frame
        const f = force.clone();
        f.mult(1 / 1); // logic mass 1 for visual simplicity, or adjust simple physics
        this.acc.add(f);
    }

    update() {
        if (this.isCrashed || (this.isLanded && this.throttle === 0)) return;

        // Apply Thrust
        if (this.fuel > 0 && this.throttle > 0) {
            const thrust = new PhysicsVector(Math.cos(this.angle), Math.sin(this.angle));
            thrust.mult(this.throttle * this.thrustPower);
            this.applyForce(thrust);
            this.fuel -= this.throttle * 0.1; // consumption
        }

        // Apply Gravity
        // Simple constant downward gravity for this "launch pad" view
        const gravity = new PhysicsVector(0, 0.15);
        this.applyForce(gravity);

        // Update Kinetics
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0); // Reset acceleration

        // Ground Collision
        if (this.pos.y > window.innerHeight - 100) {
            if (this.vel.mag() > 2) {
                this.isCrashed = true;
                this.vel.mult(0);
                alert("CRASH! Velocity too high on impact.");
                this.reset();
            } else {
                this.isLanded = true;
                this.pos.y = window.innerHeight - 100;
                this.vel.mult(0);
            }
        } else {
            this.isLanded = false;
        }

        // Ceiling (Orbit)
        if (this.pos.y < -100) {
            alert("ORBIT ACHIEVED! Welcome to FALAk.");
            this.reset();
        }
    }

    reset() {
        this.pos.y = window.innerHeight - 100;
        this.pos.x = window.innerWidth / 2;
        this.vel.mult(0);
        this.fuel = 100;
        this.isCrashed = false;
        this.isLanded = true;
        this.throttle = 0;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.angle + Math.PI / 2); // Adjust for drawing upright

        // Draw Rocket Body
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#38bdf8'; // Sky blue
        ctx.lineWidth = 2;

        // Triangle shape
        ctx.beginPath();
        ctx.moveTo(0, -20);
        ctx.lineTo(-10, 10);
        ctx.lineTo(10, 10);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Draw Exhaust if thrusting
        if (this.throttle > 0 && this.fuel > 0 && !this.isCrashed) {
            ctx.fillStyle = `rgba(255, 100, 0, ${Math.random() * 0.8 + 0.2})`;
            ctx.beginPath();
            ctx.moveTo(-5, 10);
            ctx.lineTo(0, 10 + this.throttle * 30 + Math.random() * 10);
            ctx.lineTo(5, 10);
            ctx.fill();
        }

        ctx.restore();
    }
}

class MissionControl {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.rocket = new RocketBody(window.innerWidth / 2, window.innerHeight - 100);

        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.initInput();
        this.loop();
    }

    resize() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        // Keep rocket on pad if landed but reset x
        if (this.rocket.isLanded) {
            this.rocket.pos.x = this.canvas.width / 2;
            this.rocket.pos.y = this.canvas.height - 100;
        }
    }

    initInput() {
        // UI Bindings
        const ignitionBtn = document.getElementById('cmd-ignition');
        const throttleInput = document.getElementById('cmd-throttle');
        const throttleDisplay = document.getElementById('val-throttle');

        if (throttleInput) {
            throttleInput.addEventListener('input', (e) => {
                const val = parseFloat(e.target.value);
                this.rocket.throttle = val / 100;
                if (throttleDisplay) throttleDisplay.innerText = val + '%';
            });
        }

        if (ignitionBtn) {
            ignitionBtn.addEventListener('mousedown', () => {
                this.rocket.throttle = 1.0;
                if (throttleInput) throttleInput.value = 100;
            });
            ignitionBtn.addEventListener('mouseup', () => {
                this.rocket.throttle = 0;
                if (throttleInput) throttleInput.value = 0;
            });
        }

        // Keyboard Support
        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                this.rocket.throttle = 1.0;
                if (throttleInput) throttleInput.value = 100;
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                this.rocket.throttle = 0;
                if (throttleInput) throttleInput.value = 0;
            }
        });
    }

    updateHUD() {
        document.getElementById('val-alt').innerText = Math.max(0, Math.floor((this.canvas.height - 100 - this.rocket.pos.y))).toFixed(0) + ' m';
        document.getElementById('val-vel').innerText = (this.rocket.vel.y * -10).toFixed(1) + ' m/s';
        document.getElementById('val-fuel').innerText = Math.floor(this.rocket.fuel) + '%';
    }

    loop() {
        // Physics Update
        this.rocket.update();

        // Draw
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw Launch Pad (simple line)
        this.ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height - 90);
        this.ctx.lineTo(this.canvas.width, this.canvas.height - 90);
        this.ctx.stroke();

        this.rocket.draw(this.ctx);

        // HUD Update
        this.updateHUD();

        requestAnimationFrame(() => this.loop());
    }
}

// Auto-init if element exists
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('sim-canvas')) {
        window.missionControl = new MissionControl('sim-canvas');
        console.log("Mission Control Online");
    }
});
