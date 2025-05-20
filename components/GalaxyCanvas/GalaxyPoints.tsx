'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function GalaxyPoint() {
  const starsRef = useRef<THREE.Points>(null);
  const starsMaterialRef = useRef<any>(null);
  const shootingStarsRef = useRef<THREE.BufferGeometry>(null);
  const shootingStarPositions = useRef<Float32Array>(new Float32Array(30 * 3));
  const { camera } = useThree();
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Static starfield
  const stars = useMemo(() => {
    const positions = new Float32Array(10000 * 3);
    for (let i = 0; i < 10000; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 100;
    }
    return positions;
  }, []);

  // Shooting stars
  const shootingStars = useMemo(() => {
    const pos = shootingStarPositions.current;
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
    const scrollFactor = scrollY * 0.0002;

    // Continuous galaxy rotation (no mouse influence)
    if (starsRef.current) {
      const baseRotation = elapsed * 0.02 + scrollFactor;
      starsRef.current.rotation.x = baseRotation;
      starsRef.current.rotation.y = baseRotation;
    }

    // Scroll-based zoom
    camera.position.z = 2 + scrollY * 0.003;

    // Depth fade
    if (starsMaterialRef.current) {
      starsMaterialRef.current.opacity = Math.max(0.2, 1 - scrollY * 0.002);
    }

    // Shooting star animation
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
      <Points ref={starsRef} positions={stars} stride={3} frustumCulled>
        <PointMaterial
          ref={starsMaterialRef}
          transparent
          size={0.3}
          sizeAttenuation
          depthWrite={false}
          color="#ffffff"
          opacity={1}
        />
      </Points>

      <points frustumCulled>
        <bufferGeometry ref={shootingStarsRef}>
          <bufferAttribute
            attach="attributes-position"
            count={shootingStars.length / 3}
            array={shootingStars}
            itemSize={3}
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
