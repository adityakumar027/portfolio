"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const haloVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const haloFragment = `
  varying vec2 vUv;
  void main() {
    vec2 point = vUv - 0.5;
    float radius = length(point);
    float broad = pow(max(0.0, 1.0 - radius * 1.72), 3.0);
    float core = pow(max(0.0, 1.0 - radius * 5.2), 2.2);
    vec3 color = mix(vec3(0.12, 0.55, 0.46), vec3(0.72, 1.0, 0.94), core);
    gl_FragColor = vec4(color * (broad + core * 0.55), (broad * 0.4 + core * 0.08));
  }
`;

function Core() {
  const group = useRef<THREE.Group>(null);
  const body = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const rings = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current || !body.current || !shell.current || !rings.current) return;
    const time = state.clock.elapsedTime;
    group.current.position.y = Math.sin(time * 0.38) * 0.045;
    group.current.rotation.x = state.pointer.y * 0.035;
    group.current.rotation.y = state.pointer.x * 0.055;
    body.current.rotation.y += delta * 0.045;
    body.current.rotation.z += delta * 0.018;
    shell.current.rotation.x -= delta * 0.025;
    shell.current.rotation.y += delta * 0.06;
    rings.current.rotation.z += delta * 0.012;
  });

  return (
    <group ref={group} position={[2.82, 0.06, 0]} scale={0.86}>
      <mesh position={[0, 0, -1.5]} scale={[5.8, 5.8, 1]} renderOrder={-2}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial vertexShader={haloVertex} fragmentShader={haloFragment} transparent depthWrite={false} depthTest={false} blending={THREE.AdditiveBlending} />
      </mesh>

      <group ref={rings} rotation={[1.05, 0.2, 0.1]}>
        {[1.96, 2.26].map((radius, index) => (
          <mesh key={radius} rotation={[index * 0.7, index * 0.3, index * 0.5]}>
            <torusGeometry args={[radius, 0.009, 6, 150]} />
            <meshStandardMaterial color="#b3ffed" emissive="#21705f" emissiveIntensity={1.15} transparent opacity={index ? 0.13 : 0.22} roughness={0.25} metalness={0.68} />
          </mesh>
        ))}
      </group>

      <mesh ref={shell} scale={1.74}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial color="#b7ffed" emissive="#24695a" emissiveIntensity={0.78} transparent opacity={0.27} wireframe />
      </mesh>

      <mesh ref={body} scale={1.46} rotation={[0.16, 0.4, 0.08]}>
        <dodecahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial color="#0b1b17" emissive="#08251e" emissiveIntensity={0.46} metalness={0.84} roughness={0.2} clearcoat={1} clearcoatRoughness={0.15} envMapIntensity={1.25} flatShading />
      </mesh>

      <mesh scale={1.55} rotation={[0.16, 0.4, 0.08]}>
        <dodecahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#71f5d4" emissive="#1f6c5b" emissiveIntensity={0.65} transparent opacity={0.07} side={THREE.BackSide} depthWrite={false} />
      </mesh>

      <mesh scale={0.52} rotation={[0.35, 0.1, 0.48]}>
        <octahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#d9fff6" emissive="#71f5d4" emissiveIntensity={2.2} transparent opacity={0.68} wireframe />
      </mesh>
      <mesh scale={0.095}>
        <sphereGeometry args={[1, 20, 20]} />
        <meshBasicMaterial color="#effffb" />
      </mesh>
      <pointLight color="#71f5d4" intensity={3.8} distance={5} decay={2.3} />
    </group>
  );
}

function Particles() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const data = new Float32Array(96 * 3);
    let seed = 901;
    const random = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    for (let index = 0; index < data.length; index += 3) {
      data[index] = (random() - 0.5) * 17;
      data[index + 1] = (random() - 0.5) * 9;
      data[index + 2] = (random() - 0.5) * 8 - 1;
    }
    return data;
  }, []);

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.004;
  });

  return (
    <points ref={points}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial color="#a6f9e4" size={0.017} transparent opacity={0.22} depthWrite={false} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <fog attach="fog" args={["#070908", 6, 13]} />
      <ambientLight intensity={0.06} color="#b9fff0" />
      <spotLight position={[-4, 5, 5]} color="#f0fffb" intensity={24} angle={0.4} penumbra={0.95} distance={15} decay={2} />
      <pointLight position={[4, -2, 3]} color="#1e7868" intensity={5} distance={10} decay={2} />
      <spotLight position={[4, 3, -3]} color="#71f5d4" intensity={38} angle={0.55} penumbra={1} distance={14} decay={2} />
      <Core />
      <Particles />
      <EffectComposer multisampling={0} resolutionScale={0.8}>
        <Bloom intensity={0.38} luminanceThreshold={0.76} luminanceSmoothing={0.2} mipmapBlur />
        <Noise opacity={0.018} blendFunction={BlendFunction.SOFT_LIGHT} />
        <Vignette eskil={false} offset={0.2} darkness={0.58} />
      </EffectComposer>
    </>
  );
}

export default function CoreScene() {
  const [enabled] = useState(() => typeof window !== "undefined" && innerWidth > 980 && !matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [ready, setReady] = useState(false);

  if (!enabled) return <div className="core-fallback" aria-hidden="true" />;

  return (
    <>
      <div className={ready ? "scene-loader is-ready" : "scene-loader"} aria-hidden="true">
        <span>INITIALIZING CORE</span><div><i style={{ transform: `scaleX(${ready ? 1 : 0.35})` }} /></div>
      </div>
      <div className="webgl-layer" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, 7.4], fov: 43 }}
          dpr={[1, 1.25]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 0.95;
            gl.outputColorSpace = THREE.SRGBColorSpace;
            requestAnimationFrame(() => setReady(true));
          }}
        >
          <Suspense fallback={null}><Scene /></Suspense>
        </Canvas>
      </div>
    </>
  );
}
