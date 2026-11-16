// Procedural Canvas & SVG Textures generator for MASOULEN '26 E06
// Bakes textures once in memory on load (zero image network requests)

const R = (min: number, max: number) => min + Math.random() * (max - min);

function createBakedCanvas(w: number, h: number, draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void): string {
  if (typeof document === 'undefined') return '';
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    draw(ctx, w, h);
  }
  return canvas.toDataURL('image/jpeg', 0.85);
}

// 1. Dark Walnut Desk Wood Surface with Plank Lines, Ring Stains & Grain
export function getDeskTexture(): string {
  return createBakedCanvas(1200, 800, (ctx, w, h) => {
    // Base rich walnut brown
    ctx.fillStyle = '#26180f';
    ctx.fillRect(0, 0, w, h);

    // Fine wood grain lines
    for (let i = 0; i < 2200; i++) {
      const y = R(0, h);
      const alpha = R(0.04, 0.22);
      const isDark = Math.random() < 0.55;
      ctx.strokeStyle = isDark ? `rgba(14, 7, 3, ${alpha})` : `rgba(88, 54, 28, ${alpha * 0.9})`;
      ctx.lineWidth = R(0.4, 2.8);
      ctx.beginPath();
      const phase = R(0, 10);
      const amp = R(1.5, 6);
      for (let x = 0; x <= w; x += 30) {
        ctx.lineTo(x, y + Math.sin(x / 160 + phase) * amp + Math.sin(x / 40 + phase) * 1.5);
      }
      ctx.stroke();
    }

    // Wood Knots
    for (let k = 0; k < 4; k++) {
      const kx = R(150, w - 150);
      const ky = R(80, h - 80);
      for (let r = 4; r < 55; r += 3.5) {
        ctx.strokeStyle = `rgba(18, 9, 4, ${0.28 - r / 300})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.ellipse(kx, ky, r * 2.8, r * 0.8, R(-0.1, 0.1), 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Horizontal Wooden Plank Seams
    ctx.fillStyle = 'rgba(10, 5, 2, 0.55)';
    ctx.fillRect(0, 260, w, 4);
    ctx.fillRect(0, 530, w, 4);

    // Subtle highlight along plank edges
    ctx.fillStyle = 'rgba(110, 75, 45, 0.18)';
    ctx.fillRect(0, 264, w, 1.5);
    ctx.fillRect(0, 534, w, 1.5);

    // Two Realistic Coffee Ring Stains on Right Side (per concept image)
    const drawCoffeeRing = (cx: number, cy: number, radius: number) => {
      ctx.save();
      ctx.lineWidth = R(2.5, 4);
      ctx.strokeStyle = 'rgba(38, 20, 10, 0.42)';
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Outer splatter / bleed
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = 'rgba(50, 26, 12, 0.25)';
      ctx.beginPath();
      ctx.arc(cx + 1, cy - 1, radius + 1.5, 0, Math.PI * 2);
      ctx.stroke();

      // Faint puddle fill
      ctx.fillStyle = 'rgba(45, 22, 10, 0.08)';
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    drawCoffeeRing(w * 0.91, h * 0.65, 52);
    drawCoffeeRing(w * 0.94, h * 0.76, 48);
  });
}

// 2. Cloth Weave Texture for Object A & D
export function getClothTexture(): string {
  return createBakedCanvas(300, 300, (ctx, w, h) => {
    ctx.fillStyle = '#2d3b38';
    ctx.fillRect(0, 0, w, h);
    for (let x = 0; x < w; x += 3) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(x, 0, 1.5, h);
    }
    for (let y = 0; y < h; y += 3) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
      ctx.fillRect(0, y, w, 1.5);
    }
  });
}

// 3. Leather Texture for Notarial Day Book and Field Notes
export function getLeatherTexture(): string {
  return createBakedCanvas(350, 350, (ctx, w, h) => {
    ctx.fillStyle = '#1c1511';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 4000; i++) {
      const x = R(0, w);
      const y = R(0, h);
      const r = R(1, 2.5);
      ctx.fillStyle = Math.random() < 0.5 ? 'rgba(0,0,0,0.2)' : 'rgba(100,65,40,0.12)';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}
