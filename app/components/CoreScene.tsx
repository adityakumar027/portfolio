"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Component, Suspense, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
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

const rimVertex = `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  void main() {
    vNormal = normalize(mat3(modelMatrix) * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const rimFragment = `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  void main() {
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float rim = pow(1.0 - max(dot(normalize(vNormal), viewDirection), 0.0), 4.2);
    gl_FragColor = vec4(vec3(0.44, 1.0, 0.84) * rim, rim * 0.18);
  }
`;

/* ---------- Error boundary – catches postprocessing / WebGL crashes ---------- */

class WebGLErrorBoundary extends Component<
  { onError: () => void; children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { onError: () => void; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

/* ---------- Render verifier – detects blank-canvas GPU failures ---------- */
// After a few rendered frames, reads pixels from the WebGL framebuffer.
// If the canvas is producing no visible output (common on Windows with
// certain ANGLE / Intel GPU driver combos), triggers fallback to CSS.

function RenderVerifier({ onVerified, onFailed }: { onVerified: () => void; onFailed: () => void }) {
  const { gl } = useThree();
  const frameCount = useRef(0);
  const done = useRef(false);

  useFrame(() => {
    if (done.current) return;
    frameCount.current++;
    if (frameCount.current < 20) return; // let the scene stabilize

    done.current = true;
    try {
      const ctx = gl.getContext();
      ctx.bindFramebuffer(ctx.FRAMEBUFFER, null); // ensure we read the canvas
      const w = gl.domElement.width;
      const h = gl.domElement.height;
      const pixel = new Uint8Array(4);

      // Sample multiple points across where the core & effects should appear
      const spots: [number, number][] = [
        [0.65, 0.5], [0.5, 0.5], [0.7, 0.3],
        [0.8, 0.5], [0.7, 0.7], [0.3, 0.5],
      ];

      let hasContent = false;
      for (const [sx, sy] of spots) {
        ctx.readPixels(
          Math.floor(w * sx), Math.floor(h * sy),
          1, 1, ctx.RGBA, ctx.UNSIGNED_BYTE, pixel,
        );
        if (pixel[0] > 2 || pixel[1] > 2 || pixel[2] > 2) {
          hasContent = true;
          break;
        }
      }

      if (hasContent) onVerified();
      else onFailed();
    } catch {
      onFailed();
    }
  }, 2); // priority 2 → runs after EffectComposer (priority 1)

  return null;
}

type PointerState = { current: { x: number; y: number } };

function Core({ pointer }: { pointer: PointerState }) {
  const group = useRef<THREE.Group>(null);
  const body = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const rings = useRef<THREE.Group>(null);
  const hoverLight = useRef<THREE.PointLight>(null);
  const bodyMaterial = useRef<THREE.MeshPhysicalMaterial>(null);
  const shellMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const targetScale = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    if (!group.current || !body.current || !shell.current || !rings.current || !hoverLight.current || !bodyMaterial.current || !shellMaterial.current) return;
    const time = state.clock.elapsedTime;
    const pointerX = pointer.current.x;
    const pointerY = pointer.current.y;
    const corePointerX = pointerX - 0.58;
    const corePointerY = pointerY - 0.02;
    const pointerDistance = Math.sqrt((corePointerX / 0.55) ** 2 + (corePointerY / 0.72) ** 2);
    const hover = THREE.MathUtils.clamp(1 - pointerDistance, 0, 1);
    group.current.position.y = Math.sin(time * 0.38) * 0.045;
    group.current.rotation.x = corePointerY * 0.018;
    group.current.rotation.y = corePointerX * 0.026;
    targetScale.setScalar(0.84 + hover * 0.014);
    group.current.scale.lerp(targetScale, 1 - Math.exp(-delta * 5));
    body.current.rotation.y += delta * 0.045;
    body.current.rotation.z += delta * 0.018;
    shell.current.rotation.x -= delta * 0.025;
    shell.current.rotation.y += delta * 0.06;
    rings.current.rotation.z += delta * 0.012;
    hoverLight.current.intensity = THREE.MathUtils.lerp(hoverLight.current.intensity, 5 + hover * 19, 0.1);
    bodyMaterial.current.emissiveIntensity = THREE.MathUtils.lerp(bodyMaterial.current.emissiveIntensity, 0.2 + hover * 0.16, 0.1);
    shellMaterial.current.emissiveIntensity = THREE.MathUtils.lerp(shellMaterial.current.emissiveIntensity, 0.72 + hover * 0.48, 0.1);
    shellMaterial.current.opacity = THREE.MathUtils.lerp(shellMaterial.current.opacity, 0.22 + hover * 0.08, 0.1);
  });

  return (
    <group ref={group} position={[2.82, 0.06, 0]} scale={0.84}>
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

      <mesh ref={shell} scale={1.68}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial ref={shellMaterial} color="#b7ffed" emissive="#24695a" emissiveIntensity={0.72} transparent opacity={0.22} wireframe />
      </mesh>

      <mesh ref={body} scale={1.36} rotation={[0.16, 0.4, 0.08]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial ref={bodyMaterial} color="#07110e" emissive="#08251e" emissiveIntensity={0.2} metalness={0.9} roughness={0.24} clearcoat={1} clearcoatRoughness={0.1} envMapIntensity={1.35} flatShading />
      </mesh>

      <mesh scale={1.39} rotation={[0.16, 0.4, 0.08]}>
        <icosahedronGeometry args={[1, 2]} />
        <shaderMaterial vertexShader={rimVertex} fragmentShader={rimFragment} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <pointLight ref={hoverLight} position={[1.7, 1.2, 2.4]} color="#eafffa" intensity={5} distance={5.5} decay={2} />
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

function Scene({ pointer }: { pointer: PointerState }) {
  return (
    <>
      <fog attach="fog" args={["#070908", 6, 13]} />
      <ambientLight intensity={0.06} color="#b9fff0" />
      <spotLight position={[-4, 5, 5]} color="#f0fffb" intensity={24} angle={0.4} penumbra={0.95} distance={15} decay={2} />
      <pointLight position={[4, -2, 3]} color="#1e7868" intensity={5} distance={10} decay={2} />
      <spotLight position={[4, 3, -3]} color="#71f5d4" intensity={38} angle={0.55} penumbra={1} distance={14} decay={2} />
      <Core pointer={pointer} />
      <Particles />
      <EffectComposer multisampling={0} resolutionScale={0.8}>
        <Bloom intensity={0.38} luminanceThreshold={0.76} luminanceSmoothing={0.2} mipmapBlur />
        <Noise opacity={0.018} blendFunction={BlendFunction.SOFT_LIGHT} />
        <Vignette eskil={false} offset={0.2} darkness={0.58} />
      </EffectComposer>
    </>
  );
}

function webglSupported(): boolean {
  try {
    const canvas = document.createElement("canvas");
    // failIfMajorPerformanceCaveat rejects software-only WebGL (SwiftShader / WARP)
    const opts: WebGLContextAttributes = { failIfMajorPerformanceCaveat: true };
    const gl = (canvas.getContext("webgl2", opts) ?? canvas.getContext("webgl", opts)) as WebGLRenderingContext | null;
    if (!gl) return false;
    // WebGL2 natively supports half-float render targets needed by Bloom.
    // For WebGL1 we need the OES_texture_half_float extension.
    if (gl instanceof WebGL2RenderingContext) return true;
    return Boolean(gl.getExtension("OES_texture_half_float"));
  } catch {
    return false;
  }
}

export default function CoreScene({ subdued = false }: { subdued?: boolean }) {
  const [enabled] = useState(() => typeof window !== "undefined" && innerWidth > 980 && !matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [webgl] = useState(() => typeof window !== "undefined" && webglSupported());
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [verified, setVerified] = useState(false);
  const pointer = useRef({ x: 0, y: 0 });

  const handleFailed = useCallback(() => setFailed(true), []);
  const handleVerified = useCallback(() => setVerified(true), []);

  // Safety-net timeout: if the scene hasn't verified rendering within 5 s,
  // assume a silent GPU failure and fall back to CSS.
  useEffect(() => {
    if (!enabled || !webgl || failed || verified) return;
    const timer = window.setTimeout(() => {
      if (!verified) setFailed(true);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [enabled, webgl, failed, verified]);

  useEffect(() => {
    const trackPointer = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / innerWidth) * 2 - 1;
      pointer.current.y = -(event.clientY / innerHeight) * 2 + 1;
    };
    addEventListener("pointermove", trackPointer, { passive: true });
    return () => removeEventListener("pointermove", trackPointer);
  }, []);

  if (!enabled || !webgl || failed) return <div className="core-fallback is-static" aria-hidden="true" />;

  return (
    <>
      <div className={ready ? "scene-loader is-ready" : "scene-loader"} aria-hidden="true">
        <span>INITIALIZING CORE</span><div><i style={{ transform: `scaleX(${ready ? 1 : 0.35})` }} /></div>
      </div>
      <div className={subdued ? "webgl-layer is-subdued" : "webgl-layer"} aria-hidden="true">
        <WebGLErrorBoundary onError={handleFailed}>
          <Canvas
            camera={{ position: [0, 0, 7.4], fov: 43 }}
            dpr={[1, 1.25]}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            onCreated={({ gl }) => {
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 0.95;
              gl.outputColorSpace = THREE.SRGBColorSpace;
              gl.domElement.addEventListener("webglcontextlost", (event) => {
                event.preventDefault();
                setFailed(true);
              });
              // Check for initial GL errors after setup
              const ctx = gl.getContext();
              const err = ctx.getError();
              if (err !== ctx.NO_ERROR && err !== ctx.CONTEXT_LOST_WEBGL) {
                setFailed(true);
                return;
              }
              requestAnimationFrame(() => setReady(true));
            }}
          >
            <Suspense fallback={null}>
              <Scene pointer={pointer} />
              <RenderVerifier onVerified={handleVerified} onFailed={handleFailed} />
            </Suspense>
          </Canvas>
        </WebGLErrorBoundary>
      </div>
    </>
  );
}
