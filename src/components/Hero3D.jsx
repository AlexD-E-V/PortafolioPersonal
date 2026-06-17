/* ============================================================
   Hero 3D — Sistema orbital de tecnologías (Three.js)
   Núcleo con glow gravitacional + planetas orbitando + starfield.
   v1.0.0: capa de fondo ambiental a ancho completo del hero.
   El sistema se escala y desplaza dinámicamente para llegar
   hasta el borde derecho del viewport SIN recortarse.
   ============================================================ */

import React from 'react';
import * as THREE from 'three';
import { HERO_PLANETS } from '../data/planets.js';

const CAT_COLORS = {
  web: 0x5aa3d9,
  apps: 0x8ec5e8,
  games: 0xf4b860,
  xr: 0xd9a3f0,
  backend: 0x7fd4b8,
  tools: 0xa7b0c0
};

function makeGlowTexture(inner, outer) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, inner);
  g.addColorStop(0.4, outer);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

export function Hero3D({ lang, onPlanetClick, reducedMotion }) {
  const wrapRef = React.useRef(null);
  const [tooltip, setTooltip] = React.useState(null); // {x, y, name, cat}
  const stateRef = React.useRef({});

  React.useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // Solo el teléfono (≤767px) usa el layout apilado/reducido; tablet y
    // desktop comparten el comportamiento de fondo ambiental imponente.
    const isPhone = window.matchMedia('(max-width: 767px)').matches;
    const planets = isPhone ? HERO_PLANETS.slice(0, 5) : HERO_PLANETS;
    const maxRadius = Math.max(...planets.map((p) => p.radius));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 3.2, 10.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    wrap.appendChild(renderer.domElement);

    const system = new THREE.Group();
    scene.add(system);

    // --- Núcleo central: esfera + glow gravitacional ---
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.62, 48, 48),
      new THREE.MeshBasicMaterial({ color: 0x0a1220 })
    );
    system.add(core);

    const coreRim = new THREE.Mesh(
      new THREE.SphereGeometry(0.66, 48, 48),
      new THREE.MeshBasicMaterial({ color: 0x3981bf, transparent: true, opacity: 0.35, side: THREE.BackSide })
    );
    system.add(coreRim);

    const glowMat = new THREE.SpriteMaterial({
      map: makeGlowTexture('rgba(90,163,217,0.9)', 'rgba(57,129,191,0.25)'),
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
    });
    const coreGlow = new THREE.Sprite(glowMat);
    coreGlow.scale.set(3.4, 3.4, 1);
    system.add(coreGlow);

    const goldGlow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeGlowTexture('rgba(244,184,96,0.5)', 'rgba(244,184,96,0.08)'),
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
    }));
    goldGlow.scale.set(1.9, 1.9, 1);
    system.add(goldGlow);

    // --- Logo en el centro del sistema (idea original: el logo vive en el núcleo) ---
    // Oculto por defecto; aparece (fade in + pulso) al hacer hover sobre el núcleo.
    const logoTex = new THREE.TextureLoader().load('/brand/iso.png');
    if ('colorSpace' in logoTex) logoTex.colorSpace = THREE.SRGBColorSpace;
    const LOGO_RATIO = 292 / 214; // proporción del iso.png
    const LOGO_H = 1.3;
    const logoSprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: logoTex, transparent: true, depthWrite: false, depthTest: false, opacity: 0
    }));
    logoSprite.scale.set(LOGO_H * LOGO_RATIO, LOGO_H, 1);
    logoSprite.position.y = 0.038;
    logoSprite.position.x = -0.014 // centra el contenido visual del PNG sobre el núcleo
    logoSprite.renderOrder = 10; // siempre por encima del glow
    system.add(logoSprite);

    // Esfera invisible: área de hover del núcleo que revela el logo
    const coreHit = new THREE.Mesh(
      new THREE.SphereGeometry(1.1, 16, 16),
      new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false })
    );
    system.add(coreHit);

    // Disco de acreción sutil (anillo plano)
    const disc = new THREE.Mesh(
      new THREE.RingGeometry(0.85, 1.45, 64),
      new THREE.MeshBasicMaterial({
        color: 0x3981bf, transparent: true, opacity: 0.18,
        side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false
      })
    );
    disc.rotation.x = -Math.PI / 2.15;
    system.add(disc);

    // --- Órbitas ---
    planets.forEach((p) => {
      const pts = [];
      for (let i = 0; i <= 90; i++) {
        const a = (i / 90) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * p.radius, 0, Math.sin(a) * p.radius));
      }
      const orbit = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.06 })
      );
      system.add(orbit);
    });

    // --- Planetas ---
    const planetMeshes = planets.map((p) => {
      const color = CAT_COLORS[p.cat] || CAT_COLORS.web;
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(p.size, 32, 32),
        new THREE.MeshStandardMaterial({
          color, roughness: 0.5, metalness: 0.15,
          emissive: color, emissiveIntensity: 0.25
        })
      );
      mesh.userData = p;
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({
        map: makeGlowTexture(
          p.cat === 'games' ? 'rgba(244,184,96,0.55)' : 'rgba(90,163,217,0.55)',
          'rgba(0,0,0,0)'
        ),
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
      }));
      glow.scale.set(p.size * 5, p.size * 5, 1);
      mesh.add(glow);
      system.add(mesh);
      return mesh;
    });

    // --- Starfield ---
    if (!isPhone) {
      const starGeo = new THREE.BufferGeometry();
      const N = 260;
      const pos = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 40;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 26;
        pos[i * 3 + 2] = -8 - Math.random() * 22;
      }
      starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({
        color: 0xaac4dd, size: 0.05, transparent: true, opacity: 0.7
      })));
    }

    scene.add(new THREE.AmbientLight(0x405a78, 1.4));
    const keyLight = new THREE.PointLight(0x5aa3d9, 60, 30);
    keyLight.position.set(0, 0, 0);
    scene.add(keyLight);

    // --- Interacción ---
    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2(-10, -10);
    let parallax = { x: 0, y: 0 }, targetParallax = { x: 0, y: 0 };
    let hovered = null;
    let logoOpacity = 0;

    function resize() {
      const w = wrap.clientWidth, h = wrap.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      // Encaje sin recortes: el sistema se escala según el ancho
      // visible y se desplaza para tocar el borde derecho.
      const halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const halfW = halfH * camera.aspect;
      // Sistema grande e imponente; las órbitas pueden salirse de los
      // márgenes (los planetas reaparecen al girar).
      // - Teléfono: centrado en su propio espacio apilado.
      // - Tablet/desktop: núcleo en el centro-derecha, desbordando por la
      //   derecha; lo que cae a la izquierda queda detrás del texto.
      // Se reevalúa el breakpoint EN CADA resize (no solo al montar) para
      // que escala/posición sigan correctas al redimensionar o rotar.
      const phoneNow = window.matchMedia('(max-width: 767px)').matches;
      const fitScale = phoneNow
        ? (halfW * 1.55) / maxRadius
        : (halfW * 1.0) / maxRadius;
      system.scale.setScalar(fitScale);
      system.position.x = phoneNow ? 0 : halfW * 0.46;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    function onMove(e) {
      const r = wrap.getBoundingClientRect();
      mouseNDC.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouseNDC.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      if (!isPhone) {
        targetParallax.x = mouseNDC.x * 0.12;
        targetParallax.y = mouseNDC.y * 0.08;
      }
    }
    function onLeave() {
      mouseNDC.set(-10, -10);
      targetParallax = { x: 0, y: 0 };
    }
    function onClick() {
      if (hovered) onPlanetClick && onPlanetClick(hovered.userData.id);
    }
    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);
    wrap.addEventListener('click', onClick);

    // --- Animación ---
    let rafId = null;
    let t = reducedMotion ? 12 : 0;
    let running = true;
    const clock = new THREE.Clock();

    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
    });
    io.observe(wrap);

    function frame() {
      rafId = requestAnimationFrame(frame);
      if (!running) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!reducedMotion) t += dt;

      system.rotation.y = t * 0.045; // ~vuelta completa lenta
      const corePulse = 1 + Math.sin(t * 1.4) * 0.03;
      core.scale.setScalar(corePulse);
      logoSprite.scale.set(LOGO_H * LOGO_RATIO * corePulse, LOGO_H * corePulse, 1);
      coreGlow.scale.setScalar(3.4 + Math.sin(t * 1.1) * 0.18);
      disc.rotation.z = t * 0.1;

      planetMeshes.forEach((m) => {
        const p = m.userData;
        const a = p.phase + t * p.speed * 0.22;
        m.position.set(Math.cos(a) * p.radius, Math.sin(a * 0.7 + p.phase) * 0.12, Math.sin(a) * p.radius);
      });

      parallax.x += (targetParallax.x - parallax.x) * 0.04;
      parallax.y += (targetParallax.y - parallax.y) * 0.04;
      camera.position.x = parallax.x * 3;
      camera.position.y = 3.2 + parallax.y * 1.6;
      camera.lookAt(0, 0, 0);

      // Hover por raycasting
      raycaster.setFromCamera(mouseNDC, camera);

      // Hover sobre el núcleo → revela el logo con fade (in/out a opacidad 0)
      const coreHover = raycaster.intersectObject(coreHit, false).length > 0;
      logoOpacity += ((coreHover ? 1 : 0) - logoOpacity) * 0.12;
      logoSprite.material.opacity = logoOpacity < 0.005 ? 0 : logoOpacity;

      const hits = raycaster.intersectObjects(planetMeshes, false);
      const hit = hits.length ? hits[0].object : null;
      if (hit !== hovered) {
        if (hovered) {
          hovered.scale.setScalar(1);
          hovered.material.emissiveIntensity = 0.25;
        }
        hovered = hit;
        if (hovered) {
          hovered.scale.setScalar(1.22);
          hovered.material.emissiveIntensity = 0.7;
        }
        planetMeshes.forEach((m) => {
          m.material.opacity = hovered && m !== hovered ? 0.45 : 1;
          m.material.transparent = true;
        });
        wrap.style.cursor = hovered ? 'pointer' : '';
      }
      if (hovered) {
        const v = hovered.position.clone();
        system.localToWorld(v);
        v.project(camera);
        const r = wrap.getBoundingClientRect();
        stateRef.current.tt = {
          x: (v.x * 0.5 + 0.5) * r.width,
          y: (-v.y * 0.5 + 0.5) * r.height,
          name: hovered.userData.name,
          cat: hovered.userData.cat
        };
      } else {
        stateRef.current.tt = null;
      }
      // Throttle del estado del tooltip a React
      if (JSON.stringify(stateRef.current.tt) !== stateRef.current.lastTT) {
        stateRef.current.lastTT = JSON.stringify(stateRef.current.tt);
        setTooltip(stateRef.current.tt);
      }

      renderer.render(scene, camera);
    }
    frame();

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      ro.disconnect();
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
      wrap.removeEventListener('click', onClick);
      renderer.dispose();
      if (renderer.domElement.parentNode === wrap) wrap.removeChild(renderer.domElement);
    };
  }, [reducedMotion]);

  const catLabel = {
    web: { es: 'Web', en: 'Web' },
    apps: { es: 'Apps', en: 'Apps' },
    games: { es: 'Videojuegos', en: 'Games' },
    xr: { es: 'VR/AR', en: 'VR/AR' },
    backend: { es: 'Backend', en: 'Backend' },
    tools: { es: 'Herramientas', en: 'Tools' }
  };

  return (
    <div className="hero-3d-wrap" ref={wrapRef} aria-hidden="true">
      {tooltip && (
        <div className="hero-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          <span>{tooltip.name}</span>{' '}
          <span className="tt-cat">· {(catLabel[tooltip.cat] || catLabel.web)[lang]}</span>
        </div>
      )}
    </div>
  );
}
