const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');

let stars = [];
const starCount = 200;

class Star {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random();
    this.delta = (Math.random() * 0.02) + 0.005;
  }
  update() {
    this.alpha += this.delta;
    if (this.alpha <= 0 || this.alpha >= 1) {
      this.delta = -this.delta;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
    ctx.fill();
  }
}

function createStars() {
  stars = [];
  for(let i=0; i<starCount; i++) {
    stars.push(new Star());
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
canvas.height = Math.max(document.body.scrollHeight, window.innerHeight);

  createStars();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    star.update();
    star.draw();
  });
  requestAnimationFrame(animate);
}

// İlk ayar
resizeCanvas();
animate();

// Pencere resize event'i
window.addEventListener('resize', resizeCanvas);

// Sayfa yüksekliğini gözlemle
const ro = new ResizeObserver(entries => {
  for (let entry of entries) {
    // Sayfa yüksekliği değiştiğinde canvas yeniden ayarlanabilir
    resizeCanvas();
  }
});

// Body'yi gözlemle (sayfa içeriği değişirse tetikler)
ro.observe(document.body);
