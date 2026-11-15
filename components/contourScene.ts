import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  LineSegments,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer
} from 'three';

/**
 * The page's hairlines, given depth: a contour surface drawn as rows of single
 * pixel lines, so it reads as ground rather than as an object. This module is
 * the only one that imports three, and the field fetches it on approach.
 *
 * On a phone the camera is rolled so the ground runs off the top right corner
 * and under the bottom left one; on a desk it stays level, because there the
 * horizon is the page's own horizontal and the reader is reading across it.
 */

const ROWS = 72;
const SEGMENTS = 220;
const NEAR = 3.5;
const FAR = -60;

const CAM_Y = 2.8;
const CAM_Z = 9;
const LOOK_Y = -1.2;
const LOOK_Z = -5;

const ROLL_NARROW = -0.92;
const PARALLAX_X = 1.8;
const PARALLAX_Y = 0.7;
const PARALLAX_LOOK = 0.9;
const EASE = 0.09;

const VERTEX = `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uPointer;
  uniform float uPush;
  uniform float uReach;
  varying float vDepth;

  void main() {
    vec3 p = position;
    float z = p.z + uScroll;

    float waves =
      0.95 * sin(0.42 * p.x + 0.50 * z + uTime * 0.22) +
      0.52 * sin(0.74 * z - 0.31 * p.x - uTime * 0.15) +
      0.24 * sin(1.24 * p.x + 0.86 * z + uTime * 0.10);

    // Distance flattens the ground, as it does in life. Without this the far
    // rows are closer to each other than their own waves and cross into a
    // tangle; with it the top of the field reads as fine, calm texture.
    float away = length(vec3(p.x, 0.0, p.z) - cameraPosition);
    float damp = clamp(away / 16.0, 0.08, 1.0);
    float h = waves * damp;

    // The ground lifts away from the pointer and settles back behind it.
    float d = distance(vec2(p.x, p.z), uPointer);
    h += uPush * damp * exp(-d * d / uReach);

    p.y = h;

    vec4 view = modelViewMatrix * vec4(p, 1.0);
    vDepth = -view.z;
    gl_Position = projectionMatrix * view;
  }
`;

const FRAGMENT = `
  uniform vec3 uInk;
  uniform vec3 uPaper;
  uniform float uNear;
  uniform float uFar;
  uniform float uAlpha;
  varying float vDepth;

  void main() {
    // Depth is read as ink thinning to paper, so the far side of the ground
    // dissolves into the page instead of ending at an edge.
    float fade = smoothstep(uNear, uFar, vDepth);
    gl_FragColor = vec4(mix(uInk, uPaper, fade), uAlpha * (1.0 - fade));
  }
`;

/** Tokens are oklch and color-mix, which three cannot parse. Painting one pixel
 *  and reading it is the parse that also covers color-mix. */
const resolveColour = (value: string, fallback: string) => {
  const probe = document.createElement('canvas');
  probe.width = 1;
  probe.height = 1;
  const context = probe.getContext('2d', { willReadFrequently: true });
  if (!context) return new Color(fallback);
  context.fillStyle = fallback;
  context.fillRect(0, 0, 1, 1);
  context.fillStyle = value;
  context.fillRect(0, 0, 1, 1);
  const [red, green, blue] = context.getImageData(0, 0, 1, 1).data;
  return new Color(`rgb(${red}, ${green}, ${blue})`);
};

