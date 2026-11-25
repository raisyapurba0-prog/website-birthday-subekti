
const canvas = document.getElementById("birthdayCanvas");
const ctx = canvas.getContext("2d", { alpha: false });
const message = document.getElementById("birthdayMessage");

let width = 0;
let height = 0;
let particles = [];
let stars = [];
let animationFrame;
let startTime = 0;
let animationFinished = false;

const totalParticles = 550;
const maxPixelRatio = 1.5;

function resizeCanvas() {
    const ratio = Math.min(
        window.devicePixelRatio || 1,
        maxPixelRatio
    );

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    createStars();
}

function createStars() {
    stars = [];

    for (let i = 0; i < 55; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 1.3 + 0.4,
            alpha: Math.random() * 0.4 + 0.2,
            phase: Math.random() * Math.PI * 2
        });
    }
}

function drawStars(time) {
    for (const star of stars) {
        const glow =
            0.65 + Math.sin(time * 0.001 + star.phase) * 0.25;

        ctx.globalAlpha = star.alpha * glow;
        ctx.fillStyle = "#e8c389";

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.globalAlpha = 1;
}

function ease(t) {
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// TITIK TULISAN

function getTextPoints() {
    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d", {
        willReadFrequently: true
    });

    offscreen.width = width;
    offscreen.height = height;

    const fontSize = Math.min(width * 0.065, 58);

    offCtx.font = `600 ${fontSize}px Cinzel, serif`;
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";
    offCtx.fillStyle = "#fff";

    offCtx.fillText(
        "HAPPY BIRTHDAY",
        width / 2,
        height * 0.20
    );

    const image = offCtx.getImageData(
        0, 0, width, height
    );

    const points = [];

    for (let y = 0; y < height; y += 4) {
        for (let x = 0; x < width; x += 4) {
            const index = (y * width + x) * 4;

            if (image.data[index + 3] > 100) {
                points.push({ x, y });
            }
        }
    }

    return points;
}

// TITIK HATI

function getHeartPoints() {
    const points = [];

    const scale = Math.min(width, height) * 0.010;
    const centerX = width / 2;
    const centerY = height * 0.49;

    for (let i = 0; i < totalParticles; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.sqrt(Math.random());

        const heartX =
            16 * Math.pow(Math.sin(angle), 3);

        const heartY =
            13 * Math.cos(angle) -
            5 * Math.cos(2 * angle) -
            2 * Math.cos(3 * angle) -
            Math.cos(4 * angle);

        points.push({
            x: centerX + heartX * scale * radius,
            y: centerY - heartY * scale * radius
        });
    }

    return points;
}

// PARTIKEL

function createParticles() {
    const textPoints = getTextPoints();
    const heartPoints = getHeartPoints();

    particles = [];

    if (!textPoints.length) return;

    for (let i = 0; i < totalParticles; i++) {
        const text = textPoints[
            Math.floor(Math.random() * textPoints.length)
        ];

        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * Math.min(width, height) * 0.25 + 30;

        const centerX = width / 2;
        const centerY = height * 0.43;

        particles.push({
            angle,
            radius,

            startX: centerX + Math.cos(angle) * radius,
            startY: centerY + Math.sin(angle) * radius,

            textX: text.x,
            textY: text.y,

            heartX: heartPoints[i].x,
            heartY: heartPoints[i].y,

            previousX: centerX,
            previousY: centerY,

            size: Math.random() * 1.3 + 0.7,
            alpha: Math.random() * 0.45 + 0.5,

            speed: Math.random() * 0.5 + 0.7,
            direction: Math.random() > 0.5 ? 1 : -1,

            phase: Math.random() * Math.PI * 2
        });
    }
}

// CAHAYA

