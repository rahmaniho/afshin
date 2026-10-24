import React, { useEffect, useRef, useState, useCallback } from 'react';
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

export interface ProjectItem {
  id: string;
  title: string;
  location: string;
  type: string;
  season: string;
  sqft: string;
  blurb: string;
  image: string;
}

export const galleryProjects: ProjectItem[] = [
  {
    id: 'leaf-diagnosis',
    title: 'بررسی لکه‌های برگ',
    location: 'مزرعه و باغ',
    type: 'تشخیص بیماری',
    season: 'راهنمای تصویری',
    sqft: 'پایش برگ',
    blurb: 'لکه، هالهٔ رنگی و تغییر بافت برگ از علائم مهم برای شروع بررسی هستند. ثبت محل علائم و مقایسهٔ برگ‌های سالم و آلوده، مسیر تشخیص را روشن‌تر می‌کند.',
    image: '/images/leaf-disease.webp',
  },
  {
    id: 'pest-scouting',
    title: 'بازدید و پایش مزرعه',
    location: 'قزوین و زنجان',
    type: 'آفات‌شناسی',
    season: 'پایش دوره‌ای',
    sqft: 'ثبت علائم',
    blurb: 'بازدید منظم از چند نقطهٔ مزرعه و ثبت جمعیت آفات، به تصمیم‌گیری به‌موقع و جلوگیری از کنترل‌های غیرضروری کمک می‌کند.',
    image: '/images/wheat-inspection.webp',
  },
  {
    id: 'seed-selection',
    title: 'ارزیابی رقم و کیفیت بذر',
    location: 'مناطق سرد و نیمه‌سرد',
    type: 'بذر و اقلیم',
    season: 'پیش از کاشت',
    sqft: 'انتخاب رقم',
    blurb: 'انتخاب بذر با توجه به اقلیم، تاریخ کاشت، طول دورهٔ رشد و کیفیت جوانه‌زنی انجام می‌شود؛ عملکرد رقم در یک منطقه، معیار کافی برای همهٔ مزرعه‌ها نیست.',
    image: '/images/wheat-seed.webp',
  },
  {
    id: 'orchard-review',
    title: 'نگاه کلی به ساختار باغ',
    location: 'البرز و تهران',
    type: 'پایش باغ',
    season: 'چهار فصل',
    sqft: 'مزرعه و باغ',
    blurb: 'آشنایی با الگوی کاشت، وضعیت ردیف‌ها و شرایط کلی باغ، بخش مهمی از برنامه‌ریزی بازدید و نمونه‌برداری است. تصویر هوایی می‌تواند ناهماهنگی‌های کلی را بهتر نشان دهد.',
    image: '/images/orchard-monitoring.webp',
  },
  {
    id: 'safe-spraying',
    title: 'اجرای کنترل با رعایت ایمنی',
    location: 'مزرعه و گلخانه',
    type: 'کنترل و سم',
    season: 'اجرای مسئولانه',
    sqft: 'رعایت برچسب',
    blurb: 'پس از تشخیص و انتخاب روش کنترل، کالیبراسیون دستگاه، شرایط هوا، تجهیزات حفاظت فردی و دستورهای برچسب باید با دقت رعایت شوند.',
    image: '/images/crop-spraying.webp',
  },
  {
    id: 'rust-diagnosis',
    title: 'نمونه‌برداری از علائم زنگ',
    location: 'مزرعه و باغ',
    type: 'تشخیص بیماری',
    season: 'علائم تازه',
    sqft: 'بررسی نمونه',
    blurb: 'رنگ و محل پوسته‌ها روی برگ و ساقه اطلاعات ارزشمندی برای بررسی بیماری‌های زنگ فراهم می‌کند. نمونهٔ تازه و ثبت شرایط محیطی برای تشخیص دقیق‌تر مفید است.',
    image: '/images/leaf-rust.webp',
  },
];

