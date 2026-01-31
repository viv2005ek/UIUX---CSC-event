import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function ParticleWave() {
  const ref = useRef();
  const count = 3000;

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const radius = 20;

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * Math.cbrt(Math.random());

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime;
      ref.current.rotation.y = time * 0.05;

      const positions = ref.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const z = positions[i3 + 2];

        positions[i3 + 1] += Math.sin(time + x * 0.3) * 0.01;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#60a5fa"
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function FloatingOrbs() {
  const orbs = useMemo(() => [
    { position: [-15, 10, -10], scale: 2, color: '#3b82f6', speed: 1 },
    { position: [15, -8, -15], scale: 1.5, color: '#8b5cf6', speed: 0.8 },
    { position: [0, 15, -20], scale: 1.8, color: '#06b6d4', speed: 1.2 },
  ], []);

  return (
    <>
      {orbs.map((orb, index) => (
        <FloatingOrb key={index} {...orb} />
      ))}
    </>
  );
}

function FloatingOrb({ position, scale, color, speed }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime * speed;
      ref.current.position.y = position[1] + Math.sin(time) * 3;
      ref.current.position.x = position[0] + Math.cos(time * 0.5) * 2;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 32, 32]} position={position} scale={scale}>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.15}
        roughness={0.1}
        metalness={0.9}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </Sphere>
  );
}

export default function AdvancedParticles() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20">
      <Canvas
        camera={{ position: [0, 0, 25], fov: 60 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.5} />
        <ParticleWave />
        <FloatingOrbs />
      </Canvas>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/50 pointer-events-none" />
    </div>
  );
}
