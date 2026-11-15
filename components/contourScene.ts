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
 * A phone gets a different surface from the same lines: the camera sits level
 * so half the layer is paper and the lower half is water, with ripples
 * travelling out from two drifting centres and the whole surface leaning with
 * the phone's own tilt. A desk keeps the ground, aimed below the horizon so it
 * fills the hero with no sky line to cut across the copy.
 */

const ROWS = 72;
const ROWS_WATER = 58;
const SEGMENTS = 220;
const NEAR = 3.5;
const FAR = -60;

const CAM_Y = 2.8;
const CAM_Z = 9;
const LOOK_Y = -1.2;
const LOOK_Z = -5;

const PARALLAX_X = 1.8;
const PARALLAX_Y = 0.7;
const PARALLAX_LOOK = 0.9;
const EASE = 0.09;

// A phone's tilt is read against the pose it was first held in, so the water is
// level for however the reader happens to be holding the page.
const TILT_ACROSS = 24;
const TILT_DOWN = 32;
const TILT_LIMIT = 1.3;

const VERTEX = `
  uniform float uTime;
  uniform float uScroll;
  uniform float uWater;
  uniform vec2 uPointer;
  uniform vec2 uRipple1;
  uniform vec2 uRipple2;
  uniform float uPush;
  uniform float uReach;
  varying float vDepth;

  void main() {
    vec3 p = position;
    float z = p.z + uScroll;

    // Distance flattens the surface, as it does in life. Without this the far
    // rows are closer to each other than their own waves and cross into a
    // tangle; with it the top of the field reads as fine, calm texture.
    float away = length(vec3(p.x, 0.0, p.z) - cameraPosition);
    float damp = clamp(away / 16.0, 0.08, 1.0);
    float h;

    if (uWater > 0.5) {
      // Water: two sets of rings spreading from slowly drifting centres, over a
      // long swell, so the rows read as a surface with crests rather than as
      // terrain. The rings thin out with distance and the far water calms.
      vec2 q = vec2(p.x, z);
      float r1 = length(q - uRipple1);
      float r2 = length(q - uRipple2);
      float swell = 0.34 * sin(0.24 * p.x + 0.17 * z + uTime * 0.5);
      float rings =
        0.62 * sin(r1 * 1.85 - uTime * 1.3) * exp(-r1 * 0.05) +
        0.34 * sin(r2 * 2.75 - uTime * 1.85) * exp(-r2 * 0.08);
      h = 0.5 * (swell + rings) * clamp(away / 13.0, 0.16, 1.0);
    } else {
      float waves =
        0.95 * sin(0.42 * p.x + 0.50 * z + uTime * 0.22) +
        0.52 * sin(0.74 * z - 0.31 * p.x - uTime * 0.15) +
        0.24 * sin(1.24 * p.x + 0.86 * z + uTime * 0.10);
      h = waves * damp;
    }

    // The surface lifts away from the pointer and settles back behind it.
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
  let water = narrow.matches;

  // The ground is shaped to the frustum: each row is only as wide as the frame
  // at its depth, so no row ends inside the picture, and the rows run past the
  // horizon instead of stopping in mid air. The margin covers the parallax and
  // the roll, which swing the frame across the ground.
  const build = (rows: number) => {
    const halfAngle = Math.atan(Math.tan((camera.fov * Math.PI) / 360) * camera.aspect);
    const positions: number[] = [];

    // Rows are spaced evenly down the screen rather than evenly into the
    // distance: a linear spread piles nine rows in ten at the horizon and
    // leaves the floor under the copy bare. Spacing them by distance instead
    // fills the frame, and the waves still read as depth because they grow
    // finer towards the top.
    const nearInverse = 1 / (CAM_Z - NEAR);
    const farInverse = 1 / (CAM_Z - FAR);

    for (let row = 0; row < rows; row += 1) {
      const t = row / (rows - 1);
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

  let geometry = build(water ? ROWS_WATER : ROWS);

  const uniforms = {
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uWater: { value: water ? 1 : 0 },
    uPointer: { value: new Vector2(0, -14) },
    uRipple1: { value: new Vector2(-2.2, 2.4) },
    uRipple2: { value: new Vector2(3.1, -1.8) },
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
  let tilting = false;

  const aim = () => {
    if (water) {
      // Level on a phone, so the horizon sits on the layer's midline: paper
      // above the waterline, water below, and the tilt is the only thing that
      // moves it.
      camera.position.set(easeX * 2.4, CAM_Y + easeY * 0.5, CAM_Z);
      camera.lookAt(easeX * 0.8, CAM_Y - easeY * 0.35, LOOK_Z);
      camera.rotateZ(easeX * 0.1);
      return;
    }
    // Aimed below the horizon, so the ground fills the hero instead of leaving
    // a sky line to cut across the copy.
    camera.position.set(easeX * PARALLAX_X, CAM_Y + easeY * PARALLAX_Y, CAM_Z);
    camera.lookAt(easeX * PARALLAX_LOOK, LOOK_Y, LOOK_Z);
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
    water = narrow.matches;
    uniforms.uWater.value = water ? 1 : 0;
    // Behind the copy the ink is held just under the weight of a rule, so the
    // type keeps its contrast wherever a line crosses it.
    uniforms.uAlpha.value = water ? 0.3 : 0.32;
    const next = build(water ? ROWS_WATER : ROWS);
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
    // The ripple centres drift on their own and lean with the tilt, so the
    // water is alive before the phone is ever moved.
    const shift = uniforms.uScroll.value;
    uniforms.uRipple1.value.set(-2.2 + easeX * 2.6, 2.4 + Math.sin(elapsed * 0.12) * 0.9 + shift);
    uniforms.uRipple2.value.set(3.1 - easeX * 1.8, -1.8 + Math.cos(elapsed * 0.09) * 1.1 + shift);
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
    if (tilting) return;
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

  // On a phone the surface leans with the device, read against the pose it was
  // first held in so the water is level for however the reader holds the page.
  let baseAcross: number | null = null;
  let baseDown: number | null = null;
  let listening = false;

  const onOrient = (event: DeviceOrientationEvent) => {
    if (event.gamma == null || event.beta == null) return;
    if (!tilting) {
      // The pose the page was opened in is the level one.
      tilting = true;
      baseAcross = event.gamma;
      baseDown = event.beta;
      return;
    }
    const across = (event.gamma - (baseAcross ?? 0)) / TILT_ACROSS;
    const down = (event.beta - (baseDown ?? 0)) / TILT_DOWN;
    targetX = Math.min(Math.max(across, -TILT_LIMIT), TILT_LIMIT);
    targetY = Math.min(Math.max(down, -TILT_LIMIT), TILT_LIMIT);
  };

  const listen = () => {
    if (listening) return;
    listening = true;
    window.addEventListener('deviceorientation', onOrient, { passive: true });
    // Some Android builds only ever report the absolute sensor.
    window.addEventListener(
      'deviceorientationabsolute',
      onOrient as unknown as EventListener,
      { passive: true }
    );
  };

  const motion = window.DeviceOrientationEvent as unknown as
    | { requestPermission?: () => Promise<string> }
    | undefined;

  const stopAsking = () => {
    window.removeEventListener('touchstart', ask);
    window.removeEventListener('touchend', ask);
    window.removeEventListener('pointerup', ask);
    window.removeEventListener('click', ask);
  };

  // iOS hands out motion only from a gesture, and only while it's granted. The
  // page asks on every tap until it is, so a dismissed prompt isn't the end of
  // the tilt.
  function ask() {
    if (!motion?.requestPermission) return;
    motion
      .requestPermission()
      .then((answer) => {
        if (answer !== 'granted') return;
        listen();
        stopAsking();
      })
      .catch(() => undefined);
  }

  // A finger on the water is the fallback: a phone can be missing the sensor,
  // and a page served over plain HTTP is never given it at all.
  const onTouchMove = (event: TouchEvent) => {
    if (tilting) return;
    const touch = event.touches[0];
    if (!touch) return;
    const box = host.getBoundingClientRect();
    if (!box.width || !box.height) return;
    const across = (touch.clientX - box.left) / box.width;
    const down = (touch.clientY - box.top) / box.height;
    targetX = Math.min(Math.max((across - 0.5) * 2.6, -1.3), 1.3);
    targetY = Math.min(Math.max((down - 0.5) * 2.4, -1.2), 1.2);
  };

  if (water) {
    if (motion?.requestPermission) {
      // Safari grants activation on touchstart, so the prompt can arrive on the
      // reader's first touch rather than waiting for a tap to finish.
      window.addEventListener('touchstart', ask, { passive: true });
      window.addEventListener('touchend', ask, { passive: true });
      window.addEventListener('pointerup', ask, { passive: true });
      window.addEventListener('click', ask);
    } else {
      listen();
    }
    window.addEventListener('touchmove', onTouchMove, { passive: true });
  }

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
    window.removeEventListener('deviceorientation', onOrient);
    window.removeEventListener('deviceorientationabsolute', onOrient as unknown as EventListener);
    window.removeEventListener('touchstart', ask);
    window.removeEventListener('touchend', ask);
    window.removeEventListener('pointerup', ask);
    window.removeEventListener('click', ask);
    window.removeEventListener('touchmove', onTouchMove);
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