export const galleryCategories = [
  'همه',
  'تشخیص بیماری',
  'آفات‌شناسی',
  'بذر و اقلیم',
  'پایش باغ',
  'کنترل و سم',
];

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

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
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

    const count = params.bladeCount;
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

    const onPointerMove = (e: MouseEvent) => {
      mouseNorm.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNorm.y = -(e.clientY / window.innerHeight) * 2 + 1;
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

    const animate = () => {
      if (!isRunning) return;
      animId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();
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
      const s = Math.min(scrollProgress, 0.999) * stageCount;
      const currIdx = Math.floor(s);
      const nextIdx = Math.min(currIdx + 1, stageCount);
      const frac = s - currIdx;
      const smoothFrac = frac * frac * (3 - 2 * frac);

      curCamPos.copy(cameraStages[currIdx].pos).lerp(cameraStages[nextIdx].pos, smoothFrac);
      curCamLook.copy(cameraStages[currIdx].look).lerp(cameraStages[nextIdx].look, smoothFrac);

      curCamPos.y += Math.sin(time * 0.4) * 0.04;
      curCamPos.x += Math.sin(time * 0.27) * 0.05;

      camera.position.copy(curCamPos);
      camera.lookAt(curCamLook);

      curSky.setHex(cameraStages[currIdx].sky).lerp(new THREE.Color(cameraStages[nextIdx].sky), smoothFrac);
      curHorizon.setHex(cameraStages[currIdx].horizon).lerp(new THREE.Color(cameraStages[nextIdx].horizon), smoothFrac);

      skyMat.uniforms.uTop.value.copy(curSky);
      skyMat.uniforms.uHorizon.value.copy(curHorizon);
      skyMat.uniforms.uTime.value = time;
      skyMat.uniforms.uCloudAmount.value =
        cameraStages[currIdx].clouds + (cameraStages[nextIdx].clouds - cameraStages[currIdx].clouds) * smoothFrac;

      scene.fog!.color.copy(curSky);
      grassUniforms.uFogColor.value.copy(curSky);

      p.stage = currIdx;

      raycaster.setFromCamera(mouseNorm, camera);
      const hits = raycaster.intersectObject(groundMesh, false);
      if (hits.length > 0) {
        mousePos.copy(hits[0].point);
      } else {
        mousePos.set(9999, 0, 9999);
      }
      grassUniforms.uMouse.value.copy(mousePos);

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

// --- Floating Field Controls Dialog ---
const controlFields: { key: keyof GrassParams; label: string; min: number; max: number; step: number }[] = [
  { key: 'windStrength', label: 'شدت باد', min: 0, max: 1.5, step: 0.01 },
  { key: 'windSpeed', label: 'سرعت باد', min: 0, max: 3, step: 0.01 },
  { key: 'mouseRadius', label: 'شعاع مؤشر', min: 0, max: 6, step: 0.05 },
  { key: 'fogDensity', label: 'غلظت مه', min: 0, max: 0.06, step: 0.001 },
];

export function FieldControls({ paramsRef }: { paramsRef: React.RefObject<GrassParams> }) {
  const [open, setOpen] = useState(false);
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => setTick((v) => v + 1), 250);
    return () => clearInterval(interval);
  }, [open]);

  const updateParam = (key: keyof GrassParams, val: number) => {
    (paramsRef.current as any)[key] = val;
    setTick((v) => v + 1);
  };

  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="تنظیمات مزرعه"
        className="fixed bottom-6 right-6 z-[70] w-12 h-12 flex items-center justify-center rounded-full bg-[#0d1410]/80 backdrop-blur-md border border-[rgba(236,234,216,0.12)] text-[#ecead8] hover:text-[#b8c79c] hover:border-[#b8c79c] transition-colors cursor-pointer"
      >
        <i className={`text-lg ${open ? 'ri-close-line' : 'ri-settings-3-line'}`} />
      </button>

      <div
        className={`fixed bottom-24 right-6 z-[70] w-80 max-w-[calc(100vw-3rem)] rounded-2xl border border-[rgba(236,234,216,0.12)] bg-[#0d1410]/90 backdrop-blur-xl p-6 transition-all duration-300 origin-bottom-right ${
          open ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="font-display text-lg text-[#ecead8]">کنترل‌های مزرعه</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#b7b8a8] mt-1">
              مرحلهٔ {(paramsRef.current.stage + 1).toLocaleString('fa-IR')} از ۷
            </div>
          </div>
          <span className="w-8 h-8 flex items-center justify-center rounded-full border border-[#88a06b]/40 text-[#88a06b]">
            <i className="ri-leaf-line text-sm" />
          </span>
        </div>

        <div className="space-y-5">
          {controlFields.map((field) => {
            const val = paramsRef.current[field.key] as number;
            return (
              <div key={field.key}>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-[#b7b8a8]">{field.label}</label>
                  <span className="text-xs text-[#b8c79c] tabular-nums">
                    {val.toFixed(field.step < 0.01 ? 3 : 2)}
                  </span>
                </div>
                <input
                  type="range"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={val}
                  onChange={(e) => updateParam(field.key, parseFloat(e.target.value))}
                  className="w-full h-1 rounded-full bg-[rgba(236,234,216,0.12)] accent-[#b8c79c] cursor-pointer"
                />
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-5 border-t border-[rgba(236,234,216,0.12)] text-[11px] text-[#b7b8a8] leading-relaxed">
          <i className="ri-information-line text-[#88a06b] mr-1" />
          مکان‌نما را روی صفحه حرکت دهید؛ چمن‌ها با عبور شما کنار می‌روند.
        </div>
      </div>
    </>
  );
}

// --- Full Gallery Modal ---
export function GalleryModal({
  open,
  onClose,
  onQuote,
}: {
  open: boolean;
  onClose: () => void;
  onQuote: () => void;
}) {
  const [filter, setFilter] = useState('همه');
  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = filter === 'همه' ? galleryProjects : galleryProjects.filter((p) => p.type === filter);
  const activeProject = galleryProjects.find((p) => p.id === activeId) ?? null;
  const activeIndex = activeProject ? galleryProjects.findIndex((p) => p.id === activeProject.id) : -1;

  const handleClose = useCallback(() => {
    setActiveId(null);
    onClose();
  }, [onClose]);

  const handleNext = useCallback(() => {
    if (activeIndex >= 0) {
      setActiveId(galleryProjects[(activeIndex + 1) % galleryProjects.length].id);
    }
  }, [activeIndex]);

  const handlePrev = useCallback(() => {
    if (activeIndex >= 0) {
      setActiveId(galleryProjects[(activeIndex - 1 + galleryProjects.length) % galleryProjects.length].id);
    }
  }, [activeIndex]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeId) setActiveId(null);
        else handleClose();
      }
      if (e.key === 'ArrowRight' && activeId) handleNext();
      if (e.key === 'ArrowLeft' && activeId) handlePrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, activeId, handleNext, handlePrev, handleClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-stretch justify-center" role="dialog" aria-modal="true" aria-label="گالری پایش گیاه">
      <div className="absolute inset-0 bg-[#0d1410]/90 backdrop-blur-md" onClick={handleClose} />

      <div className="relative w-full h-full overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
            <div>
              <span className="text-xs tracking-[0.4em] uppercase text-[#88a06b] mb-3 block">· گالری تخصصی گیاهپزشکی</span>
              <h2 className="persian-heading font-display text-4xl md:text-6xl font-light text-[#ecead8]">
                تصاویری برای <em className="italic text-[#c8a96a]">تشخیص و پایش</em>
              </h2>
              <p className="text-[#b7b8a8] text-sm md:text-base max-w-xl mt-4 leading-8">
                مجموعه‌ای از تصاویر آموزشی برای آشنایی با علائم گیاهی، پایش مزرعه و باغ و اصول انتخاب بذر و کنترل. برای مشاهدهٔ توضیحات، هر تصویر را انتخاب کنید.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="self-start md:self-end w-11 h-11 flex items-center justify-center rounded-full border border-[#ecead8]/20 hover:bg-[#ecead8] hover:text-[#0d1410] text-[#ecead8] transition-all cursor-pointer"
              aria-label="بستن گالری"
            >
              <i className="ri-close-line text-xl" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs tracking-wide whitespace-nowrap cursor-pointer transition-all border ${
                  cat === filter
                    ? 'bg-[#ecead8] text-[#0d1410] border-[#ecead8]'
                    : 'border-[#ecead8]/15 text-[#b7b8a8] hover:text-[#ecead8] hover:border-[#ecead8]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="py-24 text-center text-[#b7b8a8] text-sm">
              در این دسته هنوز تصویری ثبت نشده است.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  className="group text-right rounded-2xl overflow-hidden border border-[rgba(236,234,216,0.12)] bg-[#131c16]/60 hover:border-[#88a06b]/40 transition-all cursor-pointer"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0d1410]">
                    <img
                      src={item.image}
                      alt={`${item.title} — ${item.type}`}
                      title={item.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#0d1410]/80 backdrop-blur-sm text-[10px] tracking-[0.2em] uppercase text-[#ecead8]/90 border border-white/10">
                      {item.season}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-[10px] tracking-[0.3em] uppercase text-[#88a06b] mb-2">{item.type}</div>
                    <h4 className="persian-heading font-display text-2xl text-[#ecead8] mb-1">{item.title}</h4>
                    <div className="flex items-center justify-between text-xs text-[#b7b8a8] mt-3">
                      <span className="inline-flex items-center gap-1.5">
                        <i className="ri-map-pin-line" />
                        {item.location}
                      </span>
                      <span className="tabular-nums">{item.sqft}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="mt-14 md:mt-20 flex flex-col md:flex-row items-start md:items-center gap-5 p-6 md:p-8 rounded-2xl border border-[rgba(236,234,216,0.12)] bg-[#131c16]/60">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#88a06b]/15 border border-[#88a06b]/30 shrink-0">
              <i className="ri-seedling-line text-[#88a06b] text-lg" />
            </div>
            <div className="flex-1">
              <p className="font-display italic text-lg md:text-xl text-[#ecead8] leading-snug">
                موضوع موردنظر شما در این تصاویر هست؟
              </p>
              <p className="text-sm text-[#b7b8a8] mt-1">
                جزئیات محصول و علائم را ثبت کنید تا مسیر مناسب برای بررسی و مشاوره مشخص شود.
              </p>
            </div>
            <button
              onClick={() => {
                handleClose();
                onQuote();
              }}
              className="px-6 py-3 rounded-full bg-[#b8c79c] text-[#0d1410] text-sm hover:bg-[#ecead8] transition-all cursor-pointer whitespace-nowrap inline-flex items-center gap-2 font-medium"
            >
              درخواست مشاوره
              <i className="ri-arrow-left-line" />
            </button>
          </div>
        </div>
      </div>

      {activeProject && (
        <div
          className="absolute inset-0 z-[90] bg-[#0d1410]/95 backdrop-blur-md flex items-center justify-center px-4 md:px-12 py-10"
          onClick={() => setActiveId(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveId(null);
            }}
            className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center rounded-full border border-[#ecead8]/20 hover:bg-[#ecead8] hover:text-[#0d1410] text-[#ecead8] transition-all cursor-pointer z-10"
            aria-label="بستن تصویر"
          >
            <i className="ri-close-line text-xl" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-[#ecead8]/20 hover:bg-[#ecead8] hover:text-[#0d1410] text-[#ecead8] transition-all cursor-pointer z-10"
            aria-label="تصویر قبلی"
          >
            <i className="ri-arrow-left-line text-xl" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-[#ecead8]/20 hover:bg-[#ecead8] hover:text-[#0d1410] text-[#ecead8] transition-all cursor-pointer z-10"
            aria-label="تصویر بعدی"
          >
            <i className="ri-arrow-right-line text-xl" />
          </button>

          <div className="relative w-full max-w-6xl flex flex-col gap-5" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#131c16] border border-[rgba(236,234,216,0.12)]">
              <img
                src={activeProject.image}
                alt={`${activeProject.title} — نمای کامل`}
                title={activeProject.title}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-[#88a06b] mb-2">
                  {activeProject.type} · {activeProject.season}
                </div>
                <h3 className="persian-heading font-display text-2xl md:text-3xl text-[#ecead8]">
                  {activeProject.title}
                </h3>
                <p className="text-[#b7b8a8] text-sm max-w-2xl mt-2 leading-7">
                  {activeProject.blurb}
                </p>
              </div>
              <div className="flex items-center gap-5 text-xs text-[#b7b8a8] shrink-0">
                <span className="inline-flex items-center gap-1.5">
                  <i className="ri-map-pin-line" />
                  {activeProject.location}
                </span>
                <span className="tabular-nums">{activeProject.sqft}</span>
                <span className="tabular-nums">
                  {(activeIndex + 1).toLocaleString('fa-IR')} / {galleryProjects.length.toLocaleString('fa-IR')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
