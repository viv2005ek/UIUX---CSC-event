import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere({ position, color, speed }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
      ref.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      ref.current.rotation.z = state.clock.elapsedTime * speed * 0.2;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 64, 64]} position={position}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.6}
      />
    </Sphere>
  );
}

function ParticleField() {
  const ref = useRef();
  const count = 2000;

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const spread = 40;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = (Math.random() - 0.5) * spread;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
      ref.current.rotation.y = state.clock.elapsedTime * 0.075;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#06b6d4"
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function FloatingRings() {
  const group = useRef();

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x = state.clock.elapsedTime * 0.1;
      group.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={group}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[0, 0, (Math.PI / 3) * i]}>
          <torusGeometry args={[8, 0.1, 16, 100]} />
          <meshBasicMaterial
            color={i === 0 ? '#06b6d4' : i === 1 ? '#d946ef' : '#f97316'}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Enhanced3DBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950" />

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] animate-float" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-[128px] animate-float-reverse" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse" />
      </div>

      <Canvas
        camera={{ position: [0, 0, 25], fov: 60 }}
        dpr={[1, 2]}
        className="opacity-40"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d946ef" />

        <ParticleField />
        <FloatingRings />

        <AnimatedSphere position={[-8, 0, 0]} color="#06b6d4" speed={0.5} />
        <AnimatedSphere position={[8, 2, -5]} color="#d946ef" speed={0.7} />
        <AnimatedSphere position={[0, -3, -8]} color="#f97316" speed={0.6} />
      </Canvas>

      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
    </div>
  );
}
