"use client";

import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { motion, useMotionValue, useMotionValueEvent, useSpring } from "framer-motion";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { EffectComposer, Bloom, Vignette, DepthOfField, GodRays } from "@react-three/postprocessing";

type Pointer = {
  x: number;
  y: number;
};

type ArrowRightIconProps = {
  className?: string;
};

function ArrowRightIcon({ className = "" }: ArrowRightIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-4 w-4 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function createPlanetTexture({
  base,
  accent,
  storm,
  bands = false,
  hasAtmosphere = false,
  hasCraters = false,
}: {
  base: string;
  accent: string;
  storm: string;
  bands?: boolean;
  hasAtmosphere?: boolean;
  hasCraters?: boolean;
}) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Enhanced base gradient with more color stops
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, accent);
  gradient.addColorStop(0.15, base);
  gradient.addColorStop(0.48, storm);
  gradient.addColorStop(0.75, base);
  gradient.addColorStop(1, accent);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Enhanced cloud system with multiple layers
  for (let i = 0; i < 120; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = 12 + Math.random() * 96;
    const opacity = 0.02 + Math.random() * 0.18;
    
    // Multi-layer cloud system
    const cloud = ctx.createRadialGradient(x, y, 0, x, y, radius * 1.5);
    cloud.addColorStop(0, `rgba(255,255,255,${opacity})`);
    cloud.addColorStop(0.4, `rgba(255,255,255,${opacity * 0.6})`);
    cloud.addColorStop(0.7, `rgba(200,220,255,${opacity * 0.3})`);
    cloud.addColorStop(1, "rgba(255,255,255,0)");
    
    ctx.fillStyle = cloud;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Enhanced band system with more detail
  if (bands) {
    for (let y = 0; y < canvas.height; y += 12) {
      const width = canvas.width;
      const height = 6 + Math.sin(y * 0.1) * 4 + Math.random() * 8;
      
      // Multiple band colors for depth
      if (y % 24 === 0) {
        ctx.fillStyle = "rgba(255,255,255,0.12)";
      } else if (y % 18 === 0) {
        ctx.fillStyle = "rgba(30,16,10,0.18)";
      } else {
        ctx.fillStyle = "rgba(50,30,20,0.08)";
      }
      
      ctx.fillRect(0, y + Math.sin(y * 0.2) * 6, width, height);
      
      // Add texture to bands
      for (let x = 0; x < width; x += 20) {
        const noise = Math.random() * 10 - 5;
        ctx.fillStyle = `rgba(0,0,0,${0.02 + Math.random() * 0.06})`;
        ctx.fillRect(x + noise, y, 15 + Math.random() * 10, 2);
      }
    }
  }

  // Enhanced crater system
  if (hasCraters) {
    for (let i = 0; i < 25; i += 1) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = 3 + Math.random() * 18;
      const crater = ctx.createRadialGradient(x, y, 0, x, y, radius);
      crater.addColorStop(0, "rgba(0,0,0,0.3)");
      crater.addColorStop(0.5, "rgba(0,0,0,0.15)");
      crater.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = crater;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Atmospheric scattering effect
  if (hasAtmosphere) {
    const atmosphere = ctx.createRadialGradient(
      canvas.width * 0.7, 
      canvas.height * 0.3, 
      0, 
      canvas.width * 0.7, 
      canvas.height * 0.3, 
      canvas.width * 0.4
    );
    atmosphere.addColorStop(0, "rgba(100,150,255,0.08)");
    atmosphere.addColorStop(0.5, "rgba(50,100,200,0.04)");
    atmosphere.addColorStop(1, "rgba(0,50,150,0)");
    ctx.fillStyle = atmosphere;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Add surface noise for realism
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 8;
    data[i] = Math.max(0, Math.min(255, data[i] + noise));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
  }
  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function Planet({
  pointer,
  position,
  radius,
  colors,
  ring = false,
  speed = 0.12,
  hasAtmosphere = false,
  hasCraters = false,
}: {
  pointer: Pointer;
  position: [number, number, number];
  radius: number;
  colors: { base: string; accent: string; storm: string; bands?: boolean };
  ring?: boolean;
  speed?: number;
  hasAtmosphere?: boolean;
  hasCraters?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => createPlanetTexture({ ...colors, hasAtmosphere, hasCraters }), [colors, hasAtmosphere, hasCraters]);

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;
    if (planetRef.current) {
      planetRef.current.rotation.y = elapsed * speed;
      planetRef.current.rotation.x = Math.sin(elapsed * 0.18) * 0.06;
    }

    if (groupRef.current) {
      groupRef.current.position.x = position[0] + pointer.x * radius * 0.55;
      groupRef.current.position.y = position[1] + pointer.y * radius * 0.38;
      groupRef.current.rotation.y = pointer.x * 0.16;
      groupRef.current.rotation.x = -pointer.y * 0.1;
    }
  });

  return (
    <Float floatIntensity={0.45} rotationIntensity={0.1} speed={1.3}>
      <group ref={groupRef} position={position}>
        <mesh ref={planetRef} castShadow receiveShadow>
          <sphereGeometry args={[radius, 96, 96]} />
          <meshStandardMaterial
            map={texture}
            roughness={0.72}
            metalness={0.08}
            emissive={colors.accent}
            emissiveIntensity={0.05}
          />
        </mesh>

        <mesh scale={1.045}>
          <sphereGeometry args={[radius, 96, 96]} />
          <meshBasicMaterial color={colors.accent} transparent opacity={0.075} side={THREE.BackSide} />
        </mesh>

        {ring ? (
          <group rotation={[Math.PI * 0.42, 0.2, -0.18]}>
            <mesh>
              <torusGeometry args={[radius * 1.55, radius * 0.035, 16, 160]} />
              <meshBasicMaterial color="#f6dca8" transparent opacity={0.46} />
            </mesh>
            <mesh>
              <torusGeometry args={[radius * 1.82, radius * 0.018, 12, 160]} />
              <meshBasicMaterial color="#7dd3fc" transparent opacity={0.18} />
            </mesh>
          </group>
        ) : null}
      </group>
    </Float>
  );
}

