import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// --- Types & Data ---
export interface GrassParams {
  bladeCount: number;
  bladeHeight: number;
  bladeWidth: number;
  windStrength: number;
  windSpeed: number;
  mouseRadius: number;
  fogDensity: number;
  fieldSize: number;
  stage: number;
}

export const initialGrassParams: GrassParams = {
  bladeCount: 40000,
  bladeHeight: 1.2,
  bladeWidth: 0.06,
  windStrength: 0.45,
  windSpeed: 0.9,
  mouseRadius: 2.2,
  fogDensity: 0.018,
  fieldSize: 60,
  stage: 0,
};

const cameraStages = [
  { pos: new THREE.Vector3(0, 1.2, 6), look: new THREE.Vector3(0, 1.2, 0), sky: 0x5e957c, horizon: 0xcfdcd8, clouds: 0.25 },
  { pos: new THREE.Vector3(4, 0.8, 3), look: new THREE.Vector3(0, 0.6, -2), sky: 0x4f8678, horizon: 0xe6ded5, clouds: 0.35 },
  { pos: new THREE.Vector3(-6, 3, 4), look: new THREE.Vector3(0, 0, 0), sky: 0x407868, horizon: 0xe8d4c4, clouds: 0.45 },
  { pos: new THREE.Vector3(0, 8, 0.1), look: new THREE.Vector3(0, 0, 0), sky: 0x386850, horizon: 0xe8ba9a, clouds: 0.4 },
  { pos: new THREE.Vector3(2, 0.4, -5), look: new THREE.Vector3(-2, 0.3, -8), sky: 0x2e543c, horizon: 0xe89b82, clouds: 0.3 },
  { pos: new THREE.Vector3(0, 1.6, -10), look: new THREE.Vector3(0, 1.8, -20), sky: 0x4ea888, horizon: 0xdfec7b, clouds: 1.0 },
  { pos: new THREE.Vector3(0, 4, -15), look: new THREE.Vector3(0, 1, -25), sky: 0x3f904c, horizon: 0xc6e4b2, clouds: 0.85 },
];

const cameraStageColors = cameraStages.map((stage) => ({
  sky: new THREE.Color(stage.sky),
  horizon: new THREE.Color(stage.horizon),
}));