const token = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export function mountContour(canvas: HTMLCanvasElement): () => void {
  const host = canvas.parentElement;
  if (!host) return () => {};

  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'low-power'
    });
  } catch {
    return () => {};
  }
  renderer.setClearAlpha(0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 2, 0.1, 140);
  camera.position.set(0, CAM_Y, CAM_Z);

  const narrow = window.matchMedia('(max-width: 60rem)');
  let roll = narrow.matches ? ROLL_NARROW : 0;

  // The ground is shaped to the frustum: each row is only as wide as the frame
  // at its depth, so no row ends inside the picture, and the rows run past the
  // horizon instead of stopping in mid air. The margin covers the parallax and
  // the roll, which swing the frame across the ground.
  const build = () => {
    const halfAngle = Math.atan(Math.tan((camera.fov * Math.PI) / 360) * camera.aspect);
    const positions: number[] = [];

    // Rows are spaced evenly down the screen rather than evenly into the
    // distance: a linear spread piles nine rows in ten at the horizon and
    // leaves the floor under the copy bare. Spacing them by distance instead
    // fills the frame, and the waves still read as depth because they grow
    // finer towards the top.
    const nearInverse = 1 / (CAM_Z - NEAR);
    const farInverse = 1 / (CAM_Z - FAR);

    for (let row = 0; row < ROWS; row += 1) {
      const t = row / (ROWS - 1);
      const distance = 1 / (nearInverse + (farInverse - nearInverse) * t);
      const z = CAM_Z - distance;
      const reach = distance * Math.tan(halfAngle) * 2.6 + 2;
      for (let step = 0; step < SEGMENTS; step += 1) {
        const x0 = -reach + (2 * reach * step) / SEGMENTS;
        const x1 = -reach + (2 * reach * (step + 1)) / SEGMENTS;
        positions.push(x0, 0, z, x1, 0, z);
      }
    }

    const next = new BufferGeometry();
    next.setAttribute('position', new Float32BufferAttribute(positions, 3));
    return next;
  };

  let geometry = build();

  const uniforms = {
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uPointer: { value: new Vector2(0, -14) },
    uPush: { value: 2.6 },
    uReach: { value: 12 },
    uInk: { value: resolveColour(token('--color-accent'), '#3a4a86') },
    uPaper: { value: resolveColour(token('--color-paper'), '#f9f3e8') },
    uNear: { value: 11 },
    uFar: { value: 52 },
    uAlpha: { value: 0.32 }
  };

  const material = new ShaderMaterial({
    uniforms,
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    transparent: true,
    depthWrite: false
  });

  const lines = new LineSegments(geometry, material);
  scene.add(lines);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let last = 0;
  let elapsed = 0;
  let targetX = 0;
  let targetY = 0;
  let easeX = 0;
  let easeY = 0;

  const aim = () => {
    // Aimed below the horizon, so the ground fills the hero instead of leaving
    // a sky line to cut across the copy.
    camera.position.set(easeX * PARALLAX_X, CAM_Y + easeY * PARALLAX_Y, CAM_Z);
    camera.lookAt(easeX * PARALLAX_LOOK, LOOK_Y, LOOK_Z);
    camera.rotateZ(roll);
  };

  const measure = () => {
    // How far the band has travelled across the viewport, used to push the
    // ground past the reader as they scroll.
    const box = host.getBoundingClientRect();
    const span = window.innerHeight + box.height;
    const progress = span > 0 ? (window.innerHeight - box.top) / span : 0.5;
    uniforms.uScroll.value = (Math.min(Math.max(progress, 0), 1) - 0.5) * 14;
  };

  const render = () => {
    aim();
    renderer.render(scene, camera);
  };

  const resize = () => {
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (!width || !height) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    roll = narrow.matches ? ROLL_NARROW : 0;
    // Behind the copy the ink is held just under the weight of a rule, so the
    // type keeps its contrast wherever a line crosses it.
    uniforms.uAlpha.value = narrow.matches ? 0.33 : 0.32;
    const next = build();
    lines.geometry = next;
    geometry.dispose();
    geometry = next;
    measure();
    render();
  };

  const tick = (now: number) => {
    const delta = last ? Math.min((now - last) / 1000, 0.05) : 0;
    last = now;
    elapsed += delta;
    // A window can move to a denser screen, or the zoom can change, without the
    // element ever resizing; the ratio is re-checked so the lines stay crisp.
    if (renderer.getPixelRatio() !== Math.min(window.devicePixelRatio || 1, 1.75)) {
      resize();
    }
    uniforms.uTime.value = elapsed;
    easeX += (targetX - easeX) * EASE;
    easeY += (targetY - easeY) * EASE;
    uniforms.uPointer.value.set(easeX * 11, NEAR - easeY * 12);
    measure();
    render();
    frame = requestAnimationFrame(tick);
  };

  const play = () => {
    if (frame || reduceMotion.matches) return;
    last = 0;
    frame = requestAnimationFrame(tick);
  };

  const pause = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };

  // The pointer is read on the window: the field is decorative and never takes
  // a click, and this way the ground lifts while the reader is over the copy.
  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return;
    const box = host.getBoundingClientRect();
    if (!box.width || !box.height) return;
    const across = (event.clientX - box.left) / box.width;
    const down = (event.clientY - box.top) / box.height;
    targetX = Math.min(Math.max((across - 0.5) * 2, -1.6), 1.6);
    targetY = Math.min(Math.max((down - 0.5) * 2, -1.4), 1.4);
  };

  const onPointerLeave = () => {
    targetX = 0;
    targetY = 0;
  };

  const onVisibility = () => {
    if (document.hidden) {
      pause();
      return;
    }
    // A resize can land while the tab is hidden, when no frame is drawn to
    // notice it, so the field re-measures before it starts again.
    resize();
    play();
  };

  const onMotion = () => {
    if (reduceMotion.matches) pause();
    else play();
  };

  // A theme change swaps paper for ink under the ground; the lines follow.
  const onTheme = () => {
    uniforms.uInk.value.copy(resolveColour(token('--color-accent'), '#3a4a86'));
    uniforms.uPaper.value.copy(resolveColour(token('--color-paper'), '#f9f3e8'));
    render();
  };

  const seen = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) play();
      else pause();
    },
    { threshold: 0 }
  );
  seen.observe(host);

  const sized = new ResizeObserver(resize);
  sized.observe(host);

  const themed = new MutationObserver(onTheme);
  themed.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  narrow.addEventListener('change', resize);

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerout', onPointerLeave);
  document.addEventListener('visibilitychange', onVisibility);
  reduceMotion.addEventListener('change', onMotion);

  resize();
  play();

  return () => {
    pause();
    seen.disconnect();
    sized.disconnect();
    themed.disconnect();
    narrow.removeEventListener('change', resize);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerout', onPointerLeave);
    document.removeEventListener('visibilitychange', onVisibility);
    reduceMotion.removeEventListener('change', onMotion);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
}
