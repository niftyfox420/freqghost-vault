const canvas = document.getElementById("effects-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
let shapes = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.onresize = resize;

function makeParticles() {
    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedY: Math.random() * 0.4 + 0.1
        });
    }
}

function makeShapes() {
    for (let i = 0; i < 6; i++) {
        shapes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 80 + 40,
            rot: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.005 + 0.003
        });
    }
}

makeParticles();
makeShapes();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // PARTICLES
    ctx.fillStyle = "rgba(0,255,255,0.7)";
    particles.forEach(p => {
        p.y += p.speedY;
        if (p.y > canvas.height) p.y = -10;
        ctx.fillRect(p.x, p.y, p.size, p.size);
    });

    // GEOMETRY
    shapes.forEach(s => {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rot);
        ctx.strokeStyle = "rgba(0,255,255,0.4)";
        ctx.lineWidth = 2;
        ctx.strokeRect(-s.size / 2, -s.size / 2, s.size, s.size);
        ctx.restore();

        s.rot += s.speed;
    });

    requestAnimationFrame(animate);
}

animate();