function drawGlow(x, y, radius, alpha) {
    const gradient = ctx.createRadialGradient(
        x, y, 0,
        x, y, radius
    );

    gradient.addColorStop(
        0,
        `rgba(212, 158, 105, ${alpha})`
    );

    gradient.addColorStop(
        1,
        "rgba(212, 158, 105, 0)"
    );

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

// ANIMASI PARTIKEL

function drawParticles(time, elapsed) {
    for (const p of particles) {
        let x;
        let y;

        // TAHAP 1: PUSARAN LANGSUNG BERGERAK

        if (elapsed < 2.5) {
            const progress = elapsed / 2.5;

            const angle =
                p.angle +
                time * 0.002 * p.speed * p.direction;

            const radius =
                p.radius * (0.35 + progress * 0.65);

            x = width / 2 + Math.cos(angle) * radius;
            y = height * 0.43 + Math.sin(angle) * radius;
        }

        // TAHAP 2: MEMBENTUK TULISAN

        else if (elapsed < 5) {
            const progress = ease((elapsed - 2.5) / 2.5);

            const angle =
                p.angle +
                time * 0.002 * p.speed * p.direction;

            const radius = p.radius;

            const vortexX =
                width / 2 + Math.cos(angle) * radius;

            const vortexY =
                height * 0.43 + Math.sin(angle) * radius;

            x = vortexX + (p.textX - vortexX) * progress;
            y = vortexY + (p.textY - vortexY) * progress;
        }

        // TAHAP 3: TULISAN KEMBALI MENJADI PUSARAN

        else if (elapsed < 8) {
            const progress = ease((elapsed - 5) / 3);

            const angle =
                p.angle +
                time * 0.0025 * p.speed * p.direction;

            const vortexX =
                width / 2 + Math.cos(angle) * p.radius;

            const vortexY =
                height * 0.43 + Math.sin(angle) * p.radius;

            x = p.textX + (vortexX - p.textX) * progress;
            y = p.textY + (vortexY - p.textY) * progress;
        }

        // TAHAP 4: MEMBENTUK HATI

        else {
            const progress = ease(
                Math.min((elapsed - 8) / 3, 1)
            );

            const angle =
                p.angle +
                time * 0.0025 * p.speed * p.direction;

            const vortexX =
                width / 2 + Math.cos(angle) * p.radius;

            const vortexY =
                height * 0.43 + Math.sin(angle) * p.radius;

            x = vortexX + (p.heartX - vortexX) * progress;
            y = vortexY + (p.heartY - vortexY) * progress;
        }

        // JEJAK PARTIKEL

        if (elapsed < 11) {
            ctx.beginPath();
            ctx.moveTo(p.previousX, p.previousY);
            ctx.lineTo(x, y);

            ctx.strokeStyle = "rgba(220, 173, 119, 0.10)";
            ctx.lineWidth = 0.7;
            ctx.stroke();
        }

        p.previousX = x;
        p.previousY = y;

        // PARTIKEL BERCAHAYA

        const glow =
            0.75 + Math.sin(time * 0.003 + p.phase) * 0.25;

        ctx.globalAlpha = p.alpha * glow;
        ctx.fillStyle = "#f5d29d";

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.globalAlpha = 1;
}

// ANIMASI UTAMA

function animate(time) {
    const elapsed = (time - startTime) / 1000;

    ctx.fillStyle = "#090608";
    ctx.fillRect(0, 0, width, height);

    drawStars(time);

    if (elapsed < 11) {
        drawGlow(
            width / 2,
            height * 0.43,
            Math.min(width, height) * 0.25,
            0.10
        );
    }

    drawParticles(time, elapsed);

    if (elapsed >= 11) {
        message.classList.add("show");
        animationFinished = true;
        return;
    }

    animationFrame = requestAnimationFrame(animate);
}

// MULAI

async function startAnimation() {
    await document.fonts.ready;

    resizeCanvas();
    createParticles();

    startTime = performance.now();

    window.addEventListener("resize", function () {
        if (animationFinished) return;

        cancelAnimationFrame(animationFrame);

        resizeCanvas();
        createParticles();

        animationFrame = requestAnimationFrame(animate);
    });

    animationFrame = requestAnimationFrame(animate);
}

startAnimation();
