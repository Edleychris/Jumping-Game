const game = document.getElementById('game');
const playerEl = document.getElementById('player');
const scoreEl = document.getElementById('score');
const overlay = document.getElementById('overlay');
const GRAVITY = 2400, JUMP_V = 760, PX = 40, PW = 34, PH = 38;

let y, vy, obstacles, score, speed, spawnIn, last, running = false, best = 0;

function start() {
  obstacles.forEach?.(o => o.el.remove());
  y = 0; vy = 0; obstacles = []; score = 0; speed = 280; spawnIn = 0.8;
  scoreEl.textContent = 'Score: 0';
  overlay.classList.add('hidden');
  running = true; last = performance.now();
  requestAnimationFrame(loop);
}
obstacles = [];

function jump() {
  if (!running) { start(); return; }
  if (y === 0) vy = JUMP_V; // only jump from the ground
}

function spawn() {
  const R = Math.random;
  const types = [
    () => ({ c: 'cactus', w: 20, h: 50 + R() * 28 }),          // tall cactus with arms
    () => ({ c: 'cactus', w: 14, h: 30 + R() * 12 }),          // small cactus
    () => ({ c: 'cluster', w: 60, h: 44 + R() * 16 }),         // three cacti
    () => ({ c: 'rock', w: 36 + R() * 16, h: 22 + R() * 10 }), // boulder
    () => ({ c: 'spike', w: 30 + R() * 16, h: 28 + R() * 14 }),// spike
    () => ({ c: 'stump', w: 28, h: 28 + R() * 10 })            // tree stump
  ];
  const t = types[Math.floor(R() * types.length)]();
  const w = t.w, h = t.h;
  const el = document.createElement('div');
  el.className = 'obstacle ' + t.c;
  el.style.width = w + 'px'; el.style.height = h + 'px';
  if (t.c === 'cluster') el.innerHTML = '<i class="cactus" style="left:0;width:16px;height:70%"></i><i class="cactus" style="left:22px;width:16px;height:100%"></i><i class="cactus" style="left:44px;width:16px;height:60%"></i>';
  game.appendChild(el);
  obstacles.push({ el, x: game.clientWidth, w, h, passed: false });
}

function hit(o) {
  const m = 4; // forgiveness margin
  return PX + m < o.x + o.w && PX + PW - m > o.x && y + m < o.h;
}

function gameOver() {
  running = false;
  best = Math.max(best, score);
  document.getElementById('title').textContent = 'Game Over';
  document.getElementById('final').textContent = `Final score: ${score}  ·  Best: ${best}`;
  overlay.classList.remove('hidden');
}

function loop(now) {
  if (!running) return;
  const dt = Math.min((now - last) / 1000, 0.05); last = now;

  // gravity
  vy -= GRAVITY * dt; y += vy * dt;
  if (y <= 0) { y = 0; vy = 0; }
  playerEl.style.transform = `translateY(${-y}px)`;

  // obstacles
  spawnIn -= dt;
  if (spawnIn <= 0) { spawn(); spawnIn = (0.9 + Math.random() * 0.9) * (280 / speed) + 0.35; }
  for (const o of obstacles) {
    o.x -= speed * dt;
    o.el.style.left = o.x + 'px';
    if (hit(o)) { gameOver(); return; }
    if (!o.passed && o.x + o.w < PX) { o.passed = true; score++; scoreEl.textContent = 'Score: ' + score; }
  }
  obstacles = obstacles.filter(o => { if (o.x + o.w < 0) { o.el.remove(); return false; } return true; });
  speed += 6 * dt; // gradually harder
  requestAnimationFrame(loop);
}

document.addEventListener('keydown', e => {
  if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); if (!e.repeat) jump(); }
});
game.addEventListener('pointerdown', jump);