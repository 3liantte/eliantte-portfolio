'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function GalaxyPoint() {
  const starsRef = useRef<THREE.Points>(null);
  const shootingStarsRef = useRef<THREE.BufferGeometry>(null);
  const { camera } = useThree();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🌌 Generate starfield with gradient colors
  const [starData] = useMemo(() => {
    const positions = new Float32Array(10000 * 3);
    const colors = new Float32Array(10000 * 3);

    const colorA = new THREE.Color("#a855f7"); // Purple
    const colorB = new THREE.Color("#06b6d4"); // Cyan
    const colorC = new THREE.Color("#ffffff"); // White

    const mix = (c1: THREE.Color, c2: THREE.Color, factor: number) => c1.clone().lerp(c2, factor);

    for (let i = 0; i < 10000; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      const t = (y + 50) / 100;
      const blended = t < 0.5 ? mix(colorA, colorB, t * 2) : mix(colorB, colorC, (t - 0.5) * 2);

      colors[i3] = blended.r;
      colors[i3 + 1] = blended.g;
      colors[i3 + 2] = blended.b;
    }

    return [{ positions, colors }];
  }, []);

  // 🌠 Shooting stars
  const shootingStars = useRef<Float32Array>(new Float32Array(30 * 3));
  const shootingColors = useMemo(() => {
    const pos = shootingStars.current;
    for (let i = 0; i < 30; i++) {
      const i3 = i * 3;
      pos[i3] = Math.random() * 80 - 40;
      pos[i3 + 1] = Math.random() * 50 + 20;
      pos[i3 + 2] = Math.random() * -20;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    camera.position.z = 2 + scrollY * 0.003;

    if (starsRef.current) {
      const rotation = elapsed * 0.02 + scrollY * 0.0002;
      starsRef.current.rotation.x = rotation;
      starsRef.current.rotation.y = rotation;
    }

    if (shootingStarsRef.current) {
      const positions = shootingStarsRef.current.attributes.position.array as Float32Array;
      for (let i = 0; i < 30; i++) {
        const i3 = i * 3;
        positions[i3] -= 0.5;
        positions[i3 + 1] -= 0.2;
        if (positions[i3] < -50 || positions[i3 + 1] < -30) {
          positions[i3] = Math.random() * 80 - 40;
          positions[i3 + 1] = Math.random() * 50 + 20;
        }
      }
      shootingStarsRef.current.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      {/* 🌌 Galaxy Stars */}
      <points ref={starsRef} frustumCulled>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={starData.positions}
            count={starData.positions.length / 3}
            itemSize={3} args={[starData.positions, 3]}
            />
          <bufferAttribute
            attach="attributes-color"
            array={starData.colors}
            count={starData.colors.length / 3}
            itemSize={3} args={[starData.colors, 3]}
            />
        </bufferGeometry>
        <PointMaterial
          vertexColors
          transparent
          size={0.3}
          sizeAttenuation
          depthWrite={false}
          opacity={1}
        />
      </points>

      {/* 🌠 Shooting Stars */}
      <points frustumCulled>
        <bufferGeometry ref={shootingStarsRef}>
          <bufferAttribute
            attach="attributes-position"
            array={shootingColors}
            count={shootingColors.length / 3}
            itemSize={3} args={[shootingColors, 3]}
            />
        </bufferGeometry>
        <PointMaterial
          transparent
          size={1.5}
          color="#00ffff"
          sizeAttenuation
          depthWrite={false}
          opacity={0.8}
        />
      </points>
    </>
  );
}
