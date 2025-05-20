'use client';
import { useEffect, useRef } from 'react';

export default function MagneticCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const links = document.querySelectorAll('[data-cursor]');

    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleHover = () => cursor.classList.add('scale-150');
    const handleLeave = () => cursor.classList.remove('scale-150');

    window.addEventListener('mousemove', moveCursor);
    links.forEach((el) => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      links.forEach((el) => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed z-[999] h-6 w-6 bg-white rounded-full mix-blend-difference transition-transform duration-300 ease-out"
    />
  );
}