// --- Grass 3D Scene Component ---
export function GrassScene({ paramsRef }: { paramsRef: React.RefObject<GrassParams> }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const params = paramsRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x5e957c);
    scene.fog = new THREE.FogExp2(0xcfdcd8, params.fogDensity);

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 300);
    camera.position.copy(cameraStages[0].pos);
    camera.lookAt(cameraStages[0].look);

    const activateFallback = () => {
      // Keep navigation, dialogs and the stage indicator usable without WebGL.
      container.classList.add('grass-fallback');
      const updateFallbackStage = () => {
        const el = document.documentElement;
        const maxScroll = el.scrollHeight - el.clientHeight;
        const progress = maxScroll > 0 ? THREE.MathUtils.clamp(el.scrollTop / maxScroll, 0, 1) : 0;
        params.stage = Math.min(cameraStages.length - 1, Math.floor(progress * (cameraStages.length - 1)));
      };
      updateFallbackStage();
      window.addEventListener('scroll', updateFallbackStage, { passive: true });
      window.addEventListener('resize', updateFallbackStage);
      return () => {
        container.classList.remove('grass-fallback');
        window.removeEventListener('scroll', updateFallbackStage);
        window.removeEventListener('resize', updateFallbackStage);
      };
    };

    // Preflight the context ourselves so unavailable WebGL does not produce
    // Three.js console errors before the static fallback can be activated.
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2', { antialias: true, alpha: false, powerPreference: 'high-performance' });
    if (!context) return activateFallback();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, context, antialias: true, alpha: false, powerPreference: 'high-performance' });
    } catch {
      return activateFallback();
    }
    const gl = renderer.getContext();
    const debugRendererInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const rendererName = debugRendererInfo
      ? String(gl.getParameter(debugRendererInfo.UNMASKED_RENDERER_WEBGL))
      : '';
    const isSoftwareRenderer = /swiftshader|llvmpipe|software/i.test(rendererName);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSoftwareRenderer ? 0.5 : 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    const hemiLight = new THREE.HemisphereLight(0xfff5ec, 0x1c2418, 0.85);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffdc83, 1.6);
    dirLight.position.set(-8, 12, -6);
    scene.add(dirLight);

    // Sky Dome
    const skyGeom = new THREE.SphereGeometry(180, 32, 16);
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        uTop: { value: new THREE.Color(0x1a2820) },
        uHorizon: { value: new THREE.Color(0xc8aaa0) },
        uTime: { value: 0 },
        uCloudAmount: { value: 0 },
      },
      vertexShader: `
        varying vec3 vPos;
        void main(){
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uTop;
        uniform vec3 uHorizon;
        uniform float uTime;
        uniform float uCloudAmount;
        varying vec3 vPos;

        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float vnoise(vec2 p){
          vec2 i = floor(p); vec2 f = fract(p);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          vec2 u = f*f*(3.0-2.0*f);
          return mix(a, b, u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
        }
        float fbm(vec2 p){
          float v = 0.0; float a = 0.5;
          for(int i=0; i<5; i++){
            v += a * vnoise(p);
            p *= 2.07; a *= 0.5;
          }
          return v;
        }

        void main(){
          vec3 dir = normalize(vPos);
          float h = dir.y;
          float t = smoothstep(-0.1, 0.6, h);
          vec3 col = mix(uHorizon, uTop, t);

          if (uCloudAmount > 0.001 && h > 0.02) {
            vec2 uv = dir.xz / max(dir.y, 0.05);
            uv *= 0.45;
            uv += vec2(uTime * 0.012, uTime * 0.005);
            float n = fbm(uv * 1.3);
            float n2 = fbm(uv * 2.6 - vec2(uTime * 0.018, 0.0));
            float cloud = smoothstep(0.52, 0.78, n) * 0.75 + smoothstep(0.6, 0.9, n2) * 0.35;
            cloud = clamp(cloud, 0.0, 1.0);
            float horizonFade = smoothstep(0.02, 0.25, h);
            cloud *= horizonFade * uCloudAmount;
            vec3 cloudCol = mix(vec3(0.95, 0.97, 1.0), uHorizon, 0.15);
            cloudCol *= 0.85 + 0.15 * smoothstep(0.0, 1.0, n);
            col = mix(col, cloudCol, cloud);
          }

          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
    const skyMesh = new THREE.Mesh(skyGeom, skyMat);
    scene.add(skyMesh);

    // Ground Plane
    const groundGeom = new THREE.PlaneGeometry(400, 400, 1, 1);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x3a4b28, roughness: 1, metalness: 0 });
    const groundMesh = new THREE.Mesh(groundGeom, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.01;
    scene.add(groundMesh);

    // Grass Blade Geometry
    const bladeGeom = new THREE.PlaneGeometry(1, 1, 1, 5);
    const posAttr = bladeGeom.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const y = posAttr.getY(i) + 0.5;
      posAttr.setY(i, y);
      const taper = 1 - y * 0.85;
      posAttr.setX(i, posAttr.getX(i) * taper);
    }
    posAttr.needsUpdate = true;
    bladeGeom.computeVertexNormals();

    // Software WebGL remains visually equivalent, but uses a lighter level of
    // detail so input and native scrolling are not starved by the render loop.
    const count = isSoftwareRenderer ? Math.min(params.bladeCount, 4000) : params.bladeCount;
    const instGeom = new THREE.InstancedBufferGeometry();
    instGeom.index = bladeGeom.index;
    instGeom.attributes.position = bladeGeom.attributes.position;
    instGeom.attributes.uv = bladeGeom.attributes.uv;
    instGeom.attributes.normal = bladeGeom.attributes.normal;

    const offsets = new Float32Array(count * 3);
    const rotations = new Float32Array(count);
    const scales = new Float32Array(count * 2);
    const colors = new Float32Array(count * 3);
    const seeds = new Float32Array(count);

    const baseCol1 = new THREE.Color(0x4a7a36);
    const baseCol2 = new THREE.Color(0x9ec67a);

    for (let i = 0; i < count; i++) {
      const radius = Math.sqrt(Math.random()) * params.fieldSize * 0.5;
      const angle = Math.random() * Math.PI * 2;
      offsets[i * 3 + 0] = Math.cos(angle) * radius;
      offsets[i * 3 + 1] = 0;
      offsets[i * 3 + 2] = Math.sin(angle) * radius;

      rotations[i] = Math.random() * Math.PI * 2;
      scales[i * 2 + 0] = params.bladeHeight * (0.7 + Math.random() * 0.6);
      scales[i * 2 + 1] = params.bladeWidth * (0.75 + Math.random() * 0.5);

      const t = Math.random() * 0.6;
      const c = baseCol1.clone().lerp(baseCol2, t);
      c.offsetHSL(0, (Math.random() - 0.5) * 0.05, (Math.random() - 0.5) * 0.08);
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      seeds[i] = Math.random() * 1000;
    }

    instGeom.setAttribute('aOffset', new THREE.InstancedBufferAttribute(offsets, 3));
    instGeom.setAttribute('aRotation', new THREE.InstancedBufferAttribute(rotations, 1));
    instGeom.setAttribute('aScale', new THREE.InstancedBufferAttribute(scales, 2));
    instGeom.setAttribute('aColor', new THREE.InstancedBufferAttribute(colors, 3));
    instGeom.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seeds, 1));
    instGeom.instanceCount = count;

    const grassUniforms = {
      uTime: { value: 0 },
      uWindStrength: { value: params.windStrength },
      uWindSpeed: { value: params.windSpeed },
      uMouse: { value: new THREE.Vector3(9999, 0, 9999) },
      uMouseRadius: { value: params.mouseRadius },
      uTipColor: { value: new THREE.Color(0xcfe4ba) },
      uFogColor: { value: new THREE.Color(0xcfdcd8) },
      uFogDensity: { value: params.fogDensity },
      uSunDir: { value: new THREE.Vector3(-0.5, 0.8, -0.3).normalize() },
    };

    const grassMat = new THREE.ShaderMaterial({
      uniforms: grassUniforms,
      side: THREE.DoubleSide,
      transparent: false,
      vertexShader: `
        attribute vec3 aOffset;
        attribute float aRotation;
        attribute vec2 aScale;
        attribute vec3 aColor;
        attribute float aSeed;

        uniform float uTime;
        uniform float uWindStrength;
        uniform float uWindSpeed;
        uniform vec3 uMouse;
        uniform float uMouseRadius;

        varying vec3 vColor;
        varying float vHeight;
        varying vec3 vWorldPos;
        varying vec3 vNormal;

        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float noise(vec2 p){
          vec2 i = floor(p); vec2 f = fract(p);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          vec2 u = f*f*(3.0-2.0*f);
          return mix(a, b, u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
        }

        mat2 rot2(float a){ float s=sin(a), c=cos(a); return mat2(c, -s, s, c); }

        void main(){
          vec3 p = position;
          float h = p.y;
          vHeight = h;

          p.x *= aScale.y;
          p.y *= aScale.x;

          float curl = pow(h, 2.0) * 0.35;
          p.z += curl;

          float s = sin(aRotation), c = cos(aRotation);
          p.xz = mat2(c, -s, s, c) * p.xz;

          vec3 worldPos = p + aOffset;

          float t = uTime * uWindSpeed;
          float n = noise(worldPos.xz * 0.18 + vec2(t * 0.6, t * 0.4));
          float n2 = noise(worldPos.xz * 0.55 - vec2(t * 0.9, t * 0.3));
          float windAmp = (n * 0.7 + n2 * 0.3) - 0.5;
          float sway = windAmp * uWindStrength * h * h;

          vec2 windDir = vec2(cos(t * 0.2 + aSeed), sin(t * 0.13 + aSeed * 0.7));
          worldPos.x += windDir.x * sway;
          worldPos.z += windDir.y * sway;

          vec2 toMouse = worldPos.xz - uMouse.xz;
          float d = length(toMouse);
          float infl = smoothstep(uMouseRadius, 0.0, d);
          vec2 push = normalize(toMouse + vec2(0.0001)) * infl * 0.9 * h;
          worldPos.x += push.x;
          worldPos.z += push.y;
          worldPos.y -= infl * 0.25 * h;

          vWorldPos = worldPos;

          vec3 n3 = normalize(vec3(windDir.x * 0.3, 1.0, windDir.y * 0.3));
          vNormal = n3;

          vColor = aColor;
          gl_Position = projectionMatrix * viewMatrix * vec4(worldPos, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec3 vColor;
        varying float vHeight;
        varying vec3 vWorldPos;
        varying vec3 vNormal;

        uniform vec3 uTipColor;
        uniform vec3 uFogColor;
        uniform float uFogDensity;
        uniform vec3 uSunDir;

        void main(){
          vec3 base = vColor * (0.55 + 0.45 * vHeight);
          vec3 col = mix(base, uTipColor, pow(vHeight, 3.0) * 0.55);

          float lambert = max(dot(normalize(vNormal), uSunDir), 0.0);
          col *= 0.55 + 0.45 * lambert;

          float rim = pow(1.0 - max(dot(normalize(vNormal), vec3(0.0, 1.0, 0.0)), 0.0), 2.0);
          col += rim * 0.08 * uTipColor;

          float dist = length(vWorldPos - cameraPosition);
          float fogF = 1.0 - exp(-uFogDensity * uFogDensity * dist * dist);
          col = mix(col, uFogColor, clamp(fogF, 0.0, 1.0));

          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });

    const grassMesh = new THREE.Mesh(instGeom, grassMat);
    grassMesh.frustumCulled = false;
    scene.add(grassMesh);

    const raycaster = new THREE.Raycaster();
    const mouseNorm = new THREE.Vector2(2, 2);
    const mousePos = new THREE.Vector3(9999, 0, 9999);
    let pointerDirty = false;
    let lastRaycastAt = -Infinity;

    const onPointerMove = (e: MouseEvent) => {
      mouseNorm.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNorm.y = -(e.clientY / window.innerHeight) * 2 + 1;
      pointerDirty = true;
    };
    window.addEventListener('pointermove', onPointerMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    let scrollProgress = 0;
    const onScroll = () => {
      const el = document.documentElement;
      const maxScroll = el.scrollHeight - el.clientHeight;
      scrollProgress = maxScroll > 0 ? el.scrollTop / maxScroll : 0;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const curCamPos = new THREE.Vector3();
    const curCamLook = new THREE.Vector3();
    const curSky = new THREE.Color();
    const curHorizon = new THREE.Color();
    const clock = new THREE.Clock();
    let animId = 0;
    let isRunning = true;
    let lastRenderedAt = -Infinity;
    const minimumFrameInterval = isSoftwareRenderer ? 1000 / 12 : 0;

    const animate = (frameTime = performance.now()) => {
      if (!isRunning) return;
      animId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();
      // A modal still needs smooth scrolling and immediate input. Pause the
      // expensive scene behind it without changing the page or camera state.
      if (document.body.style.overflow === 'hidden') return;
      if (frameTime - lastRenderedAt < minimumFrameInterval) return;
      lastRenderedAt = frameTime;

      const p = paramsRef.current;

      grassUniforms.uTime.value = time;
      grassUniforms.uWindStrength.value = p.windStrength;
      grassUniforms.uWindSpeed.value = p.windSpeed;
      grassUniforms.uMouseRadius.value = p.mouseRadius;
      grassUniforms.uFogDensity.value = p.fogDensity;
      if (scene.fog && 'density' in scene.fog) {
        scene.fog.density = p.fogDensity;
      }

      const stageCount = cameraStages.length - 1;
      const s = THREE.MathUtils.clamp(scrollProgress, 0, 1) * stageCount;
      const currIdx = Math.min(Math.floor(s), stageCount);
      const nextIdx = Math.min(currIdx + 1, stageCount);
      const frac = currIdx === stageCount ? 0 : s - Math.floor(s);
      const smoothFrac = frac * frac * (3 - 2 * frac);

      curCamPos.copy(cameraStages[currIdx].pos).lerp(cameraStages[nextIdx].pos, smoothFrac);
      curCamLook.copy(cameraStages[currIdx].look).lerp(cameraStages[nextIdx].look, smoothFrac);

      curCamPos.y += Math.sin(time * 0.4) * 0.04;
      curCamPos.x += Math.sin(time * 0.27) * 0.05;

      camera.position.copy(curCamPos);
      camera.lookAt(curCamLook);

      curSky.copy(cameraStageColors[currIdx].sky).lerp(cameraStageColors[nextIdx].sky, smoothFrac);
      curHorizon.copy(cameraStageColors[currIdx].horizon).lerp(cameraStageColors[nextIdx].horizon, smoothFrac);

      skyMat.uniforms.uTop.value.copy(curSky);
      skyMat.uniforms.uHorizon.value.copy(curHorizon);
      skyMat.uniforms.uTime.value = time;
      skyMat.uniforms.uCloudAmount.value =
        cameraStages[currIdx].clouds + (cameraStages[nextIdx].clouds - cameraStages[currIdx].clouds) * smoothFrac;

      scene.fog!.color.copy(curSky);
      grassUniforms.uFogColor.value.copy(curSky);

      p.stage = currIdx;

      if (pointerDirty || time - lastRaycastAt >= 0.1) {
        raycaster.setFromCamera(mouseNorm, camera);
        const hits = raycaster.intersectObject(groundMesh, false);
        if (hits.length > 0) {
          mousePos.copy(hits[0].point);
        } else {
          mousePos.set(9999, 0, 9999);
        }
        grassUniforms.uMouse.value.copy(mousePos);
        pointerDirty = false;
        lastRaycastAt = time;
      }

      renderer.render(scene, camera);
    };

    animate();

    const onVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animId);
      } else if (!isRunning) {
        isRunning = true;
        clock.start();
        animate();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      renderer.dispose();
      grassMat.dispose();
      skyMat.dispose();
      groundMat.dispose();
      instGeom.dispose();
      bladeGeom.dispose();
      skyGeom.dispose();
      groundGeom.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [paramsRef]);

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />;
}
