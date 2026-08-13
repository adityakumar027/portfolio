"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { useRef } from "react";
import * as THREE from "three";

type IntroPhase = "visible" | "settling" | "revealing" | "hidden";

function EntranceObject({ settling }: { settling: boolean }) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const body = useRef<THREE.Mesh>(null);
  const rings = useRef<THREE.Group>(null);
  const transitionStartedAt = useRef<number | null>(null);
  const wasSettling = useRef(false);

  useFrame((state, delta) => {
    if (!group.current || !shell.current || !body.current || !rings.current) return;
    if (settling && !wasSettling.current) transitionStartedAt.current = state.clock.elapsedTime;
    wasSettling.current = settling;

    if (settling && transitionStartedAt.current !== null) {
      const raw = THREE.MathUtils.clamp((state.clock.elapsedTime - transitionStartedAt.current) / 0.65, 0, 1);
      const eased = raw < 0.5
        ? 4 * raw ** 3
        : 1 - ((-2 * raw + 2) ** 3) / 2;
      group.current.position.x = THREE.MathUtils.lerp(1.25, 2.82, eased);
      group.current.position.y = THREE.MathUtils.lerp(0, 0.06, eased);
      group.current.scale.setScalar(THREE.MathUtils.lerp(2.25, 0.84, eased));
    }
    group.current.rotation.y += delta * 0.035;
    shell.current.rotation.x -= delta * 0.04;
    shell.current.rotation.y += delta * 0.075;
    body.current.rotation.y += delta * 0.055;
    rings.current.rotation.z += delta * 0.024;
  });

  return (
    <group ref={group} position={[1.25, 0, 0]} scale={2.25}>
      <group ref={rings} rotation={[1.05, 0.2, 0.1]}>
        {[1.96, 2.26].map((radius, index) => (
          <mesh key={radius} rotation={[index * 0.7, index * 0.3, index * 0.5]}>
            <torusGeometry args={[radius, 0.009, 6, 150]} />
            <meshStandardMaterial color="#b3ffed" emissive="#2a8d77" emissiveIntensity={1.45} transparent opacity={index ? 0.18 : 0.3} roughness={0.22} metalness={0.7} />
          </mesh>
        ))}
      </group>
      <mesh ref={shell} scale={1.68}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial color="#b6ffec" emissive="#277563" emissiveIntensity={1} transparent opacity={0.3} wireframe />
      </mesh>
      <mesh ref={body} scale={1.36} rotation={[0.16, 0.4, 0.08]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial color="#0a1915" emissive="#0b3a2f" emissiveIntensity={0.42} metalness={0.88} roughness={0.2} clearcoat={1} clearcoatRoughness={0.08} flatShading />
      </mesh>
      <pointLight position={[-1.5, 1.2, 2.7]} color="#eafffa" intensity={8} distance={6} decay={2} />
    </group>
  );
}

export default function IntroCore({ phase }: { phase: IntroPhase }) {
  const settling = phase === "settling" || phase === "revealing";
  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) return null;

  return (
    <div className={`intro-core is-${phase}`} aria-hidden="true">
      <Canvas frameloop={phase === "hidden" ? "never" : "always"} camera={{ position: [0, 0, 7.4], fov: 43 }} dpr={[2, 2.5]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={0.24} color="#c9fff3" />
        <spotLight position={[-4, 5, 5]} color="#f3fffc" intensity={38} angle={0.44} penumbra={0.94} distance={17} decay={2} />
        <spotLight position={[4, 3, -3]} color="#71f5d4" intensity={50} angle={0.6} penumbra={1} distance={16} decay={2} />
        <EntranceObject settling={settling} />
        <EffectComposer multisampling={8} resolutionScale={1}>
          <Bloom intensity={0.3} luminanceThreshold={0.76} luminanceSmoothing={0.18} mipmapBlur />
          <Vignette eskil={false} offset={0.16} darkness={0.38} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
