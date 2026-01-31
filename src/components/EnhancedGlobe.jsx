import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, MeshTransmissionMaterial, Torus } from '@react-three/drei';
import * as THREE from 'three';

function LiquidGlobe() {
  const meshRef = useRef();
  const torusRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      torusRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group>
      <Sphere ref={meshRef} args={[1, 128, 128]} scale={3}>
        <MeshDistortMaterial
          color="#60a5fa"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={0.8}
          opacity={0.2}
          transparent
          envMapIntensity={1}
        />
      </Sphere>

      <Torus ref={torusRef} args={[3.5, 0.05, 16, 100]}>
        <meshStandardMaterial
          color="#8b5cf6"
          transparent
          opacity={0.3}
          emissive="#8b5cf6"
          emissiveIntensity={0.5}
        />
      </Torus>

      <Sphere args={[2.5, 64, 64]} scale={1}>
        <meshStandardMaterial
          color="#3b82f6"
          transparent
          opacity={0.05}
          roughness={0.1}
          metalness={1}
          wireframe
        />
      </Sphere>
    </group>
  );
}

function Particles() {
  const count = 500;
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 5 + Math.random() * 3;
      temp.push({
        position: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        ],
        scale: Math.random() * 0.15 + 0.05
      });
    }
    return temp;
  }, []);

  return (
    <>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position} scale={particle.scale}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial
            color="#60a5fa"
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </>
  );
}

export default function EnhancedGlobe() {
  return (
    <div className="fixed top-1/2 right-0 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#60a5fa" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8b5cf6" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#06b6d4"
        />
        <LiquidGlobe />
        <Particles />
      </Canvas>

      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white pointer-events-none" />
    </div>
  );
}
