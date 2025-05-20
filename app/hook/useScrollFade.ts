'use client';
import { useEffect, useState } from 'react';

export default function useScrollFade(max = 400) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const value = Math.min(1, window.scrollY / max);
      setOpacity(value);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [max]);

  return opacity;
}