function ShootingStar({ pointer }: { pointer: Pointer }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const startPos = useMemo(() => 
    new THREE.Vector3(
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 20,
      -20 - Math.random() * 30
    ),
  []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const elapsed = state.clock.elapsedTime;
    const progress = (elapsed * 0.3) % 1;
    
    meshRef.current.position.lerpVectors(
      startPos,
      startPos.clone().add(new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
        20 + Math.random() * 30
      )),
      progress
    );
    
    meshRef.current.rotation.z = progress * Math.PI;
    if (meshRef.current.material instanceof THREE.MeshBasicMaterial) {
      meshRef.current.material.opacity = 1 - progress;
    }
  });

  return (
    <mesh ref={meshRef} position={startPos}>
      <cylinderGeometry args={[0.02, 0.5, 8, 32]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={1} />
    </mesh>
  );
}

function NebulaCloud({ pointer }: { pointer: Pointer }) {
  const pointsRef = useRef<THREE.Points>(null);
  const [positions, colors] = useMemo(() => {
    const particleCount = 2400;
    const positionArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    const palette = [
      new THREE.Color("#8b5cf6"),
      new THREE.Color("#22d3ee"),
      new THREE.Color("#f472b6"),
      new THREE.Color("#f8fafc"),
      new THREE.Color("#a78bfa"),
      new THREE.Color("#06b6d4"),
    ];

    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 24;
      const spiral = angle + radius * 0.12;
      const height = (Math.random() - 0.5) * 12;

      positionArray[i3] = Math.cos(spiral) * radius;
      positionArray[i3 + 1] = height + Math.sin(angle) * 2;
      positionArray[i3 + 2] = Math.sin(spiral) * radius - 10 - Math.random() * 20;

      const color = palette[Math.floor(Math.random() * palette.length)];
      const brightness = 0.4 + Math.random() * 0.6;
      colorArray[i3] = color.r * brightness;
      colorArray[i3 + 1] = color.g * brightness;
      colorArray[i3 + 2] = color.b * brightness;
    }

    return [positionArray, colorArray];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    pointsRef.current.rotation.y = elapsed * 0.012 + pointer.x * 0.08;
    pointsRef.current.rotation.x = pointer.y * 0.06;
    pointsRef.current.rotation.z = Math.sin(elapsed * 0.05) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.042}
        vertexColors
        transparent
        opacity={0.68}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function AsteroidBelt({ pointer }: { pointer: Pointer }) {
  const instancedRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const asteroids = useMemo(
    () =>
      Array.from({ length: 170 }, () => ({
        angle: Math.random() * Math.PI * 2,
        radius: 3.2 + Math.random() * 1.45,
        height: (Math.random() - 0.5) * 0.3,
        scale: 0.025 + Math.random() * 0.06,
        spin: Math.random() * Math.PI,
      })),
    [],
  );

  useFrame((state) => {
    if (!instancedRef.current) {
      return;
    }

    const time = state.clock.elapsedTime * 0.08;
    asteroids.forEach((asteroid, index) => {
      const angle = asteroid.angle + time;
      dummy.position.set(
        Math.cos(angle) * asteroid.radius + pointer.x * 0.2,
        asteroid.height + pointer.y * 0.12,
        Math.sin(angle) * asteroid.radius,
      );
      dummy.rotation.set(angle, asteroid.spin + time * 2, angle * 0.4);
      dummy.scale.setScalar(asteroid.scale);
      dummy.updateMatrix();
      instancedRef.current?.setMatrixAt(index, dummy.matrix);
    });

    instancedRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={instancedRef} args={[undefined, undefined, asteroids.length]} position={[2.6, -1.1, -2.2]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#a8a29e" roughness={0.92} metalness={0.12} />
    </instancedMesh>
  );
}

function GodRaysEffect({ sunRef }: { sunRef: React.RefObject<THREE.PointLight | null> }) {
  if (!sunRef.current) return null;
  
  return (
    <GodRays
      sun={sunRef.current as any}
      exposure={0.34}
      decay={0.95}
      density={0.96}
      weight={0.4}
      samples={64}
    />
  );
}

function UniverseScene({ pointer, sunRef }: { pointer: Pointer; sunRef: React.RefObject<THREE.PointLight | null> }) {
  const rigRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!rigRef.current) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    const targetX = pointer.x * 1.2;
    const targetY = 0.3 + pointer.y * 0.8;
    
    // Enhanced camera movement with smooth easing
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.025);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.025);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 7.2 + Math.sin(elapsed * 0.1) * 0.5, 0.015);
    
    // Dynamic camera look-at with subtle movement
    const lookAtX = Math.sin(elapsed * 0.05) * 0.5;
    const lookAtY = Math.cos(elapsed * 0.08) * 0.3;
    state.camera.lookAt(lookAtX, lookAtY, -4);
    
    // Enhanced rig rotation for depth
    rigRef.current.rotation.y = pointer.x * 0.08 + Math.sin(elapsed * 0.12) * 0.02;
    rigRef.current.rotation.x = -pointer.y * 0.06 + Math.cos(elapsed * 0.15) * 0.01;
    rigRef.current.rotation.z = Math.sin(elapsed * 0.07) * 0.005;
  });

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#02030a", 8, 24]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[-4, 4, 3]} intensity={3.2} color="#f8fafc" castShadow />
      <pointLight position={[4, -2, -1]} intensity={5} color="#7dd3fc" distance={12} />
      <pointLight position={[-5, 1, -7]} intensity={4} color="#f472b6" distance={14} />
      <pointLight ref={sunRef} position={[0, 2, -5]} intensity={1} distance={100} color="#ffffff" />

      <group ref={rigRef}>
        <Stars radius={80} depth={45} count={5200} factor={4.2} saturation={0.35} fade speed={0.45} />
        <NebulaCloud pointer={pointer} />
        <AsteroidBelt pointer={pointer} />
        
        {/* Shooting Stars */}
        {[...Array(6)].map((_, i) => (
          <ShootingStar key={i} pointer={pointer} />
        ))}

        <Planet
          pointer={pointer}
          position={[-3.5, 1.45, -4.2]}
          radius={0.88}
          speed={0.28}
          hasAtmosphere
          colors={{ base: "#0f62fe", accent: "#38bdf8", storm: "#064e3b" }}
        />
        <Planet
          pointer={pointer}
          position={[3.55, 1.15, -5.15]}
          radius={0.62}
          speed={0.2}
          ring
          hasAtmosphere
          colors={{ base: "#eab308", accent: "#fde68a", storm: "#92400e", bands: true }}
        />
        <Planet
          pointer={pointer}
          position={[-2.5, -2.05, -6]}
          radius={0.48}
          speed={0.18}
          hasCraters
          colors={{ base: "#dc2626", accent: "#fb923c", storm: "#7f1d1d" }}
        />
        <Planet
          pointer={pointer}
          position={[3, -2.35, -7.8]}
          radius={0.32}
          speed={0.35}
          hasCraters
          colors={{ base: "#d4d4d8", accent: "#f8fafc", storm: "#71717a" }}
        />
      </group>
    </>
  );
}

