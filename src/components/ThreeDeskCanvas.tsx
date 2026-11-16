import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface ThreeDeskCanvasProps {
  onLampToggle?: (isLampOn: boolean) => void;
  reducedMotion?: boolean;
}

interface LooseItem {
  id: string;
  mesh: THREE.Group;
  baseRadius: number; // For collision & scale
  initialRel: { left: number; top: number; rot: number };
  velocity: THREE.Vector3;
  angularVelocity: number;
  isRolling?: boolean;
  alignWithVelocity?: boolean;
  friction: number;
}

export const ThreeDeskCanvas: React.FC<ThreeDeskCanvasProps> = ({
  onLampToggle,
  reducedMotion = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webGlFailed, setWebGlFailed] = useState(false);
  const [lampOn, setLampOn] = useState(true);

  // References across animation and events
  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer | null;
    scene: THREE.Scene | null;
    camera: THREE.OrthographicCamera | null;
    shadowPlane: THREE.Mesh | null;
    spotLight: THREE.SpotLight | null;
    pointLight: THREE.PointLight | null;
    bulbMesh: THREE.Mesh | null;
    shadeInnerMesh: THREE.Mesh | null;
    shadeGroup: THREE.Group | null;
    lampGroup: THREE.Group | null;
    lampBaseMesh: THREE.Mesh | null;
    items: LooseItem[];
    hoveredObject: THREE.Object3D | null;
    draggedItem: LooseItem | null;
    dragPlane: THREE.Plane;
    dragOffset: THREE.Vector3;
    pointerPos: THREE.Vector2;
    lastPointerWorld: THREE.Vector3;
    lastPointerTime: number;
    containerSize: { width: number; height: number };
    isAnimating: boolean;
    lampTransitionProgress: number; // 0 to 1
    lampTargetState: boolean;
    rafId: number | null;
  }>({
    renderer: null,
    scene: null,
    camera: null,
    shadowPlane: null,
    spotLight: null,
    pointLight: null,
    bulbMesh: null,
    shadeInnerMesh: null,
    shadeGroup: null,
    lampGroup: null,
    lampBaseMesh: null,
    items: [],
    hoveredObject: null,
    draggedItem: null,
    dragPlane: new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
    dragOffset: new THREE.Vector3(),
    pointerPos: new THREE.Vector2(),
    lastPointerWorld: new THREE.Vector3(),
    lastPointerTime: 0,
    containerSize: { width: 1920, height: 1080 },
    isAnimating: false,
    lampTransitionProgress: 1,
    lampTargetState: true,
    rafId: null,
  });

  // Toggle Lamp Function
  const toggleLamp = () => {
    const nextState = !lampOn;
    setLampOn(nextState);
    if (onLampToggle) {
      onLampToggle(nextState);
    }
    const s = stateRef.current;
    s.lampTargetState = nextState;
    s.lampTransitionProgress = 0;
    requestRender();
  };

  const requestRender = () => {
    const s = stateRef.current;
    if (!s.isAnimating) {
      s.isAnimating = true;
      s.rafId = requestAnimationFrame(animateLoop);
    }
  };

  const animateLoop = () => {
    const s = stateRef.current;
    if (!s.renderer || !s.scene || !s.camera) {
      s.isAnimating = false;
      return;
    }

    let needsAnotherPass = false;

    // 1. Lamp Light Fade Transition (~300ms)
    if (s.lampTransitionProgress < 1) {
      if (reducedMotion) {
        s.lampTransitionProgress = 1;
      } else {
        s.lampTransitionProgress = Math.min(1, s.lampTransitionProgress + 0.055);
        needsAnotherPass = true;
      }

      const t = s.lampTransitionProgress;
      const factor = s.lampTargetState ? t : 1 - t;

      if (s.spotLight) s.spotLight.intensity = 2.4 * factor;
      if (s.pointLight) s.pointLight.intensity = 1.0 * factor;
      if (s.bulbMesh && s.bulbMesh.material instanceof THREE.MeshStandardMaterial) {
        s.bulbMesh.material.emissiveIntensity = 2.0 * factor;
      }
      if (s.shadeInnerMesh && s.shadeInnerMesh.material instanceof THREE.MeshStandardMaterial) {
        s.shadeInnerMesh.material.emissiveIntensity = 0.5 * factor;
      }
    }

    // 2. Physics / Velocity Damping for Loose Objects
    const W = s.containerSize.width;
    const H = s.containerSize.height;
    const minX = -W * 0.48;
    const maxX = W * 0.48;
    const minZ = -H * 0.48;
    const maxZ = H * 0.48;

    for (const item of s.items) {
      if (item === s.draggedItem) continue;

      const speedSq = item.velocity.lengthSq();
      if (speedSq > 0.0001) {
        needsAnotherPass = true;
        item.mesh.position.add(item.velocity);
        item.velocity.multiplyScalar(item.friction);

        // Rolling rotation for crumpled paper
        if (item.isRolling && !reducedMotion) {
          const dist = Math.sqrt(speedSq);
          const rollAngle = dist / (item.baseRadius || 20);
          item.mesh.rotation.x += item.velocity.z * rollAngle * 0.1;
          item.mesh.rotation.z -= item.velocity.x * rollAngle * 0.1;
        }

        // Align toward travel direction for pen & pencil
        if (item.alignWithVelocity && !reducedMotion) {
          const targetAngle = Math.atan2(item.velocity.x, item.velocity.z);
          item.mesh.rotation.y = THREE.MathUtils.lerp(item.mesh.rotation.y, targetAngle, 0.08);
        }

        // Bounds clamping
        item.mesh.position.x = Math.max(minX, Math.min(maxX, item.mesh.position.x));
        item.mesh.position.z = Math.max(minZ, Math.min(maxZ, item.mesh.position.z));
      } else {
        item.velocity.set(0, 0, 0);
      }
    }

    // 3. Render Scene
    s.renderer.render(s.scene, s.camera);

    if (needsAnotherPass || s.draggedItem) {
      s.rafId = requestAnimationFrame(animateLoop);
    } else {
      s.isAnimating = false;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const rect = container.getBoundingClientRect();
    const width = rect.width || 1200;
    const height = rect.height || 750;
    const s = stateRef.current;
    s.containerSize = { width, height };

    // --- WebGL Initialization with Graceful Fallback ---
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.9;
      s.renderer = renderer;
    } catch {
      setWebGlFailed(true);
      return;
    }

    const scene = new THREE.Scene();
    s.scene = scene;

    // Camera setup tilted ~58° from horizontal
    const tiltDeg = 58;
    const tiltRad = (tiltDeg * Math.PI) / 180;
    const camDist = 1200;
    const camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      1,
      4000
    );
    camera.position.set(0, camDist * Math.sin(tiltRad), camDist * Math.cos(tiltRad));
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    s.camera = camera;

    // RoomEnvironment for realistic metal reflections without HDR files
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    scene.environmentIntensity = 0.25;

    // Table Plane at y=0 with ShadowMaterial (transparent, receives soft shadows only)
    const shadowGeo = new THREE.PlaneGeometry(width * 2, height * 2);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.35 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);
    s.shadowPlane = shadowPlane;

    // Ambient/Hemisphere Light (dark warm fill)
    const hemiLight = new THREE.HemisphereLight(0x3a2e22, 0x140e09, 0.45);
    scene.add(hemiLight);

    // =========================================================================
    // 1. PROCEDURAL VINTAGE DESK LAMP (three.js)
    // =========================================================================
    const lampGroup = new THREE.Group();
    s.lampGroup = lampGroup;

    // Materials
    const darkBronzeMat = new THREE.MeshStandardMaterial({
      color: 0x1c1713,
      metalness: 0.8,
      roughness: 0.35,
    });
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af62,
      metalness: 0.85,
      roughness: 0.25,
    });
    const ivoryInteriorMat = new THREE.MeshStandardMaterial({
      color: 0xf5ecd7,
      roughness: 0.6,
      emissive: 0x443015,
      emissiveIntensity: 0.5,
      side: THREE.BackSide,
    });
    s.shadeInnerMesh = null; // will track

    // Base: weighted circular stepped base
    const baseRadius = width * 0.035 * 0.5; // base diameter ~3.5%
    const baseHeight = 9;
    const baseGeo = new THREE.CylinderGeometry(baseRadius * 0.88, baseRadius, baseHeight, 36);
    const baseMesh = new THREE.Mesh(baseGeo, darkBronzeMat);
    baseMesh.position.y = baseHeight / 2;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    lampGroup.add(baseMesh);
    s.lampBaseMesh = baseMesh;

    // Base brass trim ring
    const brassRingGeo = new THREE.TorusGeometry(baseRadius * 0.96, 1.2, 12, 36);
    const brassRingMesh = new THREE.Mesh(brassRingGeo, brassMat);
    brassRingMesh.rotation.x = Math.PI / 2;
    brassRingMesh.position.y = 2;
    lampGroup.add(brassRingMesh);

    // Articulated Arm Lower Struts & Pivot
    const lowerPivot = new THREE.Group();
    lowerPivot.position.set(0, baseHeight, 0);
    lampGroup.add(lowerPivot);

    const knuckleGeo = new THREE.SphereGeometry(4, 16, 16);
    const knuckleMesh = new THREE.Mesh(knuckleGeo, brassMat);
    lowerPivot.add(knuckleMesh);

    const armLength1 = height * 0.11;
    const strutGeo = new THREE.CylinderGeometry(1.6, 1.6, armLength1, 16);
    const strutMesh = new THREE.Mesh(strutGeo, darkBronzeMat);
    strutMesh.position.set(-6, armLength1 / 2, 0);
    strutMesh.rotation.z = -0.22; // leaning toward center
    strutMesh.castShadow = true;
    lowerPivot.add(strutMesh);

    // Elbow Joint with brass wing nut
    const elbowPivot = new THREE.Group();
    elbowPivot.position.set(-18, armLength1 * 0.95, 0);
    lowerPivot.add(elbowPivot);

    const elbowMesh = new THREE.Mesh(new THREE.SphereGeometry(4.5, 16, 16), brassMat);
    elbowPivot.add(elbowMesh);

    // Upper Arm Strut
    const armLength2 = height * 0.09;
    const upperStrutMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, armLength2, 16), darkBronzeMat);
    upperStrutMesh.position.set(-12, armLength2 / 2, 0);
    upperStrutMesh.rotation.z = -0.38;
    upperStrutMesh.castShadow = true;
    elbowPivot.add(upperStrutMesh);

    // Shade Group (Lathe dome cone profile, tilted ~15° toward center)
    const shadeGroup = new THREE.Group();
    shadeGroup.position.set(-28, armLength2 * 0.92, 0);
    shadeGroup.rotation.z = -0.26; // Tilted toward desk center
    elbowPivot.add(shadeGroup);
    s.shadeGroup = shadeGroup;

    // Lathe Profile for Shade
    const lathePoints: THREE.Vector2[] = [
      new THREE.Vector2(3, 14),
      new THREE.Vector2(7, 12),
      new THREE.Vector2(14, 8),
      new THREE.Vector2(22, 2),
      new THREE.Vector2(27, -6),
      new THREE.Vector2(29, -12),
    ];
    const shadeGeo = new THREE.LatheGeometry(lathePoints, 32);

    // Outer shade
    const shadeOuter = new THREE.Mesh(shadeGeo, darkBronzeMat);
    shadeOuter.castShadow = true;
    shadeGroup.add(shadeOuter);

    // Inner shade (ivory reflective)
    const shadeInner = new THREE.Mesh(shadeGeo, ivoryInteriorMat);
    shadeGroup.add(shadeInner);
    s.shadeInnerMesh = shadeInner;

    // Brass rim ring on shade mouth
    const shadeRim = new THREE.Mesh(new THREE.TorusGeometry(29, 1.2, 12, 32), brassMat);
    shadeRim.position.y = -12;
    shadeRim.rotation.x = Math.PI / 2;
    shadeGroup.add(shadeRim);

    // Small warm-white bulb
    const bulbGeo = new THREE.SphereGeometry(3.5, 16, 16);
    const bulbMat = new THREE.MeshStandardMaterial({
      color: 0xfffcf0,
      emissive: 0xffeaad,
      emissiveIntensity: 2.0,
      roughness: 0.2,
    });
    const bulbMesh = new THREE.Mesh(bulbGeo, bulbMat);
    bulbMesh.position.set(0, -5, 0);
    shadeGroup.add(bulbMesh);
    s.bulbMesh = bulbMesh;

    // PointLight at bulb
    const pointLight = new THREE.PointLight(0xffd188, 1.0, 150, 2);
    pointLight.position.set(0, -6, 0);
    shadeGroup.add(pointLight);
    s.pointLight = pointLight;

    // SpotLight (lamp light pool aimed at desk around 76% / 34%)
    const spotLight = new THREE.SpotLight(0xffb866, 2.4, 0, Math.PI * 0.28, 0.85, 2);
    spotLight.position.set(0, -6, 0);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.bias = -0.0004;

    const spotTarget = new THREE.Object3D();
    scene.add(spotTarget);
    spotLight.target = spotTarget;
    shadeGroup.add(spotLight);
    s.spotLight = spotLight;

    scene.add(lampGroup);

    // =========================================================================
    // 2. LOOSE PROCEDURAL OBJECTS (three.js)
    // =========================================================================
    const items: LooseItem[] = [];

    // Helper: Position converter from container percentages to table plane (x, z)
    const relToWorld = (leftPct: number, topPct: number) => {
      const screenX = width * (leftPct / 100);
      const screenY = height * (topPct / 100);
      const worldX = screenX - width / 2;
      const worldZ = (screenY - height / 2) / Math.sin(tiltRad);
      return { worldX, worldZ };
    };

    // --- ITEM 1: Pen (Dark navy + brass clip) ---
    const penGroup = new THREE.Group();
    const penLen = width * 0.09;
    const penRadius = 3.2;
    const penBodyGeo = new THREE.CylinderGeometry(penRadius, penRadius, penLen * 0.75, 18);
    const penBodyMat = new THREE.MeshStandardMaterial({
      color: 0x0f1c2e,
      roughness: 0.18,
      metalness: 0.1,
    });
    const penBody = new THREE.Mesh(penBodyGeo, penBodyMat);
    penBody.castShadow = true;
    penGroup.add(penBody);

    // Cone tip
    const penTipGeo = new THREE.ConeGeometry(penRadius, penLen * 0.18, 18);
    const penTip = new THREE.Mesh(penTipGeo, brassMat);
    penTip.position.y = penLen * 0.75 / 2 + (penLen * 0.18) / 2;
    penTip.castShadow = true;
    penGroup.add(penTip);

    // Brass clip
    const clipGeo = new THREE.BoxGeometry(1.6, penLen * 0.35, 1.2);
    const penClip = new THREE.Mesh(clipGeo, brassMat);
    penClip.position.set(0, -penLen * 0.15, penRadius + 0.8);
    penClip.castShadow = true;
    penGroup.add(penClip);

    penGroup.rotation.x = Math.PI / 2;
    penGroup.position.y = penRadius;
    scene.add(penGroup);
    items.push({
      id: 'pen',
      mesh: penGroup,
      baseRadius: penLen * 0.5,
      initialRel: { left: 12, top: 71, rot: -20 },
      velocity: new THREE.Vector3(),
      angularVelocity: 0,
      alignWithVelocity: true,
      friction: 0.91,
    });

    // --- ITEM 2: Paper clip (Steel, TubeGeometry along 3-loop path) ---
    const clipPath = new THREE.CurvePath<THREE.Vector3>();
    const cpScale = width * 0.022 * 0.5;
    // 3-loop paper clip path points
    const p1 = new THREE.Vector3(-cpScale * 0.5, 0, cpScale * 1.5);
    const p2 = new THREE.Vector3(-cpScale * 0.5, 0, -cpScale * 1.5);
    const p3 = new THREE.Vector3(cpScale * 0.5, 0, -cpScale * 1.5);
    const p4 = new THREE.Vector3(cpScale * 0.5, 0, cpScale * 1.0);
    const p5 = new THREE.Vector3(0, 0, cpScale * 1.0);
    const p6 = new THREE.Vector3(0, 0, -cpScale * 0.8);

    clipPath.add(new THREE.LineCurve3(p1, p2));
    clipPath.add(new THREE.QuadraticBezierCurve3(p2, new THREE.Vector3(0, 0, -cpScale * 1.8), p3));
    clipPath.add(new THREE.LineCurve3(p3, p4));
    clipPath.add(new THREE.QuadraticBezierCurve3(p4, new THREE.Vector3(cpScale * 0.25, 0, cpScale * 1.3), p5));
    clipPath.add(new THREE.LineCurve3(p5, p6));

    const clipTubeGeo = new THREE.TubeGeometry(clipPath, 48, 0.7, 8, false);
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0xd8dde4,
      metalness: 0.92,
      roughness: 0.28,
    });
    const clipMesh = new THREE.Mesh(clipTubeGeo, steelMat);
    clipMesh.castShadow = true;
    const clipGroup = new THREE.Group();
    clipGroup.add(clipMesh);
    clipGroup.position.y = 0.7;
    scene.add(clipGroup);
    items.push({
      id: 'paperclip',
      mesh: clipGroup,
      baseRadius: cpScale * 1.2,
      initialRel: { left: 16.7, top: 83.5, rot: 35 },
      velocity: new THREE.Vector3(),
      angularVelocity: 0,
      friction: 0.82, // Higher friction slides
    });

    // --- ITEM 3 & 4: Crumpled Paper A & B (Displaced Icosahedron) ---
    const makeCrumpledPaper = (diam: number, seed: number) => {
      const radius = diam * 0.5;
      const geo = new THREE.IcosahedronGeometry(radius, 2);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const vx = pos.getX(i);
        const vy = pos.getY(i);
        const vz = pos.getZ(i);
        const noise = (Math.sin(vx * 0.2 + seed) * Math.cos(vz * 0.2 + seed) * 0.5 + 0.5) * 0.22 - 0.11;
        pos.setXYZ(i, vx * (1 + noise), vy * (0.84 + noise * 0.8), vz * (1 + noise));
      }
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color: 0xe6dcc3,
        roughness: 0.95,
        metalness: 0.0,
        flatShading: true,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      const grp = new THREE.Group();
      grp.add(mesh);
      grp.position.y = radius * 0.85;
      return { grp, radius };
    };

    const paperADiam = width * 0.033;
    const paperA = makeCrumpledPaper(paperADiam, 1.4);
    scene.add(paperA.grp);
    items.push({
      id: 'crumpled-a',
      mesh: paperA.grp,
      baseRadius: paperA.radius,
      initialRel: { left: 7.8, top: 88.5, rot: 0 },
      velocity: new THREE.Vector3(),
      angularVelocity: 0,
      isRolling: true,
      friction: 0.94,
    });

    const paperBDiam = width * 0.029;
    const paperB = makeCrumpledPaper(paperBDiam, 3.8);
    scene.add(paperB.grp);
    items.push({
      id: 'crumpled-b',
      mesh: paperB.grp,
      baseRadius: paperB.radius,
      initialRel: { left: 61.2, top: 81.5, rot: 0 },
      velocity: new THREE.Vector3(),
      angularVelocity: 0,
      isRolling: true,
      friction: 0.94,
    });

    // --- ITEM 5: Pencil (Yellow hex body, eraser) ---
    const pencilGroup = new THREE.Group();
    const pencilLen = width * 0.085;
    const pencilRadius = 3.0;

    // Hexagonal Yellow Body
    const hexGeo = new THREE.CylinderGeometry(pencilRadius, pencilRadius, pencilLen * 0.72, 6);
    const yellowMat = new THREE.MeshStandardMaterial({
      color: 0xe5a928,
      roughness: 0.42,
    });
    const hexMesh = new THREE.Mesh(hexGeo, yellowMat);
    hexMesh.castShadow = true;
    pencilGroup.add(hexMesh);

    // Wood Cone Tip
    const woodTipGeo = new THREE.ConeGeometry(pencilRadius, pencilLen * 0.16, 16);
    const woodMat = new THREE.MeshStandardMaterial({ color: 0xd8ba8c, roughness: 0.8 });
    const woodTip = new THREE.Mesh(woodTipGeo, woodMat);
    woodTip.position.y = pencilLen * 0.72 / 2 + (pencilLen * 0.16) / 2;
    woodTip.castShadow = true;
    pencilGroup.add(woodTip);

    // Graphite Point
    const graphiteGeo = new THREE.ConeGeometry(pencilRadius * 0.35, pencilLen * 0.06, 12);
    const graphiteMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.3 });
    const graphite = new THREE.Mesh(graphiteGeo, graphiteMat);
    graphite.position.y = pencilLen * 0.72 / 2 + pencilLen * 0.16;
    pencilGroup.add(graphite);

    // Aluminum/Brass Ferrule
    const ferruleGeo = new THREE.CylinderGeometry(pencilRadius * 1.02, pencilRadius * 1.02, pencilLen * 0.08, 16);
    const ferruleMat = new THREE.MeshStandardMaterial({ color: 0xb5b5b5, metalness: 0.8, roughness: 0.3 });
    const ferrule = new THREE.Mesh(ferruleGeo, ferruleMat);
    ferrule.position.y = -pencilLen * 0.72 / 2 - (pencilLen * 0.08) / 2;
    pencilGroup.add(ferrule);

    // Pink Eraser
    const eraserGeo = new THREE.CylinderGeometry(pencilRadius * 0.98, pencilRadius * 0.98, pencilLen * 0.08, 16);
    const eraserMat = new THREE.MeshStandardMaterial({ color: 0xdb8282, roughness: 0.85 });
    const eraser = new THREE.Mesh(eraserGeo, eraserMat);
    eraser.position.y = -pencilLen * 0.72 / 2 - pencilLen * 0.08 - (pencilLen * 0.08) / 2;
    pencilGroup.add(eraser);

    pencilGroup.rotation.x = Math.PI / 2;
    pencilGroup.position.y = pencilRadius;
    scene.add(pencilGroup);
    items.push({
      id: 'pencil',
      mesh: pencilGroup,
      baseRadius: pencilLen * 0.5,
      initialRel: { left: 88.5, top: 74.5, rot: 12 },
      velocity: new THREE.Vector3(),
      angularVelocity: 0,
      alignWithVelocity: true,
      friction: 0.91,
    });

    s.items = items;

    // Position all objects initially
    const setInitialPositions = () => {
      // Lamp base at left: 83%, top: 24%
      const lampPos = relToWorld(83, 24);
      lampGroup.position.set(lampPos.worldX, 0, lampPos.worldZ);

      // SpotLight target at ~76% / 34%
      const spotTargetPos = relToWorld(76, 34);
      spotTarget.position.set(spotTargetPos.worldX, 0, spotTargetPos.worldZ);

      // Loose items
      for (const item of items) {
        const p = relToWorld(item.initialRel.left, item.initialRel.top);
        item.mesh.position.x = p.worldX;
        item.mesh.position.z = p.worldZ;
        item.mesh.rotation.y = (item.initialRel.rot * Math.PI) / 180;
      }
    };
    setInitialPositions();

    // Handle Resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w <= 0 || h <= 0) continue;
        s.containerSize = { width: w, height: h };
        renderer.setSize(w, h);
        camera.left = -w / 2;
        camera.right = w / 2;
        camera.top = h / 2;
        camera.bottom = -h / 2;
        camera.updateProjectionMatrix();

        setInitialPositions();
        requestRender();
      }
    });
    resizeObserver.observe(container);

    // Initial render
    requestRender();

    // =========================================================================
    // 3. POINTER INTERACTIONS & RAYCASTING
    // =========================================================================
    const raycaster = new THREE.Raycaster();
    const planeIntersect = new THREE.Vector3();
    const mouseCoord = new THREE.Vector2();

    const getRaycastIntersection = (clientX: number, clientY: number) => {
      const crect = canvas.getBoundingClientRect();
      const x = ((clientX - crect.left) / crect.width) * 2 - 1;
      const y = -((clientY - crect.top) / crect.height) * 2 + 1;
      mouseCoord.set(x, y);
      raycaster.setFromCamera(mouseCoord, camera);
      raycaster.ray.intersectPlane(s.dragPlane, planeIntersect);
      return { x, y, planeIntersect };
    };

    const handlePointerMove = (e: PointerEvent) => {
      const { planeIntersect: p } = getRaycastIntersection(e.clientX, e.clientY);
      const now = performance.now();

      // If dragging an item:
      if (s.draggedItem) {
        const item = s.draggedItem;
        const targetX = p.x - s.dragOffset.x;
        const targetZ = p.z - s.dragOffset.z;

        // Track velocity
        const dt = Math.max(1, now - s.lastPointerTime);
        item.velocity.set((targetX - item.mesh.position.x) / dt * 16, 0, (targetZ - item.mesh.position.z) / dt * 16);

        item.mesh.position.x = targetX;
        item.mesh.position.z = targetZ;
        item.mesh.position.y = item.baseRadius + 6; // Lift ~6px while dragging

        s.lastPointerWorld.copy(p);
        s.lastPointerTime = now;
        requestRender();
        return;
      }

      // Check raycast for hover
      const interactableObjects: THREE.Object3D[] = [
        ...s.items.map((i) => i.mesh),
        lampGroup,
      ];
      const hits = raycaster.intersectObjects(interactableObjects, true);

      if (hits.length > 0) {
        const hitObj = hits[0].object;
        let isLamp = false;
        let checkObj: THREE.Object3D | null = hitObj;
        while (checkObj) {
          if (checkObj === lampGroup) {
            isLamp = true;
            break;
          }
          checkObj = checkObj.parent;
        }

        if (isLamp) {
          canvas.style.cursor = 'pointer';
          canvas.title = `Desk Lamp (Click to switch ${s.lampTargetState ? 'OFF' : 'ON'})`;
          if (!reducedMotion && s.shadeGroup) {
            s.shadeGroup.rotation.y = THREE.MathUtils.clamp((p.x - s.shadeGroup.position.x) * 0.0015, -0.1, 0.1);
          }
          s.hoveredObject = lampGroup;
          requestRender();
        } else {
          canvas.title = 'Drag to move';
          let topGroup: THREE.Object3D | null = hitObj;
          while (topGroup && topGroup.parent && topGroup.parent !== scene && topGroup.parent !== lowerPivot && topGroup.parent !== elbowPivot) {
            topGroup = topGroup.parent;
          }

          canvas.style.cursor = 'grab';
          if (s.shadeGroup && !reducedMotion) {
            s.shadeGroup.rotation.y = 0;
          }
          s.hoveredObject = topGroup;
          requestRender();
        }
      } else {
        canvas.style.cursor = 'default';
        canvas.title = '';
        if (s.shadeGroup && !reducedMotion) {
          s.shadeGroup.rotation.y = 0;
        }
        s.hoveredObject = null;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      const { planeIntersect: p } = getRaycastIntersection(e.clientX, e.clientY);
      const hits = raycaster.intersectObjects([...s.items.map((i) => i.mesh), lampGroup], true);

      if (hits.length === 0) return;

      const hitObj = hits[0].object;

      // Lamp click toggle
      let checkLamp: THREE.Object3D | null = hitObj;
      let isLampHit = false;
      while (checkLamp) {
        if (checkLamp === lampGroup) {
          isLampHit = true;
          break;
        }
        checkLamp = checkLamp.parent;
      }

      if (isLampHit) {
        toggleLamp();
        return;
      }

      // Find which loose item was clicked
      const foundItem = s.items.find((item) => {
        let o: THREE.Object3D | null = hitObj;
        while (o) {
          if (o === item.mesh) return true;
          o = o.parent;
        }
        return false;
      });

      if (foundItem) {
        canvas.setPointerCapture(e.pointerId);
        canvas.style.cursor = 'grabbing';
        s.draggedItem = foundItem;
        s.dragOffset.set(p.x - foundItem.mesh.position.x, 0, p.z - foundItem.mesh.position.z);
        s.lastPointerWorld.copy(p);
        s.lastPointerTime = performance.now();
        foundItem.velocity.set(0, 0, 0);
        foundItem.mesh.position.y = foundItem.baseRadius + 6; // Lift 6px
        requestRender();
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (s.draggedItem) {
        try {
          canvas.releasePointerCapture(e.pointerId);
        } catch {
          // ignore
        }
        const item = s.draggedItem;
        item.mesh.position.y = item.baseRadius; // Reset resting height
        s.draggedItem = null;
        canvas.style.cursor = 'grab';

        // Exclusion Zone Check
        const W = s.containerSize.width;
        const H = s.containerSize.height;
        const exclusionElements = document.querySelectorAll(
          '[role="button"], [title="Open Private Field Notes"], [title="Ashwood Ceramic Tea Cup"], h1'
        );

        const currentScreenX = item.mesh.position.x + W / 2;
        const currentScreenY = item.mesh.position.z * Math.sin(tiltRad) + H / 2;

        for (const el of Array.from(exclusionElements)) {
          const er = el.getBoundingClientRect();
          const crect = container.getBoundingClientRect();
          const relLeft = er.left - crect.left;
          const relTop = er.top - crect.top;
          const relRight = relLeft + er.width;
          const relBottom = relTop + er.height;

          // If point inside exclusion zone, push away to nearest free edge
          if (
            currentScreenX >= relLeft - 15 &&
            currentScreenX <= relRight + 15 &&
            currentScreenY >= relTop - 15 &&
            currentScreenY <= relBottom + 15
          ) {
            const pushDown = relBottom + 20 - currentScreenY;
            const pushUp = currentScreenY - (relTop - 20);
            const deltaY = pushDown < pushUp ? pushDown : -pushUp;
            item.velocity.z += (deltaY / Math.sin(tiltRad)) * 0.15;
            break;
          }
        }

        requestRender();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (s.draggedItem) {
        e.preventDefault();
        s.draggedItem.mesh.rotation.y += e.deltaY * 0.0025;
        requestRender();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (s.rafId) cancelAnimationFrame(s.rafId);
        s.isAnimating = false;
      } else {
        requestRender();
      }
    };

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('wheel', handleWheel);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      if (s.rafId) cancelAnimationFrame(s.rafId);

      // Clean disposal
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      pmremGenerator.dispose();
      renderer.dispose();
    };
  }, [reducedMotion]);

  return (
    <>
      {/* Obvious Tactile Lamp Switch button */}
      <button
        onClick={toggleLamp}
        className="absolute top-3.5 right-5 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18120d]/85 hover:bg-[#281d14] border border-[#543d2b] shadow-xl text-xs font-mono text-[#d4af62] transition-all z-30 cursor-pointer backdrop-blur group select-none"
        title={`Desk Lamp: Click to switch ${lampOn ? 'OFF' : 'ON'}`}
        aria-label={`Toggle desk lamp: currently ${lampOn ? 'ON' : 'OFF'}`}
      >
        <span
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            lampOn
              ? 'bg-[#ffc065] shadow-[0_0_10px_#ffa630]'
              : 'bg-[#403328] border border-[#6b5543]'
          }`}
        />
        <span className="font-semibold tracking-wider text-[11px] group-hover:text-[#ffe4a0]">
          Lamp: {lampOn ? 'ON' : 'OFF'}
        </span>
      </button>

      {/* Visually hidden accessible button for toggling desk lamp */}
      <button
        onClick={toggleLamp}
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:right-2 focus:z-50 focus:px-3 focus:py-1 focus:bg-[#b89355] focus:text-black font-mono text-xs rounded"
        aria-label="Toggle desk lamp"
      >
        Toggle desk lamp ({lampOn ? 'ON' : 'OFF'})
      </button>

      {/* Layer 3: Three.js Canvas */}
      {!webGlFailed ? (
        <div
          ref={containerRef}
          className="absolute inset-0 pointer-events-none z-[3] overflow-hidden"
          style={{ width: '100%', height: '100%' }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full pointer-events-auto"
            aria-hidden="true"
          />
        </div>
      ) : (
        /* Fallback SVG Lamp shown ONLY if WebGL fails to initialize */
        <div
          className="absolute hidden lg:block pointer-events-none z-[3]"
          style={{ left: '84%', top: '10%' }}
          title="Articulated Desk Lamp (Fallback)"
        >
          <svg width="230" height="240" viewBox="0 0 230 240" fill="none">
            <ellipse cx="152" cy="196" rx="46" ry="16" fill="#2d2216" />
            <line x1="150" y1="171" x2="130" y2="104" stroke="#4a3721" strokeWidth="3.5" />
            <line x1="132" y1="104" x2="86" y2="52" stroke="#4a3721" strokeWidth="3.5" />
            <circle cx="86" cy="52" r="5" fill="#d4af62" />
            <ellipse cx="48" cy="92" rx="27" ry="15" fill="#f5ecd7" />
            <circle cx="51" cy="88" r="4.8" fill="#fffef7" />
          </svg>
        </div>
      )}
    </>
  );
};
