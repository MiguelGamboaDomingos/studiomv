import React, { useEffect, useState, useRef } from 'react';

const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Check if device supports hover (not touch-only)
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (!supportsHover) return;

    const updateCursor = (e: MouseEvent) => {
      // Use clientX/clientY for viewport-relative positioning
      const x = e.clientX;
      const y = e.clientY;

      setPosition({ x, y });
      setIsVisible(true);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, input, textarea, select, [role="button"], [tabindex]');
      setIsHovering(!!isInteractive);
    };

    const hideCursor = () => setIsVisible(false);

    // Apply to entire document for consistent behavior
    document.addEventListener('mousemove', updateCursor, { passive: true });
    document.addEventListener('mouseleave', hideCursor);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseleave', hideCursor);
    };
  }, []);

  // Don't render if not visible or user prefers reduced motion
  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ease-out"
      style={{
        transform: `translate3d(${position.x - 12}px, ${position.y - 12}px, 0) scale(${isHovering ? 1.3 : 1})`,
        willChange: 'transform'
      }}
      aria-hidden="true"
    >
      <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-all duration-150 ${
        isHovering ? 'border-amber-400 bg-amber-400/10' : 'border-white/80'
      }`}>
        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-150 ${
          isHovering ? 'bg-amber-400' : 'bg-white/80 animate-pulse'
        }`}></div>
      </div>
    </div>
  );
};

export default Cursor;