export default function NotFound() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 70, damping: 22, mass: 0.4 });
  const springY = useSpring(pointerY, { stiffness: 70, damping: 22, mass: 0.4 });
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const sunRef = useRef<THREE.PointLight>(null);

  useMotionValueEvent(springX, "change", (value) => {
    pointer.current.x = value;
  });

  useMotionValueEvent(springY, "change", (value) => {
    pointer.current.y = value;
  });

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-black text-white"
      onPointerMove={(event) => {
        pointerX.set((event.clientX / window.innerWidth - 0.5) * 2);
        pointerY.set(-(event.clientY / window.innerHeight - 0.5) * 2);
      }}
    >
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0.2, 7.2], fov: 48, near: 0.1, far: 120 }}
          dpr={[1, 1.8]}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          shadows
        >
          <Suspense fallback={null}>
            <EffectComposer>
              <UniverseScene pointer={pointer.current} sunRef={sunRef} />
              <Bloom
                luminanceThreshold={0.15}
                intensity={1.2}
                radius={0.4}
                levels={4}
                mipmapBlur
              />
              <DepthOfField
                focusDistance={8}
                focalLength={0.02}
                bokehScale={4}
                height={480}
              />
              <GodRaysEffect sunRef={sunRef} />
              <Vignette
                eskil={0.9}
                darkness={0.8}
              />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      <div className="noise-overlay" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(0,0,0,0.02),rgba(0,0,0,0.58)_66%,rgba(0,0,0,0.92)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/55 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute inset-0 -z-10 blur-3xl" style={{ background: "rgba(125, 211, 252, 0.18)" }} />
          <h1 className="text-[7rem] font-black leading-none tracking-normal text-white sm:text-[10rem] md:text-[13rem] lg:text-[15rem]">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-cyan-200/75">Lost signal</p>
          <h2 className="mt-5 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">Page Not Found</h2>
          <p className="mx-auto mt-5 max-w-[38rem] text-[14px] leading-6 text-slate-300 sm:text-[16px] sm:leading-7">
            You have drifted beyond the mapped universe. This planet has not been discovered yet.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-950 shadow-[0_0_38px_rgba(255,255,255,0.18)] transition hover:bg-cyan-100"
            >
              <ArrowRightIcon />
              Return Home
            </Link>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-200 backdrop-blur-md transition hover:border-white/25 hover:bg-white/10"
            >
              <ArrowRightIcon className="rotate-180" />
              Go Back
            </button>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
