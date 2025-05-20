'use client';

import { Canvas } from '@react-three/fiber';
import GalaxyPoints from "./GalaxyPoints";

export default function GalaxyCanvas() {
  return (
    <Canvas className="fixed inset-0 z-0" camera={{ position: [0, 0, 1] }}>
      <GalaxyPoints />
    </Canvas>
  );
}
